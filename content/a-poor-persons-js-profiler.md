---
title: "A poor person's JS profiler"
date: 2020-12-04T13:59:55Z
cuid: ckiaozk4u02izqrs1e3wsdi0h
draft: false
slug: a-poor-persons-js-profiler
tags: js, javascript, performance
---

For those of us who didn't suffer through a formal computer science education, we often find ourselves second-guessing our programming choices due to concerns that our implementation isn't the "right way" to do something (imposter syndrome, anyone? 🙋🏻‍♂️🙋🏾‍♀️). Never having taken a Data Structures and Algorithms course [[1]](#notes), we often find ourselves asking: "Is this how a _real_ software engineer would write this?"

As someone who is deeply interested in performance but lacks the classical background to intuitively know the optimal way of performing tasks, I'm often looking for ways to profile my code to test different approaches from a practical standpoint. Depending on your language and framework, there is probably a profiler out there that does a _million_ cool things and has a README several paragraphs long. I don't know about you but I don't have time to learn a new tool just to verify that I'm using my other tools correctly!

**Solution** 💡: did you know that you can profile your code in **1 line** from a standard Linux or Mac terminal? 🤯

# `time` (may or may not be on your side)

Yes, that's right, I'm talking about the handy POSIX utility `time`. How does it work?

```bash
time <my command>
# prints out the ... ahem... _time_ it took to run
```

# Solving real world problems that matter to real world people 💪🏻💪🏽💪🏿

The specific problem I set out to confirm was the fastest way to check inclusion of a value in a predefined set. Specifically, I know in theory it is faster to look up values from a hashmap (Object in JS) than from an array (Array in JS 😛), but _how could I prove it?_ And what would it mean for my code implementation?

Example problem: Determine if a given `char` is included in a given set of `char`s. More simply: which of these is faster:

```js
// option 1
const allowed = ["1", "2", "3", "4", "5"];
const isAllowed = (char) => allowed.includes(char);

// option 2
const allowed = "12345";
const isAllowed = (char) => allowed.includes(char);

// option 3
const allowed = { 1: true, 2: true, 3: true, 4: true, 5: true };
const isAllowed = (char) => allowed[char] !== undefined;
```

Spoiler alert: It really doesn't matter!

But technically there is a correct answer, so let's find it.

# Profiling the code 🚀

Since JS is a scripting language, it's super easy to profile these directly from the command line. You could easily throw this in a file and execute it, but since these examples are so quick we're just gonna throw it in a one-liner:

```bash
time node -e "const allowed = ['1', '2', '3', '4', '5']; const isAllowed = char => allowed.includes(char); for (let i=0;i<100000000;i++) { isAllowed(Math.floor(Math.random() * 10).toString()) }"
```

## Wow! That's hard to read! What am I looking at?

Here's the expanded version of the string we're passing to the Node interpretter.

```js
const allowed = ["1", "2", "3", "4", "5"];
const isAllowed = (char) => allowed.includes(char);

for (let i = 0; i < 100000000; i++) {
  isAllowed(Math.floor(Math.random() * 10).toString());
}
```

Basically, we are creating a loop to execute our code 100 million times. Inside each execution of the loop, we call our test function `isAllowed` with a random value - some of which will be allowed and some of which are not allowed.

## Testing all variations

To test the three variations, we just need to modify the section of code where we define `allowed` and `isAllowed` values.

```bash
# option 1
time node -e "const allowed = ['1', '2', '3', '4', '5']; const isAllowed = char => allowed.includes(char); for (let i=0;i<100000000;i++) { isAllowed(Math.floor(Math.random() * 10).toString()) }"
# => node -e   4.64s user 0.03s system 99% cpu 4.678 total

# option 2
time node -e "const allowed = '12345'; const isAllowed = char => allowed.includes(char); for (let i=0;i<100000000;i++) { isAllowed(Math.floor(Math.random() * 10).toString()) }"
# => node -e   3.70s user 0.03s system 99% cpu 3.731 total

# option 2
time node -e "const allowed = {'1':true, '2':true, '3':true, '4':true, '5':true}; const isAllowed = char => allowed[char] !== undefined; for (let i=0;i<100000000;i++) { isAllowed(Math.floor(Math.random() * 10).toString()) }"
# => node -e   2.97s user 0.02s system 99% cpu 2.994 total
```

## Analyzing results

- **Option 1, Array lookup**: `4.64s` [[2]](#notes)
- **Option 2, String lookup**: `3.70s` (<-- this legitimately surprised me)
- **Option 2, Hashmap lookup**: `2.97s`

Wow! It turns out classical computer science is correct: hashmap lookup is truly faster than array or string lookup, _even in a high level language like JavaScript!_

Wait... is no one else excited by this?

It's true, this is a pretty boring result. And, it was kind of a lot of work. More importantly, _did it matter???_

Let's be real about what we're seeing: With 100 **million** executions, the difference between our absolute worst and absolute best performing implementation was approximately 1.5 seconds in user time. Does that even matter? **NO**. If we divide that by each execution, it's a difference of 15 _nanoseconds_ between the most optimal and the least optimal. And the most readable (String lookup) wasn't even the worst performing! So in this case, skip the optimization and just write it in the most intuitive and readable way. [[3]](#notes)

## Hold your horses 🎠 is this a valid test?

The example I'm providing is indeed contrived, because the calls to `Math.random` are taking a non-trivial amount of the execution time (about a third to over half). However, since real-world code involves much more complicated relationships to other code, including it in our profile is OK because it's using a similar baseline for all of our samples.

## Advice for more complicated examples

For scripting languages, using `time` is a great tool for simple profiling. However, for more complicated profiling you'll likely want to put it in a script and execute the file instead of an inline code snippet. For example:

```bash
time node my-script.js
```

Where `my-script.js` includes your full example, including the loop.

Beware: don't use a bash/zsh loop for scripting language profiling. The cost of invoking the interpreter will far outweigh the cost of executing your code.

# Why stop at JS?

If you've read this far, you've probably deduced that this method of profiling is not limited to JS. You could easily apply this same principle to any interpretted language by swapping `node` for `python`, `ruby`, etc. Heck, you could even profile a compiled language this way!

```rs
// test.rs
use std::char;

fn main() {
  let allowed = ['1', '2', '3', '4', '5'];
  let is_allowed = { |c| allowed.contains(&c) };

  for i in 0..100000000 {
    let my_char = char::from_digit(i as u32 & 0xF, 16).unwrap();
    is_allowed(my_char);
  }
}
```

```bash
rustc test.rs
time ./test
# ./test  19.15s user 0.06s system 98% cpu 19.523 total 🤯
```

And now we've learned that I don't know how to write performant Rust because that took forever!

# What are we going to tell our parents we learned in school today?

1. Profiling is ~fun!~ possible! [[4]](#notes)
2. Profiling is ~easy!~ ugly but functional!
3. `time` is ~the best!~ available on my system!

Happy profiling 👋🏻

---

# Honorable mention

Yes, the title of this post includes the letters `J` and `S` in uppercase. But, I wanted to mention a nice zero-dependency profiler I came across while writing some Kotlin code a few weeks ago.

[SimpleProfiler](https://github.com/davidohana/SimpleProfiler) is a really nice, bare-bones profiler available in both Kotlin and Python which can be easily plugged into your projects for slightly-more-advanced functionality.

---

#### Notes

**[1]** Starting 7 different Udemy courses only to die of boredom and quit doesn't count

**[2]** I'm using the `user` time as my benchmark, to try to ignore system factors

**[3]** Ultimately, the usefulness of this specific optimization is not the point - we're just trying to reduce the imposter syndrome of all those people who skipped CS 101!!!

**[4]** Hey @[Hashnode](@hashnode) why don't you support strikethrough formatting?
