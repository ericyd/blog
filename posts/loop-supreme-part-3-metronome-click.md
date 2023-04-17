---
title: "Loop Supreme, part 3: Metronome click"
datePublished: Sun Nov 06 2022 16:42:28 GMT+0000 (Coordinated Universal Time)
cuid: cla5l1mji000308ms1oal1i2e
draft: false
slug: loop-supreme-part-3-metronome-click
tags: audio, build-in-public
---

_This is part 3 in a series:_

- [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](https://ericyd.hashnode.dev/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](https://ericyd.hashnode.dev/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](https://ericyd.hashnode.dev/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](https://ericyd.hashnode.dev/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](https://ericyd.hashnode.dev/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](https://ericyd.hashnode.dev/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](https://ericyd.hashnode.dev/loop-supreme-part-4-adding-a-scene)
- Part 3: Metronome click
- [Part 2: Adding a Metronome](https://ericyd.hashnode.dev/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](https://ericyd.hashnode.dev/new-project-building-a-web-based-audio-looper)

## Goals

1. Add an audible "click" when the metronome advances to the next tick. I'm excited because this is the time I'll use the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)!
2. Keep it absolutely dead simple. There will likely be lots of refactoring as I understand more about how to properly initialize and route the audio, so there's no need to search for the "perfect" solution right now

## Implementation

### Producing a tone

To keep things dead simple, I wanted to use an `OscillatorNode` to play a simple sine wave on each beat.

It turns out this is actually fairly simple, and there is [ample documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode#examples) about how to create a simple `OscillatorNode`.

### Playing in time

After I was able to produce a tone, I needed to synchronize the tone with the metronome tick. There is [a great tutorial on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#playing_the_audio_in_time) on how to do this very thing, but since I'm using React I had to substantially alter their example to fit the React paradigm. The queue-based playback mechanism they demonstrate probably works great for a simple script, but I knew that mutating lots of state within a React component would be bad news bears. Unless I was prepared to use a bunch of `ref`s and `useEffect` hooks, I knew that I wouldn't want to copy their example precisely.

After some experimentation, it seemed that simply adding a `playTone()` call inside my `useInterval` callback was sufficient to make the metronome work! Keep in mind, I did not scientifically test this to make sure it's playing in perfect time, but it seems to be "good enough" for now. I have about 98% certainty that I will need to refactor this in the future, but for now the timing appears accurate from simple observation.

## Learnings

There were lots of interesting surprises in this one! That makes sense, given that I've never touched the Web Audio API before in my life. It was fun to wrap my brain around some of the suggested patterns, and understand why the API is built the way it is. Here are some things that surprised me specifically:

1. `OscillatorNode`s can only be started once! Since I'm using an `OscillatorNode` for the main "beep" of the metronome, that means I had to create a new `OscillatorNode` every time I wanted to play a tone. Of course this isn't complex from a code perspective, but my initial assumption was that it would be preferable to create a `ref` of an `OscillatorNode` and then `start()`/`stop()` it every time I wanted to emit a tone. Turns out this is not the recommended pattern, and creating a new node every time is correct. (This also matches [the examples in the MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#the_oscillator).)
2. `AudioContext` is not supposed to be created without user input. This is shown as a console warning; in Firefox it reads: "An AudioContext was prevented from starting automatically. It must be created or resumed after a user gesture on the page." This contributed to my [first scope creep](https://github.com/ericyd/loop-supreme/commit/52daed8e1764e6b7076982daa182e944163e6977#diff-51abe96bc493857fdfba599c6b70e3a6c09200cf29e130d15b599fef538e32dfR30)! I realized that I needed to add a way for the user to start the metronome, without it auto-playing on page load. I expect in the future I'll defer on creating the `AudioContext` at all until the user clicks "play" (as opposed to my current pattern where I instantiate the `AudioContext` immediately, but allow the user to start it explicitly with the "play" button). I decided to punt on that until I understood my final patterns and routing a bit more.
3. `AudioContext` has a high precision timer built in that can be accessed via `audioContext.currentTime`. This timer is used as the source of truth in [the MDN example of playing in time](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#playing_the_audio_in_time), and I suspect I may refactor to use this as my source of truth as well. However, I'm currently pleased that a simple JS `setInterval` is keeping time that appears pretty accurate from a human perspective.

## State of the app

1. Merged PR https://github.com/ericyd/loop-supreme/pull/4
2. Metronome makes a noise!
3. Metronome can be started/stopped by user
4. Minor styling updates

## Time log

- probably about 2 hours of experimentation / research / implementation for Metronome beep
- another hour or so for cleanup and testing
