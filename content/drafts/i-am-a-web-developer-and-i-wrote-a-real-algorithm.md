---
title: "I am a web developer and I wrote a real algorithm"
created: 2023-05-12T09:10:15-05:00
date:
draft: true
slug: i-am-a-web-developer-and-i-wrote-a-real-algorithm
description: Algorithms are a part of any software engineer's daily life, but the algorithms I wrote always seemed trivial and mundane compared to Real Algorithms™️ that I would see on LeetCode et. al. Today I wrote an actual breadth-first search algorithm that moved beyond the basic examples that are shown in most problem sets! Proof that even web developers sometimes need to know Real Computer Science™️
---

## TLDR

I've worked in tech for about 7 years - about 4 as QA and about 3 as a developer. Algorithms are a part of any software engineer's daily life, but the algorithms I wrote always seemed trivial and mundane compared to Real Algorithms™️ that I would see on LeetCode et. al. Today I wrote an actual breadth-first search algorithm that moved beyond the basic examples that are shown in most problem sets! Proof that even web developers sometimes need to know Real Computer Science™️.

## The problem

At [Quil](https://getquil.com), we use [Stripe](https://stripe.com) for our payment processor. One of Stripe's most robust features is the ability to send webhooks for _every_ event you can imagine. We utilize webhooks to synchronize our internal representation of payments with Stripe's system - a simple example is to update an Invoice from `Open` to `Paid` or `Canceled`.

As we built out more and more webhook handler functions, we discovered that a common thread among all of them was finding the user in our system that was associated with the webhook. We decided that before we delegate to any specific webhook handler function, we should ensure that we can find a user associated with the generic webhook event. If we cannot find a user, we log and throw an error. (Our webhooks processor is an AWS Lambda so throwing is safe and efficient.)

A brief aside: it is important to know that Stripe webhooks are (unsurprisingly) JSON objects. The JSON objects all share certain top-level keys, and the data specific to the event is nested in the `.data.object` property. The `.data.object` object is itself a deeply-nested JSON object whose structure varies depending on the webhook event. Stripe's documentation is exhaustive as to what structure each webhook takes, so it is possible to simply enumerate through the known webhook types and check for user properties based on what we know "should" exist on the JSON object. However, this is basically what we were doing previously inside each specific event handler function, so we wanted to see if we could achieve a more generic approach to finding a user from the properties of the JSON object. Here's an example of a JSON webhook object (with a huge amount of data removed, just to demonstrate the structure):

```json
{
  "id": "evt_123",
  "object": "event",
  "data": {
    "object": {
      "id": "ch_123",
      "customer": "customer 123",
      "billing_details": [
        {
          "customer_email": "test@example.com"
        }
      ]
    }
  },
  "type": "charge.succeeded"
}
```

With that context, let's take a look at our `findUser` function. The function's algorithm goes roughly like this:

1. Does the webhook contain a `customer` key whose value is a `string`?
   1. Yes: query for a user in our DB using the Stripe customer ID. Return this user (or `null` if none exists)
   2. No: continue
2. Does the webhook contain a `customer` key whose value is an `object` with a key named `email`?
   1. Yes: query for a user in our DB using the email. Return this user (or `null` if none exists)
   2. No: continue
3. Does the webhook contain a `customer` key whose value is an `object` with a key named `id`?
   1. Yes: query for a user in our DB using the `customer.id`. Return this user (or `null` if none exists)
   2. No: continue
4. (this is our fallback step): Try to find a key in the object that contains the substring `"email"`, and use the value of that key to query for a user

For most webhooks, this algorithm worked, but a week ago we got a webhook that did not conform to any of these expectations and threw an error when the user was not found. Of course this was our bug, not Stripe's. The user existed and the webhook was well-formed; we were just lazy when we wrote the initial implementation. (Note: I can say "lazy" because "we" was actually "me" in this story 🙃).

The first implementation for our "fallback" step was to just loop through the top-level keys of the webhook object and look for a key with the substring `"email"`. The webhook that threw an error didn't have any top-level keys that met this criteria, but it did have nested keys that met this criteria. This got me thinking about optimizations to our "fallback" search.

## The solution

I realized that if I treated the object like a heterogeneous tree structure, I could use a breadth-first search to find a nested key that contains the substring `"email"`. Why did I use breadth-first instead of depth-first? My assumption was that Stripe would likely put the most important information in top-level keys, and for most cases it would be fastest to search from the top down. I also assumed that, in some weird circumstance where a webhook contained two different emails (I'm not even sure this is possible), the one at the top of the object was more likely to contain the information I wanted.

Let's take a short moment to ask the hard questions. Was implementing a breadth-first search the simplest solution to fix the problem? Heck no! In a world with constant competing demands on my time and energy, was this the best use of my limited resources? Definitely not!

But...was it fun? Ok, fine, yes it was 😏

Here's my full solution (in TypeScript). I don't share this to brag about my programming prowess, but rather to share what I consider to be a "real algorithm":

```typescript
// type is more useful than `typeof`
// because it differentiates Objects from Arrays
// this could be implemented manually if you don't want dependencies
import { type } from "ramda";

/**
 * A (surely suboptimal) breadth-first search.
 * Goal is to find a key that contains "email"
 * in a deeply-nested, heterogeneous object, which we treat as a tree
 */
export function findEmail(obj = {}): string | null {
  function search(stack: ReturnType<typeof Object.entries>): string | null {
    const children = [];
    while (stack.length) {
      const [key, value] = stack.pop();
      if (key.includes("email") && isNonEmptyString(value)) {
        return value;
      }
      if (Array.isArray(value)) {
        children.push(
          // if `value` is an array, the only useful items inside are Objects,
          // in which case we want their `entries`.
          // Primitives, or nested arrays, are not useful here.
          ...value
            .filter((item) => type(item) === "Object")
            .flatMap(Object.entries)
        );
      } else if (type(value) === "Object") {
        children.push(...Object.entries(value));
      }
    }
    if (children.length > 0) return search(children);
    return null;
  }
  return search(Object.entries(obj));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}
```

## Why was this a notable experience for me?

As a professional in the tech industry, I'm inundated with the popular opinion that the only way to get a "good job" is by grinding on LeetCode for hours/days/months prior to any interview. I'm simultaneously convinced that deeply knowing algorithms and data structures is overkill for most web development jobs, which, in my experience, often boil down to ["VendorOps"](https://rachelbythebay.com/w/2020/08/14/jobs/). On top of that, I'm living proof that deep expertise in algorithms and data structures isn't necessary to land a "good job" because I don't have deep experience in these topics and I love my job.

I am by no means suggesting that algorithms and data structures are not important - I would argue it is critical to understand the difference between an Object and an Array (and to know that other languages might refer to an "Object" as a HashMap, Map, Dictionary, or Struct, and refer to an "Array" as a List, Stack, or Vector) and when to reach for one over the other. But the "classic" algorithms questions that one might come across in "interview prep" essays are extremely unlikely to come up in the day-to-day experience of most web developers. In addition, we now live in the era of LLMs where you can generate a probably-mostly-adequate answer to a problem like this in seconds.

All this is to say that, in general, I believe having an understanding of high level concepts from the study of algorithms and data structures is very useful, and maybe even critical to being successful as a software professional. However, in my experience, it is exceptionally rare to be able to identify a "classical" algorithmic solution to a "real world" web development problem. So, when I had this experience myself, it was exciting and struck me as worthy of a blog post!

What do you think? Is it useful for most jobs to study algorithms and data structures in depth? Find me on the internet somewhere to tell me what you think!
