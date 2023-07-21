---
title: "Trying (and Failing) to Build the World's Fastest Case-Changing TypeScript Library"
created: 2023-07-21T10:19:30-05:00
date: 2023-07-21T13:06:26-0500
draft: false
slug: trying-and-failing-to-build-the-worlds-fastest-case-changing-typescript-library
description:
tags: [typescript, rust, wasm, webassembly]
---

## TLDR

I was inspired [by a blog post I read](https://rybicki.io/blog/2023/06/27/rust-crate-into-typescript-library.html) to try making a Rust-to-WASM-powered TypeScript lib. I wanted a tangible and low-hanging goal, so I set out to make the fastest case-changing library for Node.js. I tried, and failed hard.

## What is case-changing?

I'm using "casing" in the nerd sense, so think things like `camelCase`, `snake_case`, and `PascalCase`. Converting between these types of string casing is sometimes necessary in software, for example converting the keys of a JSON object between an API that uses `snake_case` and an API that uses `camelCase`.

## How?

I won't really go too much into the details of the build process because [this other post](https://rybicki.io/blog/2023/06/27/rust-crate-into-typescript-library.html) already covers it quite well. But suffice to say the general flow goes like this:

1. Create a Rust lib that exposes some public functions. These will be called by TypeScript.
2. Use [`wasm-pack`](https://www.npmjs.com/package/wasm-pack) to compile the Rust lib to WASM and generate the JS bindings.
3. Compile the TypeScript wrapper and point to the pre-build WASM bindings.

Everthing is built on the shoulders of giants; this ended up being a pretty simple thing to set up thanks to all the amazing work of the community! You can [check out my "finished" version here](https://github.com/ericyd/fast-case).

## Building a fast library

I knew that, to make my library as fast as possible, I'd have to do as little work as possible in JS land and do as much work as possible in Rust land. One consistent feature I've kept throughout my library iterations is that the TS index file is extremely minimal - the functions it exposes merely delegate to the compiled WASM functions. The main purpose here is that the function names are `camelCase` (per JS conventions) whereas the compiled WASM functions are `snake_case` (per Rust conventions).

My first algorithm went like this:

1. Split the input string at word boundaries; return a vector of strings
2. Map through the strings and convert to the correct casing. For example, `Title Case` will have a capital first letter and lowercase everything else, whereas `snake_case` will be fully lowercased.
3. Join the words with the appropriate delimiter, if any. For example, `snake_case` has an underscore (`_`) delimiter, `Title Case` has a space delimiter, and `camelCase` has no delimiter.
4. Return the joined string

This algorithm totally worked, but...

## Testing performance

One of the libraries I really admire for it's focus on speed is [id128](https://github.com/aarondcohen/id128/). The [benchmarks](https://github.com/aarondcohen/benchmark-guid) make it clear that it is wildly faster than other ID-generating libraries for Node.js. Given this, I figured I'd steal the [benchmarking lib](https://github.com/aarondcohen/benchmarkify) that was modified by the same author.

To choose my opponent, I did a quick NPM search and found that [change-case](https://www.npmjs.com/package/change-case) was one of the more popular libraries for case changing. (I originally planned to benchmark against several NPM libs but I abandoned this plan after I saw my performance.) I set up my test harness and ran it!

😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱 😱

Oh no! It was slow as hell! After struggling through the benchmark output to make sure I wasn't misreading anything, I confirmed that my library was at least 30% slower than `change-case`. What a bummer! Turns out I'd need to tune my algorithm.

## Tuning the algorithm

After a little poking around, I decided I'd try to iterate through the raw byte array of the input string and build a new string in-place rather than splitting on word boundaries and then looping through repeatedly. My original algorithm probably had something like `O(N{{< sup 2 >}})` time complexity because it was looping through once to split on word boundaries, then looping through each word to adjust the casing. I was hoping to bring that down closer to `O(N)` time complexity. Space complexity would probably remain about the same at `O(N)` because we aren't modifying the string in-place, we're building a new string. Modifying the string in-place didn't seem feasible because of the need to insert delimiters, for example when converting `PascalCase` to `snake_case`. If you know of a way to modify strings in-place in Rust including inserting characters, please let me know!

Iterating through the raw byte array was extremely fast, but after I added some tests for unicode cases I knew that it wasn't feasible. Given that this was a lib that could accept arbitrary user input, I had to be able to elegantly handle unicode. Inserting delimiters based on the character byte codes made it too easy to generate an invalid unicode output. Throwing errors was unacceptable to me so I scrapped this idea, even though it gave me wicked performance improvements.

## Trying to reduce memory copying

One thing I knew was probably slowing me down was copying the string from the Node.js runtime to the WASM runtime. As described in the [Rust WASM docs on the `str` type](https://rustwasm.github.io/wasm-bindgen/reference/types/str.html):

> Copies the string's contents back and forth between the JavaScript garbage-collected heap and the Wasm linear memory with TextDecoder and TextEncoder. If you don't want to perform this copy, and would rather work with handles to JavaScript string values, use the js_sys::JsString type.

I decided to explore using `js_sys::JsString`, which I figured would help me avoid this copying. The problem I ran into was that `js_sys::JsString` is a struct whose methods mirror the JS String object functions. It didn't expose any of the functionality I wanted to optimize my algorithm. I tried using the same core algorithm but adjusting it to the `JsString` API, but it was actually massively slower than my original attempt. I decided to scrap this approach as I wasn't sure how to optimize the use of the `JsString` type.

## Final optimization

After a little digging through the Rust [String docs](https://doc.rust-lang.org/std/string/struct.String.html), I decided to try iterating through the `chars` and building my string that way. The Rust `char` primitive exposes convenient [is_uppercase](https://doc.rust-lang.org/std/primitive.char.html#method.is_uppercase) and [is_lowercase](https://doc.rust-lang.org/std/primitive.char.html#method.is_lowercase) methods. Given that the uppercase/lowercase boundary is a key component of [my accepted word boundary definition](https://github.com/ericyd/fast-case/blob/c69d16d60f4f1b4ae7738c15e356ded946a3e0fc/README.md?plain=1#L36-L43), this felt like a winning combination.

The [final algorithm](https://github.com/ericyd/fast-case/blob/c69d16d60f4f1b4ae7738c15e356ded946a3e0fc/src/util.rs#L1-L47) goes something like this.

1. Convert the input string to a vector of chars
2. Initialize an output string with some extra capacity, to avoid memory re-allocations in the middle of the algorithm
3. For each char of the vector:
   1. If the char is a delimiter, insert the correct delimiter (if any) in the output string. Mark that we are at a word boundary.
   2. If the char is uppercase, compare the surrounding characters to determine if it is a word boundary. If yes, insert a delimiter (if any) and mark that we are at a word boundary.
   3. Insert the char in the result string. If we are currently at a word boundary, and the casing requires an uppercase word boundary character, uppercase the char before inserting. Otherwise, use the casing's specified `transform` to transform the character appropriately (e.g. converting to lowercase or uppercase).
4. Return the output string

One huge benefit to this algorithm is that it is sufficiently generic such that adding new implementations is dead simple. The [implementation for each casing type is just 1 line](https://github.com/ericyd/fast-case/blob/c69d16d60f4f1b4ae7738c15e356ded946a3e0fc/src/snake_case.rs#L4-L7).

I added a [bunch of tests](https://github.com/ericyd/fast-case/blob/c69d16d60f4f1b4ae7738c15e356ded946a3e0fc/src/snake_case.rs#L24-L50), including unicode tests and latin ascii tests, to verify that my algorithm was working correctly and producing valid unicode output. As far as I can tell, it is extremely robust and handles a wide range of cases correctly.

## Final JS benchmarking

One thing I knew was that the overhead of copying the string to WASM was slowing me down substantially. This meant that longer strings would probably perform better in my lib than in `change-case`, because the core functionality of converting the string would be faster and therefore offset the cost of copying the string in memory. I tested this hypothesis and I was correct. `fast-case` was comparable to `change-case` when using a [reasonably long string input](https://github.com/ericyd/fast-case/blob/c69d16d60f4f1b4ae7738c15e356ded946a3e0fc/benches/index.js#L27).

However, I knew that a common use case for converting string casing is for smaller strings, e.g. the keys of a JSON object going between two APIs that use different casing conventions. So I added a benchmark with a [reasonably short string](https://github.com/ericyd/fast-case/blob/c69d16d60f4f1b4ae7738c15e356ded946a3e0fc/benches/index.js#L28) and found that it was wildly worse performance. You can see the full results [on the fast-case README](https://github.com/ericyd/fast-case/blob/008f17de53bfe6d9cc0e5331634da4a3ce208991/README.md?plain=1#L53-L187), but it turns out `fast-case` is anywhere from 2% to 40% slower than `change-case` 😬.

I was ready to throw in the towel, but I realized there was another benchmark I could perform to determine if I was just a terrible software engineer, or if the WASM boundary was actually the problem here: benchmarking my Rust algorithm.

## Rust benchmarking

By this point, I hadn't bothered to benchmark my Rust algorithm against any native Rust crates. In fact, it had kind of slipped my mind to even try using a pre-made crate first! (I'm a nerd, hence I wanted to write it myself 😛.) As a fairly beginner-level Rustacean, it took me a little bit to get the [`criterion`](https://crates.io/crates/criterion) crate configured, but once I did I went to town and added benchmarks against 5 different crates. The results were fascinating!

It turns out, with one notable exception (which I'll discuss in a moment), my library is about 10-100x faster than other leading Rust crates!!! I was blown away at the difference in performance, and if I'm being honest, also a little bit proud 🥲!

The one notable exception to my success was [heck](https://crates.io/crates/heck), which was functionally equivalent to my algorithm in speed. If you're dealing with only ascii characters, `heck` offers a variant that avoids unicode handling and is distinctly faster than `fast-case` (although by only a small margin). However, since my algorithm accurately handles unicode, I thought it was only fair to compare apples to apples and [enable the unicode feature](https://github.com/ericyd/fast-case/commit/1411e65f45be2f6b503fcf687d517557b3980c44) for `heck`. After this change, the result was that my algorithm was faster than `heck` in all cases except for `camelCase`! You can see the full benchmarks [on the `fast-case` README](https://github.com/ericyd/fast-case/blob/008f17de53bfe6d9cc0e5331634da4a3ce208991/README.md?plain=1#L206-L281).

Of course, the differences we're talking about are on the scale of tens of nanoseconds; this is not a meaningful difference in most practical contexts. However, it was yet more proof that the algorithm I wrote was pretty darn good. Even though I wasn't able to write the fastest _TypeScript_ library in the world, I can take comfort knowing that I wrote a blazing fast Rust algorithm.

I am choosing (at the moment) not to publish `fast-case` as a Rust library because the difference between it and `heck` is so incredbily minor. I would prefer to contribute back to `heck` rather than publish a new library. I also think that the difference in performance is not substantial enough to matter for 99.999% of use cases; to me, the cost of publishing yet another crate with (essentially) duplicate functionality is greater than the benefit of serving those very few who need nano-optimizations.

## Learnings & take-aways

1. Do not use WASM for small functions! Copying the values between the JS runtime and the WASM runtime will eat away any performance improvements you might achieve from the speed increase of the WASM code.
2. Benchmark early, benchmark often! You can't know if you're getting better or worse without benchmarks.
3. Test everything! Grabbing test cases from "inspiration" libraries is a great way to build a test suite fast without having to think _too_ hard about edge cases right away.
