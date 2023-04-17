# Write clean database tests with Jest

2021-05-19T19:44:43Z

tags: javascript, databases, testing, typescript, jest

---

_Update, 2023-04-11: We've_ [_published a new post_](https://ericyd.hashnode.dev/testing-against-a-database-new-approaches) _about our new testing methodology! Feel free to reach this, but keep in mind we don't use this strategy any longer_

Here at [Quil](https://getquil.com)\[1\], we focus our energy on integration tests because they provide the highest ROI for our development team. We also have pure unit tests, and a healthy set of end-to-end tests, but the majority of our backend tests are integration tests. (You can [read more about our test setup and infrastructure here!](https://ericyd.hashnode.dev/the-quin-tech-stack))

We choose to execute our backend integration tests directly against a real, local database. There are three dominant strategies you can use if you're writing tests against a real database:

1. Do nothing. Allow your tests to pollute your test DB and risk test data bleed 🤮 If you use this strategy and it works for you, more power to you, but generally this is bad practice.
2. Clean your database between each test 💡 This is a great solution **_if_** your test runner runs tests sequentially. If your test runner runs sequentially, I'd strongly recommend this method, and encourage you to check out [database-cleaner](https://github.com/emerleite/node-database-cleaner). However, if your test runner runs tests and suites in parallel (like Jest), this becomes untenable because each test modifies a global resource and it is likely going to be worse than just sharing a dirty database.
3. Use database transactions to ensure that every database interaction is rolled back after each test 🚀 Unlike cleaning your entire DB after each test, it only rolls back data that was introduced in that specific test. That keeps things lean and fast, while protecting your data. It also works great for parallel test runs since each test is atomic.

# Problem

We use [Jest](https://jestjs.io/) for our test runner and [Sequelize](https://sequelize.org/) as our ORM. Our challenge was to find a way to use [sequelize transactions](https://sequelize.org/master/manual/transactions.html) to wrap our Jest tests. We wanted to simulate the behavior provided by [rspec-rails](https://relishapp.com/rspec/rspec-rails/docs/transactions), which is made possible by RSpec's [around hooks](https://relishapp.com/rspec/rspec-core/v/2-9/docs/hooks/around-hooks).

There is no obvious solution to this problem for Jest because Jest doesn't provide an `around` hook, and Sequelize requires transactions to be set in the constructor in order to wrap database effects in transactions.

# Solution

The most elegant solution to this problem that we found was to [monkey-patch](https://en.wikipedia.org/wiki/Monkey_patch) Jest's global `test` and `it` methods. This required creating a setup file which we referenced in our Jest config using the `setupFilesAfterEnv` property. This file must be called "after env" because we need the Jest environment to be loaded so we can override methods.

_⚠️ This relies on a non-public Sequelize API to patch into the_ [_CLS behavior_](https://sequelize.org/master/manual/transactions.html#automatically-pass-transactions-to-all-queries) _that is normally enabled at the class level. Depending on your level of tolerance for monkey patching, this solution may or may not be acceptable._

Add the setup file in your `jest.config.js` file:

```js
// jest.config.js
module.exports = {
  // ...
  setupFilesAfterEnv: ["./jest.setup.ts"],
};
```

Then, monkey patch the `test` and `it` methods in your setup file:

```typescript
// jest.setup.ts
import { sequelize } from "./connection";

// Sequelize expects the "namespace" to essentially be a map with a "run" method.
// https://github.com/sequelize/sequelize/blob/2fe980e2bc3f495ed1ccdc9ee2debb112cd3ddd5/lib/sequelize.js#L1119-L1124
const cls = new Map();
Object.defineProperty(cls, "run", {
  value: (fn: (...args: unknown[]) => void) => {
    fn(this);
    return this;
  },
});

const wrapFn = (fn) => async () => {
  const txn = await sequelize.transaction();
  // Patch the behavior that Sequelize expects when using the CLS-hooked lib to manage namespaced transactions.
  // https://github.com/sequelize/sequelize/blob/c77b1f3a6c4840e4e846042c9c330dba2408b86c/lib/transaction.js#L134-L136
  sequelize.constructor["_cls"] = cls;
  sequelize.constructor["_cls"].set("transaction", txn);

  try {
    await fn();
    // This catch is not actually useless: using try/catch/finally forces `txn.rollback()`
    // to be called regardless of errors in the tests.
    // Otherwise, failing tests will hang and not produce useful output
    // eslint-disable-next-line no-useless-catch
  } catch (e) {
    throw e;
  } finally {
    await txn.rollback();
  }
};

// create new object with identical props to original test/it
const jestIt = it;
const patchedBase = (name: string, fn?, timeout?: number) =>
  jestIt(name, wrapFn(fn), timeout);
const patchedOnly = (name: string, fn?, timeout?: number) =>
  jestIt.only(name, wrapFn(fn), timeout);
Object.setPrototypeOf(patchedBase, it);
Object.setPrototypeOf(patchedOnly, it.only);
patchedBase.only = patchedOnly;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
test = it = patchedBase as any;

afterAll(async () => {
  await sequelize.close();
});
```

# Alternative #1

If you wanted to allow transactional tests but didn't want to monkey-patch the entire test function, you could add a custom property that indicates which tests should be wrapped in a transaction. See [How to Add Custom Functions to a Jest Test Suite](https://spin.atomicobject.com/2020/01/30/jest-add-custom-functions/) for more details.

For example, you may end up with a `jest.setup.ts` file like this:

```typescript
// jest.setup.ts
declare namespace jest {
  interface It {
    db: (name: string, fn?: ProvidesCallback, timeout?: number) => void;
  }
}

// add `wrapFn` implementation from above

it.db = (name: string, fn?, timeout?: number) => it(name, wrapFn(fn), timeout);
test.db = it.db;
```

Then in your tests, you can call `it.db('my database test', ...` to designate your tests that interact with the database.

# Alternative #2

Another option to avoid monkey patching Jest is to use `beforeEach` and `afterEach` hooks. This feels a bit more precarious to me because it appears that it introduces a race condition with overwriting `txn` on each test, but in my local usage it seems to work.

```javascript
let txn;
beforeEach(async () => {
  txn = await sequelize.transaction();
  sequelize.constructor["_cls"] = cls;
  sequelize.constructor["_cls"].set("transaction", txn);
});

afterEach(async () => {
  await txn.rollback();
});
```

# Conclusion

Hopefully this was a useful introduction to extending Jest in some uncommon ways. Do you run tests against databases? Share your strategies in the comments and let us know how it works for you!

### Footnotes

\[1\] Quil used to be called Quin
