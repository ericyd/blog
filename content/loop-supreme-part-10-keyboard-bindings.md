---
title: "Loop Supreme, part 10: Keyboard bindings"
date: 2022-11-28T15:46:21Z
cuid: clb1bl6cn000408l80fuy5beo
draft: false
slug: loop-supreme-part-10-keyboard-bindings
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1669671833527/rJpDEGXgN.png
tags: music, audio, build-in-public
---

_This is part 10 in a series about building a browser-based audio live looper_

- [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- Part 10: Keyboard bindings
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

1. Fix the audio buffer length, so it matches the loop length
2. Add keyboard bindings for common user interactions

## Implementation

Fixing the audio buffer length ended up being the easy part of this update. [The PR](https://github.com/ericyd/loop-supreme/pull/23) is quite simple - it was really just a matter of adding a few dependencies to the dependency array when building the recording callback, and then using the metronome settings to calculate the correct number of samples for the buffer.

Adding keyboard bindings proved much more difficult. I tried just making a module exposed a method to wrap `window.addEventListener('keydown', cb)`, but the issue I ran into was that cleanup effects didn't happen gracefully and a bunch of additional event listeners were created.

I then decided to use a context. My thinking was: create a single callback that delegates the event based on which key was pressed. To delegate the events, I just created a mutable map which mapped keys to callbacks. This actually worked shockingly well for such a simple model, until I tried to bind events to Tracks. The UX I had in mind was that a user could select a specific track with the `0-9` keys; then, once a track was "selected", the user could trigger track-specific behaviors like muting (`m`) or arming for recording (`r`). The problem was that this required adding and removing elements from the callback map fairly rapidly when different tracks were selected. I'm sure it would be possible to code this correctly, but I found it frustrating to figure out the nuances of the effects in React.

To accommodate this behavior, I decided to make the "callback map" a map of keys to _lists_ of callbacks, where each element of the list had an ID associated with it. This allowed the bindings to be de-duped on add, and also cleared correctly. It more closely resembles a traditional `EventTarget`, which perhaps indicates that I should have just used an `EventTarget` instead of rolling my own janky version. Regardless, the behavior worked as I hoped, and I ended up using this!

## Learnings

- Keyboard event listeners are not optimized for binding callbacks to specific keys. Using a mutable map to define event handlers for specific keys ended up being a very useful pattern to follow. I'm curious if there are technical reasons that it shouldn't be done this way, but from a pragmatic perspective it seemed quite successful.

## State of the app

- Merged PRs
  - [#23 - fixing track buffer length](https://github.com/ericyd/loop-supreme/pull/23)
  - [#24 - adding keyboard bindings](https://github.com/ericyd/loop-supreme/pull/24)
- Track buffers now have the correct length, which makes the loops align properly
- The app can be controlled with a keyboard more easily, since main actions are bound to specific keyboard events

## Next steps

- Add ability to export audio (at least stems - I think it will be quite challenging to record a live performance)
- Add ability to select input per track
- Some UX improvements I've noticed as I've been testing
