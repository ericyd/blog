---
date: 2024-12-06T11:54:24-06:00
slug: 1733507664315
---

Miscellaneous coding preference: return early rather than nesting business logic inside a conditional.

Bad:

```js
function example() {
  const optional = returnOptional()

  if (optional) {
    // all business logic,
    // including additional nestings
  }
  // implicit `return undefined`
}
```

Good:

```js
function example() {
  const optional = returnOptional()

  if (!optional) {
    // explicit return value,
    // good for clarity and intentionality
    return null
  }

  // all business logic,
  // starting at the top-level of nesting!
}
```
