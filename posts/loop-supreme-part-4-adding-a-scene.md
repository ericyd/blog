# Loop Supreme, part 4: Adding a Scene

2022-11-07T12:58:26Z

tags: music, audio, build-in-public

---

_This is part 4 in a series:_

- [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](https://ericyd.hashnode.dev/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](https://ericyd.hashnode.dev/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](https://ericyd.hashnode.dev/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](https://ericyd.hashnode.dev/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](https://ericyd.hashnode.dev/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](https://ericyd.hashnode.dev/loop-supreme-part-5-record-and-loop-a-track)
- Part 4: Adding a Scene
- [Part 3: Metronome click](https://ericyd.hashnode.dev/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](https://ericyd.hashnode.dev/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](https://ericyd.hashnode.dev/new-project-building-a-web-based-audio-looper)

## Goal

Add a basic `Scene` component, which should be a container for all the `Track`s in the loop. A `Scene` should be able to add `Track`s, and the `Track` component should be able to delete itself from the `Scene` track list.

## Implementation

This was a pretty boring task, mostly some simple React components. I refactored the "Container" styles into a new component so the Metronome and Scene would look the same. I'm not totally sure I'll keep this styling but for quick iteration I wanted it to be visually consistent.

The only thing that held me up on this task was forgetting to put the `key` prop in the right place 🤦🏻. Initially, I added it to the [top-level `div` in the `Track` component](https://github.com/ericyd/loop-supreme/blob/ba3fdde495330d0ad5b74b17e863a50edbf90c75/src/Track/index.tsx#L14), rather than [on the actual `Track` component rendered in the `Scene`](https://github.com/ericyd/loop-supreme/blob/ba3fdde495330d0ad5b74b17e863a50edbf90c75/src/Scene/index.tsx#L35). This caused the "remove" functionality to break and I was scratching my head until I realized my silly mistake.

## Status of app

- Merged PR https://github.com/ericyd/loop-supreme/pull/5
- Refactored some styling into a wrapper component
- The app now has a `Scene` which can hold one or more `Track`s!

![Loop Supreme Scene](https://cdn.hashnode.com/res/hashnode/image/upload/v1667846863020/PtbGE_zof.png align="left")

## Next time

- Adding "record" functionality to the `Track` component!!! 🙌🏻 So pumped for this, when this is working I think we'll officially have a proof-of-concept.

## Time log

- probably an hour and a half?
