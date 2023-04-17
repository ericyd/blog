---
title: "Loop Supreme, part 11: Exporting stems and changing inputs"
date: Thu Dec 08 2022 16:19:45 GMT+0000 (Coordinated Universal Time)
cuid: clbfaboqu000b08jngsh9c2wt
draft: false
slug: loop-supreme-part-11-exporting-stems-and-changing-inputs
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1670515492618/DDi_1Dag0.png
tags: music, audio, build-in-public
---

_This is part 11 in a series about building a browser-based audio live looper_

- [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
- Part 11: Exporting stems and changing inputs
- [Part 10: Keyboard bindings](https://ericyd.hashnode.dev/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](https://ericyd.hashnode.dev/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](https://ericyd.hashnode.dev/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](https://ericyd.hashnode.dev/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](https://ericyd.hashnode.dev/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](https://ericyd.hashnode.dev/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](https://ericyd.hashnode.dev/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](https://ericyd.hashnode.dev/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](https://ericyd.hashnode.dev/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](https://ericyd.hashnode.dev/new-project-building-a-web-based-audio-looper)

## Goal

- Add the ability to export stems
- Add the ability to change inputs per-track

## Implementation

Lots has happened since the last update! I found myself going down rabbit hole after rabbit hole. As I got the two main "goals" finished, I realized that the most important aspect of the app - recording audio - was still working very poorly. There was a bizarre attenuation effect on the audio recorded from my audio interface that made the app effectively unusable. Trying to fix this led me down several refactors that were ultimately unnecessary. Bizarrely, the fix was [extremely simple](https://github.com/ericyd/loop-supreme/blob/163563e60748f7d258caafd20cbc86f37beed4e9/src/Track/controls/SelectInput.tsx#L21-L28) and unrelated to any code I actually wrote. Rather, it was an implementation detail of the Web Audio API.

Another bug I noticed was that, even with the [timing correction I made in #23](https://github.com/ericyd/loop-supreme/pull/23), loops were experiencing noticeable drift over the course of several loops. I decided that the most pragmatic solution was to stop using the `loop` parameter on the `AudioBufferSourceNode` and simply [restart the buffer on each loop start event](https://github.com/ericyd/loop-supreme/pull/27). This seems to introduce a bit more clipping on loop start/end, but for the moment it's a worthwhile tradeoff for accurate timing.

In addition to fixing those two major bugs, I did add the ability to export stems, and also change inputs on a track. Both of these were important. Changing inputs is important because the "default device" is not always what a user might expect in a browser. And exporting audio is important because it's fun to have artifacts of what you record! I used another `Worker` for the exporter, and copied some code from a Google project to write the WAV file blob, so it was pretty easy to implement. The hardest part was learning that an `AudioBuffer` couldn't be serialized directly in a `Worker` message, so I had to extract the `Float32Arrays` from the channel data directly to export it. I'm not convinced this was worth it, because writing the WAV file is pretty fast and could probably happen on the UI thread, but it doesn't hurt anything and now it's done 🤷🏻. Adding the option to change inputs was also pretty straight forward. The Web Audio API provides an option to enumerate devices, so it was just a matter of setting the `MediaStream` when the device changed.

There were lots of minor bug fixes and improvements, but those are the big updates to cover! I tried to keep notes in the PRs for each specific fix that I made.

## Learnings

- Audio constraints are important! As noted above, I was getting a really horrible attenuation modulation effect when recording tracks. I thought it was due to some weird React architecture but it turns out that specifying constraints on the user media request totally fixed it! Very strange, but I'm glad it was an easy solution
- `Worker` messages cannot handle all data types. `AudioBuffers` cannot be passed in a `postMessage` function, which surprised me. I imagine that most types can be serialized just fine, but it's good to know that certain native classes cannot be. Luckily, it's fairly easy to extract the channel data as raw `Float32Arrays`, which work just fine as a `Worker` message.
- Keyboard bindings deserve to be defined at the component level, rather than in a global context. Defining them globally introduces all sorts of weird edge cases around duplicate key handlers and weird behavior when mounting/unmounting components rapidly. Using a hook that can be called at the component level made this design much more straightforward.
- Be careful of extra renders! One of the rabbit holes I went down when trying to debug the recording quality issue was fixing extra renders in the `Scene` and `Track` components. Originally, I nested the `Scene` under the `Metronome` component. This is a fine choice in itself, but unfortunately, I was attaching the `currentTick` property to an object that was passed to every child. This meant that every child was re-rendered on every beat. This is no good! Lot's of extra work being done. I realized there was only 1 piece of UI that actually needed to update on each beat: the `BeatCounter` component. I moved the relevant event listener and state into that component, and it fixed the issue. I also wanted to de-couple the components of my app a bit more, so I placed `Scene` as a peer component of `Metronome` and just initialized the `Clock` worker as a parent. This was a nice simplification and I think made the data flow a lot easier to follow.
- Looping in time is hard! I have no doubt that using scheduled events on the `AudioContext` clock would fix this issue, but I still think that would make my life very challenging to deal with changes to the metronome settings. For my purposes, it seems that starting a new `AudioBufferSourceNode` on each loop start is the best way to achieve consistent timing with the metronome.

## State of the app

- Merged PRs
  - [#25 UX improvements](https://github.com/ericyd/loop-supreme/pull/25)
  - [#26 Export to WAV](https://github.com/ericyd/loop-supreme/pull/26)
  - [#27 Loop start correction](https://github.com/ericyd/loop-supreme/pull/27)
  - [#28 Refactor props tree](https://github.com/ericyd/loop-supreme/pull/28)
  - [#29 Key bindings hook](https://github.com/ericyd/loop-supreme/pull/29)
  - [#30 Fix recording settings (define audio constraints)](https://github.com/ericyd/loop-supreme/pull/30)
- Most major features are working!
  - Exporting stems
  - Changing input per track
  - Keyboard bindings
  - Looping playback with reasonable accuracy

## Next steps

- Potentially improve garbage collection by disconnecting unused components
- A few minor UI improvements
- See if there is an easy way to record a performance
