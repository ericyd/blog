# Loop Supreme, part 9: Visualizing the waveform

Wed Nov 23 2022 20:34:05 GMT+0000 (Coordinated Universal Time)
cuid: clau3sz4j000908lbdbjja3qi
slug: loop-supreme-part-9-visualizing-the-waveform
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1669235605219/QNWmnTgUF.png
tags: music, audio, build-in-public

---

_This is part 9 in a series about building a browser-based audio live looper_

- [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](https://ericyd.hashnode.dev/loop-supreme-part-10-keyboard-bindings)
- Part 9: Visualizing the waveform
- [Part 8: Building and hosting](https://ericyd.hashnode.dev/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](https://ericyd.hashnode.dev/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](https://ericyd.hashnode.dev/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](https://ericyd.hashnode.dev/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](https://ericyd.hashnode.dev/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](https://ericyd.hashnode.dev/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](https://ericyd.hashnode.dev/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](https://ericyd.hashnode.dev/new-project-building-a-web-based-audio-looper)

## Goal

Create a waveform visualization, and redesign the app to make it feel more user friendly

## Implementation

The task of visualizing the waveform was really fun for me - it was just the kind of semi-mathy-but-low-stakes work that I love.

I've seen many examples online and several SO answers that draw values to a canvas to visualize a waveform. The general pattern is one "sample" (which might be a grouping of actual audio samples) is drawn as a fixed-width rectangle, with the height being determined by the amplitude.

The rectangles-on-a-canvas pattern works totally fine, but I have an unjustifiable love for SVG and I felt like it was a superior medium for drawing scalable waveforms. The other benefit is that an SVG waveform could be stretched to fit variable aspect ratios, which works much better for a web app where the window dimensions are unknown and highly variable.

I knew the general requirements were:

1. Ingest frames (blocks of samples) at about 60hz (the `RecordingProcessor` audio worklet is responsible for publishing this data back to the app)
2. Normalize the frames in realtime. I don't know the bounds of the gain on a web audio input. In my experience the absolute gain values are << 1, but I didn't know if this was universally true. Normalizing on the fly would prevent the need to guess.
3. Scale the points to the correct x-axis dimensions based on the expected number of frames in the loop
4. Create a string to represent the [`d` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) of the [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path)

Each of these steps are relatively processor intensive, so I reached for... (drumroll 🥁)... a Worker! Delegating all this processing to a worker ended up being really nice because I didn't have to think much at all about serious optimizations, since all the major number crunching would be happening on a separate thread. You can see the [completed waveform worker here](https://github.com/ericyd/loop-supreme/blob/f3c94d76bde928cfe0c75b7f2d942b3c09944f54/src/worklets/waveform.ts).

The most challenging part of this was mentally mapping the data flow. In a UTM-style diagram, it looks like

```shell
[ Recording ]    [ App ]   [ Waveform ]
[ Processor ]       |      [  Worker  ]
      |             |             |
  Publish frame --> |             |
      |             |             |
      |       Publish frame ----> |
      |             |             |
      |             |         Collect frame
      |             |             |
      |             |         Normalize and
      |             |         scale horizontally
      |             |             |
      |             |         Generate SVG
      |             |         path of smooth
      |             |         cubic bezier points
      |             |             |
      |             |  <----  Publish path
      |         Update `d`        |
      |         attribute in      |
      |         SVG path          |
  (repeat)
```

The end result was simple and effective, just like I wanted.

### Redesign

In addition to visualizing the waveform , I redesigned the app. A fun thing I tried that I've never done before is actually drawing out a mockup of my design idea before I coded it up. This ended up being super helpful! Instead of trying to code and design at the same time, I was able to look at things from a higher level and make choices about layout that I probably wouldn't have made if I had been coding it at the same time. It was easy to experiment with layout variations, which would be impossible with coding. I'll definitely be doing this for future projects where I care about the layout. Of course, I'm not a designer, and the final product could still use work, but I'm happy with the overall effect.

Here was the impact of the redesign

#### Before

![loop-supreme-9-redesign-before.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1669225143718/mS7xfFlrs.png align="left")

#### After

![loop-supreme-9-redesign-after.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1669225150316/5vhbWy2DG.png align="left")

#### Mockup

![loop-supreme-9-redesign-source.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1669225157078/U8G0WmksZ.png align="left")

## Learnings

- Always `useMemo` work Workers! My first instinct (and the way I developed it originally) was to use `useRef` for the Workers. Workers are not mutable, but I wanted to make sure I wasn't re-instantiating the Worker on each render. However, what I failed to realize is that `useRef` is still _called_ on each render - the difference is that it still returns the same value. Since I was using the pattern of `useRef(new Worker(...))`, the Worker script was being loaded on each render of the component 😱. The script of course was cached, but it led to a bunch of additional network activity that wasn't intended. I moved the Workers into `useMemo` hooks and it worked as expected. The only real change this introduced is that the memoized workers now need to be included in dependency arrays for hooks like `useEffect` or `useCallback`. This is fine though; in my eyes its more of a formality since Workers will never change.

## State of the app

- Merged PRs
  - [#20 - waveform visualization](https://github.com/ericyd/loop-supreme/pull/20)
  - [#21 - useMemo for workers](https://github.com/ericyd/loop-supreme/pull/21)
  - [#22 - redesign](https://github.com/ericyd/loop-supreme/pull/22)
- Waveforms are now visualized during recording
- The app looks much nicer (IMO). One concrete win: Tracks are much slimmer, which means more of them can fit on a monitor

## Next steps

- During testing I realized that the loops **must** be trimmed to the length of the loop. I've [hypothesized about this](https://github.com/ericyd/loop-supreme/blob/f3c94d76bde928cfe0c75b7f2d942b3c09944f54/src/Track/index.tsx#L139-L142) [before](https://github.com/ericyd/loop-supreme/blob/f3c94d76bde928cfe0c75b7f2d942b3c09944f54/src/Track/index.tsx#L161) but now it has been experimentally proven. This will be the next important change to make it usable for music performance.
