---
title: "How to call GitHub's GraphQL API in vanilla JS"
datePublished: Sun Dec 06 2020 20:20:58 GMT+0000 (Coordinated Universal Time)
cuid: ckidkmc0503ix6zs12leg0bnr
slug: how-to-call-githubs-graphql-api-in-vanilla-js
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1607282756734/b9DLMsfIV.png
tags: github, javascript, apis, graphql

---

GraphQL is all the rage, but using GraphQL after years of REST API experience may feel a bit foreign. Let's dive into a practical example of how to call the GitHub GraphQL API using vanilla JS, and then explain some of the key concepts.

**Table of contents**

* [Getting started](#getting-started)
* [A simple example](#a-simple-example)
* [Query](#query)
    * [Data types](#data-types)
    * [Mutations](#mutations)
    * [Queries with no parameters](#queries-with-no-parameters)
    * [Whitespace](#whitespace)
* [Return fields](#return-fields)
    * [Paginating](#paginating)
* [Creating your own requests](#creating-your-own-requests)
* [Conclusion](#conclusion)
* [HTML example](#html-example)
* [References](#references)

# Getting started

Before we can start, we must create a [personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). It is free, and required to access the GraphQL API.

Once you've created a token, you can define a constant for it so we can reference it in future snippets:

```js
const TOKEN = "my secret token"
```

# A simple example

Using our access token, we can make a simple request to the API. Feel free to open your dev tools console and copy/paste this whole example!

If you'd like to experiment with a local HTML page example, you can skip to the [html example](#html-example) below.

```js
const TOKEN = "my secret token" // omit if already entered into console

// if you're following along in the console, this will make it easier to try different queries
let query = ""
let variables = {}

// GraphQL queries are defined by a string.
// Multi-line strings are OK
// This query is based on the `repository` query defined in the docs
// https://docs.github.com/en/free-pro-team@latest/graphql/reference/queries#repository
query = `query($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    shortDescriptionHTML
  }
}`

// `variables` is an Object defining values for your query or mutation.
// The keys of the `variables` object must map to the
// parameters defined at the top of your `query`,
// minus any leading '$' characters
variables = {
  name: "graphql-js",
  owner: "graphql"
}

// GraphQL always has a single endpoint
fetch("https://api.github.com/graphql", {

  // GraphQL always uses `POST` method
  method: "POST", 
      
  // GraphQL always uses the same keys in the body:
  // - 'query': a string that defines the query/mutation you are executing
  // - 'variables': an Object defining the variables that are used by the query
  // There can be others but you typically won't need them
  body: JSON.stringify({ 
    query: query, 
    variables: variables
  }),

  headers: {
    "Authorization": `bearer ${TOKEN}`,
    "Content-type": "application/json"
  }
})
  .then(response => response.json())
  .then(response => {
    // GraphQL always returns a 200 response, even if there were errors.
    // Rather than using HTTP statuses, errors are included in the payload.
    // Exception: server errors or parsing errors will return non-200 status
    if (response.errors && response.errors.length > 0) {
      console.error("errors:", response.errors)
    }

    // response.data will contain the requested values
    console.log(response.data)
  })
  .catch(console.error.bind(console))
```

Now that we have a working example, let's break down the different components of this request

# Query

There are a few things to note:
1. GraphQL queries are defined by a string
2. Multi-line strings are OK (and encouraged for longer queries/mutations
3. Parameters accepted by the query/mutation are defined after the top-level `query` or `mutation` statement. Parameters are optional
4. Parameters can be passed as arguments to fields (in this example, `repository` is a field requested by the query)

```js
// GraphQL queries are defined by a string.
// Multi-line strings are OK
// This query is based on the `repository` query defined in the docs
// https://docs.github.com/en/free-pro-team@latest/graphql/reference/queries#repository
const query = `query($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    shortDescriptionHTML
  }
}`
```

The easiest way to think about this is that we are defining a function called `query` which accepts two parameters: `$name`, and `$owner`. Those parameters can then be passed to the fields called by the `query` function.

If it seems weird to imagine a string as a function, just remember that the `QL` in GraphQL is for "**Q**uery **L**anguage". Effectively, we are defining snippets of a dynamic language in our string! This is what makes GraphQL so much more powerful than REST - we can define in code how we want the API to respond to us.

It's important to note that the parameter names for the `query` function are arbitrary. We could just as easily do this:

```js
const query = `query($hot: String!, $potato: String!) {
  repository(name: $hot, owner: $potato) {
    shortDescriptionHTML
  }
}`
```

Then, we could adjust our `variables` object to include the new parameter names

```
variables = {
  hot: "graphql-js",
  potato: "graphql"
}
```

Using this function analogy, you can see that our `variables` object effectively defines the arguments to the `query` function.

## Data types

GraphQL is a statically typed API language, which means that parameters must adhere to types. Of course, we're still bound by the JSON specification, so we can't define full-blown classes, but we can combine primitive types into complex types that can be used by the caller.

In this case, `String!` defined the type of the two arguments required by the `repository` query. Although it is just one word, we actually have two parts here

1. `String`: the actual data type. As with many languages, `String` is a collection of characters wrapped in double-quotes.
2. `!`: GraphQL uses the bang `!` symbol to indicate nullability. A type appended with `!` means it is non-nullable. A type without a `!` means it is nullable.

For parameters, non-nullable types are required to be passed. For the signature `repository(name: String!, owner: String!)`, we can immediately tell that both `name` and `object` are required arguments to this query. If the signature were changed to `repository(name: String!, owner: String)` then we would know that `owner` is an optional argument.

For fields defined in [response objects](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#repository), non-nullable simply means that the property will always return with a non-null value. In contrast, nullable fields may or may not be present. 

## Mutations

Mutations are defined in the same way as queries, and the corresponding variables are used in the same way. In the example at the beginning of this section, the only change we need to make to use a mutation instead of a query is changing the `query()` function to a `mutation()` function, and making any necessary adjustments to `variables` that we need.  The `fetch` call remains identical! This is a really handy feature as it allows us to wrap our GraphQL API caller in a single method and simply pass different queries/variables to the caller.

Here's an example of a mutation:

```js
const query = `mutation($addStarInput: AddStarInput!) {
  addStar(input: $addStarInput) {
    starrableId
  }
}`

const variables = {
  input: {
    starrableId: "starrable ID"
  }
}
```

And then use the same `fetch` function as above!

## Queries with no parameters

If you're calling a query that doesn't accept parameters, you can simply omit them from the query

```js
const query = `query {
  licenses {
    name
  }
}`
```

## Whitespace

Whitespace is recommended for readability, but GraphQL is not whitespace sensitive and you can omit if desired. This is equivalent to the above snippet:

```js
const query = "query{licenses{name}}"
```

Beware that if you are requesting multiple fields, they require a space so the parser knows where one starts and one ends

```js
const query = "query{licenses{name body}}"
```

# Return fields

In GraphQL, you can specify exactly what data you want back from the API. You can see what fields are available to you in the [objects reference](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects) (note the nullability of various fields).

In our simple example, we requested a single non-nullable string value `shortDescriptionHTML`. However, we could easily request a more complex property (e.g. a paginated value) using the same format.

To query complex types (e.g. [`StargazerConnection`](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#stargazerconnection)), simply nest the fields.

Let's say we want to find other users who share our interests and have starred this repository

```js
const query = `query($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    stargazers(first: 10) {
      nodes {
        # each node is a User
        # https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#user
        login
      }
    }
  }
}
```

(aside: Note that comments can be included inline with queries, but they use the `#` as the comment character)

## Paginating

The above example will show the first 10 stargazers. But, what if we need to paginate through _all_ stargazers for the repository? Surely there will be more than 10.

In this case, we must query the `edges`, which includes a `cursor` which we can then feed into the `stargazers` query to fetch the next examples. Let's take a look:

```js
const query = `query($name: String!, $owner: String!, $after: String) {
  repository(name: $name, owner: $owner) {
    stargazers(first: 10, after: $after) {
      edges {
        cursor
        node {
          login
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
```

Note the `$after` parameter is _nullable_, which means we can safely omit it. For the first call, we won't know an `after` value, but for subsequent calls, we can include the `cursor` that represents the last value of the previous page.

The `pageInfo` object has some useful helpers here too. We can use the `hasNextPage (Boolean!)` value to determine whether or not to continue paginating, and we can use the `endCursor` value to automatically grab the last cursor of the result set. A simple implementation might look like:


```js
const query = `query($name: String!, $owner: String!, $after: String) {
  repository(name: $name, owner: $owner) {
    stargazers(first: 10, after: $after) {
      edges {
        cursor
        node {
          login
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`

let variables = {
  name: "graphql-js",
  owner: "graphql"
}

// make `fetch` call, and set `hasNextPage` to a global variable
// also set `endCursor` to global
let hasNextPage = true // <-- override me
let endCursor = ""

while (hasNextPage) {
  variables = Object.assign(variables, { after: endCursor })
  // execute `fetch` call again,
  // and continue setting hasNextPage and endCursor values
}
```

# Creating your own requests

You may be thinking "this is all good and well, but how do I create my own queries?"

We can use what we've learned to create our own queries using the docs.

Head over to the [repository query definition](https://docs.github.com/en/free-pro-team@latest/graphql/reference/queries#repository).

![Screen Shot 2020-12-06 at 1.31.40 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1607284836717/w3zbW4RDP.png)

You'll see all the information we need to make our own query: query name, parameters, and parameter types.

A generic example of a query would look like this:

```js
const query = `query($param1: type1, $param2: type2) {
  queryField(arg1: $param1, arg2: $param2) {
    subField1
    subField2
  }
}`
```

Using what we know about `repository`, we can simply substitute the fields!

* `$param1` = `$name` (arbitrary name for our ad-hoc query)
* `type1` = `String!`
* `$param2` = `$owner` (arbitrary name)
* `type2` = `String!`
* `queryField` = `repository`
* `arg1` = `name` (not arbitrary, defined by the API)
* `arg2` = `owner` (not arbitrary, defined by the API)
* `subField1` = `shortDescriptionHTML`
* `subField2` = Any field exposed by the [Repository type](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#repository)!

# Conclusion

That was a rapid-fire entry to GraphQL. Feel free to leave any question/comments and we can discuss!

# HTML example

You can copy/paste this file to your machine, change the TOKEN value, and open it in your browser - errors and data will display on the screen!

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GraphQL test</title>
  <script>
    const TOKEN = "my secret token"

    const query = `query($name: String!, $owner: String!) {
      repository(name: $name, owner: $owner) {
        shortDescriptionHTML
      }
    }`

    cost variables = {
      name: "graphql-js",
      owner: "graphql"
    }

    fetch("https://api.github.com/graphql", {
      method: "POST", 

      body: JSON.stringify({ 
        query: query, 
        variables: variables
      }),

      headers: {
        "Authorization": `bearer ${TOKEN}`,
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.errors && response.errors.length > 0) {
          document.getElementById("errors").innerText = JSON.stringify(response.errors, null, 2)
        }

        document.getElementById("data").innerText = JSON.stringify(response.data, null, 2)
      })
      .catch(console.error.bind(console))
  </script>
</head>
<body>
  <pre id="errors"></pre>
  <pre id="data"></pre>
</body>
</html>
```

# References

* [GitHub GraphQL docs](https://docs.github.com/en/free-pro-team@latest/graphql)
* [GitHub Queries reference](https://docs.github.com/en/free-pro-team@latest/graphql/reference/queries)
* [GitHub Objects reference](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects)
* [GitHub Mutations reference](https://docs.github.com/en/free-pro-team@latest/graphql/reference/mutations)
* [GitHub GraphQL Authentication reference](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql)