---
title: "Testing against a database: new approaches"
date: 2023-04-11T10:56:39Z
cuid: clgcg3lpj000d0ak597fk5ghu
draft: false
slug: testing-against-a-database-new-approaches
tags: [postgresql, typescript, sequelize]
---

At [Quil](https://getquil.com), we write [substantially more integration tests](/the-quil-tech-stack#testing) for our API than any other type of test. Previously we've written about our strategy to [write tests against a database without polluting the database](/write-clean-database-tests-with-jest) between test runs.

That was nearly 2 years ago (!!!) and we decided it was time for an update. Our test suite has grown substantially, as have our range of test cases. We now have about 400 integration tests that run against our API on every check-in, in addition to numerous other test suites for serverless functions and internal libraries that run against the same database. While our original approach was reasonably robust for a smaller test run, it has started to show its cracks as we've grown.

## Challenges with our existing test suite

By far the biggest limitation of our [previous test methodology](/write-clean-database-tests-with-jest) is when the code under test utilizes its own database transactions. Transactions created two separate-but-related problems for us

1. Code that was wrapped in a transaction could not be automatically rolled back with our monkey-patched Sequelize transaction. It was never clear to us _why_ this didn't work, but suffice to say we didn't want to make our monkey-patch even deeper!
2. Code that was created or updated in a transaction would have a different lifecycle than the data created in the test (a side-effect of #1), for example if the transaction in the code under test rolled back due to an error.

The implication of problem #1 is that we had to write manual cleanup statements in our tests anyway, hence removing the primary benefit of our transaction wrapper. The whole point of automatically wrapping tests in a transaction is that they do not need to worry about "cleaning up" after themselves, which simplifies the test code. However, since data that was created inside a transaction outlived the test transaction, we found that we had to manually clean up data anyway. This was a problem because our tests assumed that the database would be clean for each test. Since data created in a transaction left the database dirty, some of our tests became flaky.

The implication of problem #2 is that some code paths became impossible to test accurately. For example, we might want to assert that the data on a test user was **not** updated if a transaction failed. In testing this, we discovered that the "inner" transaction (i.e. the transaction written into our code) conflicted with the "outer" transaction (i.e. the transaction that was wrapping our test). This type of scenario became impossible to test, so we had to introduce yet another abstraction which we called `noTransaction`. This exposed the default `jest.test()` behavior which was not wrapped in a transaction. While this allowed the "inner" transaction to work correctly in all test contexts, it introduced 2 major problems:

1. We now had 2 test paradigms to keep track of: the default "transaction" tests, and the new `noTransaction` tests
2. In our `noTransaction` tests, we had to manually clean up _everything_, which was again a different paradigm than was assumed in our "default" test setup

The combination of flakiness, multiple testing paradigms, and inconsistent use of cleanup code led us to seek a better solution

## First step: unique database schemas per application

One strategy that we implemented to mitigate flakiness during our CI runs was to segregate each test application into discrete DB schemas. Postgres exposes simple commands to copy entire DB schemas, so we figured we could utilize this functionality to run each test application against its own schema. Our thinking was that if a test suite leaked some data, at least it wouldn't impact other applications that were simultaneously testing against the same database.

This strategy worked really well for fixing flakiness in our CI test runs, and the code was relatively simple. In our [Jest `globalSetup` file,](https://jestjs.io/docs/configuration#globalsetup-string) we added some commands to get the name of the current test suite, and copy the `public` schema to a new schema for the application under test.

```typescript
import { exec } from "child_process";
import { URL } from "url";
import { promisify } from "util";

const execAsync = promisify(exec);

// could also come from e.g. ramda
const last = (a) => a[a.length - 1];

export default async (globalConfig, _projectConfig) => {
  const baseUrl =
    process.env.DATABASE_URL_TEST ?? process.env.DATABASE_URL ?? "";
  process.env.ORIGINAL_DATABASE_URL = baseUrl;
  const jestSuiteName = last(globalConfig.rootDir?.split("/") ?? [])?.replace(
    /-/g,
    "_"
  );
  const newSchema =
    jestSuiteName ??
    `schema${Math.random()
      .toString()
      .replace(/[^0-9]/g, "")}`;
  process.env.TEST_SCHEMA = newSchema;
  const newDbUrl = `${baseUrl}?schema=${newSchema}`;
  await copyPublicSchema(baseUrl, newSchema);
  process.env.DATABASE_URL = newDbUrl;
  process.env.DATABASE_URL_TEST = newDbUrl;
};

async function copyPublicSchema(baseUrl: string, newSchema: string) {
  const url = new URL(baseUrl);
  const database = url.pathname.replace("/", "");

  const dropSchemaCommand = [
    `echo "drop schema if exists ${newSchema} cascade;"`,
    `psql -h ${url.hostname} -U ${url.username} -d ${database}`,
  ].join(" | ");
  // no need to log errors - we assume this means the schema did not
  // exist yet, which is expected behavior.
  await runCommand(dropSchemaCommand, false);

  const copySchemaCommand = [
    `pg_dump ${baseUrl} --schema public --schema-only`,
    `sed 's/public/${newSchema}/g'`,
    // postgres only allows extensions to exist in 1 schema.
    // We install the pgcrypto extension in our DB; therefore,
    // references to functions created from the pgcrypto extension
    // must reference the public schema, not the generated schema
    `sed 's/${newSchema}.gen_random_uuid/public.gen_random_uuid/g'`,
    `psql -h ${url.hostname} -U ${url.username} -d ${database}`,
  ].join(" | ");
  await runCommand(copySchemaCommand);

  // this table is seeded with test data before each run;
  // this command copies it over to the new schema
  const copyDisclosuresTableCommand = [
    `pg_dump ${baseUrl} --schema public --table=disclosures --data-only`,
    `sed 's/public/${newSchema}/g'`,
    `psql -h ${url.hostname} -U ${url.username} -d ${database}`,
  ].join(" | ");
  await runCommand(copyDisclosuresTableCommand);

  console.log(`Copied public schema to ${newSchema}`);
}

async function runCommand(command: string, logError = true) {
  const { stderr, stdout } = await execAsync(command);
  if (logError && stderr) {
    console.log("Schema copy error:", stderr);
  } else {
    if (stdout.match(/ERROR:/)) {
      process.stdout.write(stdout);
      throw new Error(stdout);
    }
  }
}
```

This worked for a while, but over time we still found tests being introduced that were flaky. Often, the assertions were simply too strict for a parallelized test suite that was running against the same database. That is, unrelated expectations might fail if one test inserted data while another was trying to read (and assert) from the same table.

If you use this method, [don't forget a `globalTeardown`](https://jestjs.io/docs/configuration#globalteardown-string) to clean up your schemas!

```typescript
import { dropSchema } from "./jest.global-setup";

export default async () => {
  const url = new URL(process.env.ORIGINAL_DATABASE_URL);
  const database = url.pathname.replace("/", "");

  if (process.env.TEST_SCHEMA) {
    await dropSchema(url, process.env.TEST_SCHEMA, database);
  }
};
```

## Second step: no secret transactions

Even though we were mostly able to address our test flakiness with unique schemas, we decided that it was no longer worth it to have 2 test paradigms (transactions vs no transaction), each with their associated nuances regarding data cleanup and differing abilities to test code paths depending on how the underlying code was written.

The biggest change here was that we had to ensure none of our tests failed when other data existed in the database. For the most part this wasn't a difficult challenge, but it required a little bit of diligence to remove tests that used common values on unique database columns, such as `email: "test@example.com"`.

In addition, there were a few tests that assumed the database would be clean when they ran. For example, for a query that filters by status, our test originally looked like this

1. Arrange: create records with various statuses
2. Act: execute the query and gather results
3. Assert: expect that the results _exactly match_ the created records in the specified status

Depending on run order, this test would occasionally fail if other records were previously inserted in that table. To remedy, we simply adjusted our expectation to verify that every record in the returned list matched the status that we queried for. Updates like this felt like a win because the assertion was actually more descriptive of the _behavior_ we were looking for.

## Conclusion

We haven't yet migrated every test suite away from our monkey-patched transaction wrapper, but we completed the transition for our largest API test suite several weeks ago and the results have been good. So far we haven't experienced any flakiness in any of our CI runs or local testing, which is a win. In addition, we've all appreciated that we no longer have multiple testing paradigms to keep track of when writing new specs.

Overall, we found that using a unique DB schema for every test suite was a lightweight and scalable option to make our tests more resilient and reliable. It avoided ugly monkey-patching of our ORM, and it allowed us to test our code in more natural ways regardless of the patterns used in the code under test.

Any questions? Please comment or reach out!
