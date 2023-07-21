---
title: "How I Had Fun Searching For Jobs"
created: 2023-07-07T11:03:58-05:00
date:
draft: true
slug: how-i-had-fun-searching-for-jobs
description:
tags: []
---

1. gameify everything. Track EVERYTHING so it feels exciting
2. ChatGPT for cover letters!
3. Set goals for applications, leetcode problems
4. Keep a schedule
5. Don't be afraid to sleep in
6. Resume template: html, pdf, markdown all in one
7. Phone clip/stand for phone screens - hands free note taking, and less distractions!

First technical interview summary:

- Objective: given a "real" file from the API of the company's codebase, fix broken functionality, refactor, and add tests as necessary.
- It was done in Coderbyte. It was a simple file that exposed 3 routes on an Express server and used a mock object to simulate the MongoDB calls.

Mistakes from my first technical interview

1. Did not read instructions! 😱 The interviewer gave me an overview so I dove right in, but of course there was useful information in the written instructions that I skipped right over. Bad look.
2. Got bogged down in debugging, did not spend adequate time on meat of assignment. I started by writing some tests and the test runner in Coderbyte was behaving strangely; debugging the test failures prevented me from making substantial refactors to the program which was the main objective.

---

next interview Mike Web, Silicon Labs

coding problem

```typescript
function shuffleArray(array: any[]): any[] {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const tmp = array[randomIndex];
    array[randomIndex] = array[i];
    array[i] = tmp;
    // or:
    // [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array;
}
```

Need to study database sharding and partitioning before next interview!!!!!!!!!

- https://igotanoffer.com/blogs/tech/sharding-system-design-interview
- https://www.geeksforgeeks.org/database-sharding-a-system-design-concept/

Custom Part manufacturing service
docs.silabs.com -> documentation generator/aggregator/publisher
new project: SVS, security something something.
