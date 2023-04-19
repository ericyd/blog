---
title: "Loop Supreme, part 7: Latency, and adding track functionality"
date: 2022-11-16T16:21:20Z
cuid: clak7jxim000b08jx503fdak5
draft: false
slug: loop-supreme-part-7-latency-and-adding-track-functionality
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1668636505190/yX-bcYVeE.png
tags: [music, audio, build-in-public]
---

_This is part 7 in a series about building a browser-based live looper_

- [Part 12: v1.0 release, and project retro](/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](/loop-supreme-part-8-building-and-hosting)
- Part 7: Latency and adding Track functionality
- [Part 6: Workers and AudioWorklets](/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](/new-project-building-a-web-based-audio-looper)

## Goal

Fix the latency issue that was causing recordings to play back significantly behind the beat. Improve app usability by adding volume controls to the metronome and individual tracks.

## Implementation

This was a really interesting and exciting step for the app. I was able to resolve (mostly, see "Learnings" below) the latency issue which was causing recorded audio to be substantially delayed on playback. Of course for a looper app this was untenable; the audio must align with the playback loop near-perfectly. The solution to this was surprising to me. I knew that the `AudioContext` reported a [baseLatency](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/baseLatency) and [outputLatency](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/outputLatency) value, but I didn't realize that these correspond primarily to playback. From what I read, the primary use-case for these is synchronizing audio playback from external sources with video, for example when streaming a video with sound.

I found was that the latency I wanted to use to account for recording latency was on the `MediaStreamTracks` that come from the `MediaStream` (i.e. the input device). However, getting this value is far from straightforward! If you [read the code](https://github.com/ericyd/loop-supreme/blob/2c97a9510040e78ce08fca78d7b3c5157a7d0e48/src/Track/get-latency-samples.ts), you'll see that there are 3 possible options for getting track latency. What surprised me is that the TS types in `lib.dom.d.ts` disagreed with MDN on 3 separate properties / methods. I ended up writing a highly defensive method to get the track latency in whatever way I could. My favorite [quote from MDN was](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Constraints):

> Note: `getCapabilities()` hasn't been implemented yet by all major browsers. For the time being, you'll have to try to get what you need, and if you can't, decide what to do at that point. See [Firefox bug 1179084](https://bugzilla.mozilla.org/show_bug.cgi?id=1179084), for example.

Indeed, `getCapabilities` was the only method I found that worked, and it only works in Chrome. I guess this is going to be yet-another "Chrome-only" app, which kinda breaks my heart 💔

Once I had the track latency, I was able to adjust for it by shifting the samples in the recording buffer by the amount of latency the track reported. This basically fixed the issue on playback, and now loops are well-synchronized (in the best-case scenario), which is very exciting!

The other major work in this update was adding capabilities to the Tracks and Metronome. This included some general refactoring of the audio graph\* which had the serendipitous side effect of fixing the issue I had with recording multiple tracks! Turns out, sound software design really is important 😏. In addition, I was able to add volume controls (including a mute option) to both Metronome and Tracks, and I added a monitor option to the Track if you want to monitor the input during recording.

\*Note: I'm not sure "audio graph" is an official term, but since the Web Audio API consists of various `AudioNodes` that get connected together to produce sound, I felt like "audio graph" was as good a term as any to describe the technical underpinnings of the app.

## Learnings

- Recording latency is **not** very standardized among browsers, and therefore making timing-accurate DAWs is a really big challenge for web audio. Chrome had the best support of the (admittedly small) testing I did, but even on Chrome I found that some devices reported wildly inaccurate latency for the tracks. I don't know if this is a hardware issue or a software issue yet, more testing is needed. The bad news is that Loop Supreme has very little control over how latency is reported or calculated, so the ability to make smart adjustments is pretty limited. This will result in a fairly poor UX if a user is either using a non-Chrome browser, or using an audio interface that doesn't report latency accurately.
- React is slowly becoming more and more intuitive when using the Web Audio API. A pattern I found very useful during my refactoring was using a combination of `useState` for a value in the app, `useRef` for an `AudioNode` or some other piece of Web Audio, and `useEffect` to glue the two together. There's an [example of this](https://github.com/ericyd/loop-supreme/blob/2c97a9510040e78ce08fca78d7b3c5157a7d0e48/src/Track/index.tsx#L67-L81) in the gain/mute control in the Track component. What I discovered is that using React state for everything doesn't work because the audio graph shouldn't be re-created every time a value changes. In addition, creating `AudioNodes` in a component without a `Ref` doesn't work because the `AudioNode` gets re-instantiated every time the component renders. However, React state is still the right choice for values that are represented in the app, like gain, or "muted" status. The pattern I landed on seems to be the best fit for the mutable design of the Web Audio API, along with the reactive/functional patterns encouraged by React hooks. Building this app has really expanded my comfort with different React hooks and concepts which has been really fun.

![Loop Supreme Track Controls](https://cdn.hashnode.com/res/hashnode/image/upload/v1668636484923/BK8-_cnpp.png align="left")

## State of the app

- Merged PRs [#11 (metronome volume control)](https://github.com/ericyd/loop-supreme/pull/11), [#12 (latency fix)](https://github.com/ericyd/loop-supreme/pull/12), [#13 (track functionality)](https://github.com/ericyd/loop-supreme/pull/13), and [#14 (metronome refactoring)](https://github.com/ericyd/loop-supreme/pull/14)
- The metronome can now be muted, and gain adjusted, without stopping the entire audio context
- Tracks now account for recording input latency, where possible (sorry Firefox)
- Tracks can be muted, and gain adjusted
- Track monitoring can be toggled on and off
- When tracks are removed from the Scene, their audio stops playing (I thought this was going to happen naturally but it did not! Probably an interesting feature of Web Audio at play here)
- Recording multiple tracks now works, and the tracks can play back in time!

## Next steps

1. Test with a real audio interface. So far my primary testing has been sitting at my computer snapping into a webcam mic. The app is semi-functional now and I need to see if it actually works in a real musical setup
2. Prepare for an initial deployment (assuming no major bugs found in testing). The MVP I'm shooting for is
   1. Builds and deploys automatically (probably using GitHub Actions; not sure about the host yet)
   2. Has some basic OG tags so social sharing works

Everything else in [the roadmap](https://github.com/ericyd/loop-supreme/blob/2c97a9510040e78ce08fca78d7b3c5157a7d0e48/roadmap.md) can probably be moved to post-deploy, although many of these are things I'd like to happen very soon (keyboard bindings, waveform visual display, general design cleanup).
