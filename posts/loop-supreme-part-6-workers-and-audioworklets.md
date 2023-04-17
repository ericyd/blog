# Loop Supreme, part 6: Workers and AudioWorklets

2022-11-13T13:18:16Z

tags: music, audio, build-in-public

---

_This is part 6 in a series about building a browser-based live looper_

- [Part 12: v1.0 release, and project retro](/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](/loop-supreme-part-7-latency-and-adding-track-functionality)
- Part 6: Workers and AudioWorklets
- [Part 5: Record and loop a track](/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](/new-project-building-a-web-based-audio-looper)

## Goal

Move away from using `setInterval` on the main thread. Attempt to use a Worker to keep time, so interruptions on the main thread don't cause timing delays.

## Implementation

There were a **bunch** of changes in this iteration.

The first thing I did was added a "Start" component, which is really just a button that gets access to the user's media devices, and initializes the `AudioContext`. I was getting really frustrated because `AudioContexts` are not supposed to be instantiated until a user performs an action in the app. But wrapping the `AudioContext` in a piece of state or a ref was causing all sorts of annoying issues. I wrote up some more justification for this choice [in the code](https://github.com/ericyd/loop-supreme/blob/87e759aa1a25ff3afc117ae4dea793c7ed4de121/src/Start/index.tsx#L1-L17). I'll explore options to remove this in the future since it's kind of annoying, but for now this solved a lot of problems. One unexpected side effect was that I was able to remove almost all the custom functionality in `AudioRouter`. I realized that most of the methods in that context were written to avoid annoying null checks on the `AudioContext` interface. Since the `AudioContext` was not guaranteed to be non-null, it removed the need for most of this context's functionality. In fact, I may remove the context entirely at a later point and just pass the `AudioContext` and `MediaStream` props directly, since the component tree is fairly small in this app.

I also decided to change the `MetronomeProvider` to a standard component, and pass it's props directly. Since I don't anticipate needing a deep component tree, this simplified some implementation and made it a bit more clear to follow the data flow.

By far the most significant refactor in this update was moving the clock and recorder to a `Worker` and `AudioWorkletProcessor`, respectively. Previously I was using `setInterval` on the main thread, along with a `MediaRecorder` that updated some component state to store the buffer of recorded audio. This was not working well; I experienced lots of dropped samples and really bad timing differences, beyond normal latency issues. After doing some research, it seemed that moving the audio processing and time keeping off the main thread was the way to go. It is possible that I will need to revisit this yet again; [online](https://meowni.ca/posts/metronomes/) [resources](https://blog.paul.cx/post/metronome/) indicate that using the built-in clock on the `AudioContext` is the most accurate way to schedule audio events. This makes sense to me. However, the pitfall for Loop Supreme is that we need to know when a loop is starting and stopping. There is no way (that I'm aware of) to pre-schedule dispatched events / messages through a `Worker` or `AudioWorklet`, to notify other components to begin or stop recording. Of course, it may end up that the recorder and clock can live in the same `Worker`, and the recording can be initiated by a message. This would potentially solve all my problems, but I think there are more important things to figure out before I go down that route.

Overall, I'm really pleased with the current progress. I still have some latency issues to figure out and some fine tuning, but overall things are working pretty smoothly.

## Learnings

- `setInterval` is not available in `AudioWorkletProcessor`. Originally I was going to use `AudioWorkletProcessors` for everything, but since I am trying to use `setInterval`, I needed to use a standard `Worker`. This ended up being OK because registering an `AudioWorkletProcessor` is async whereas registering a `Worker` is sync, which is a little easier to use in a single component.
- Workers / AudioWorklets with TS/React is a bit of a pain. It turns out it [is possible to use TS with a Worker](https://stackoverflow.com/a/71134400/3991555), and it works great in the Webpack dev server. However, building the app seems to run into an issue; I believe I'll need to eject the CRA bootstrap to get access to the webpack config so I can configure a custom resolve hook.
- Workers and AudioWorklets are really cool! Loop Supreme already relied pretty heavily on an event-based pattern to coordinate beats and loops, and listening to events from the worker thread is a really natural way to achieve this, with better performance too! This eliminated the need for a custom EventTarget implementation

## State of the app

- [New logo!](https://github.com/ericyd/loop-supreme/blob/280aad8186033123993a956b59d27e8292913479/public/icons/loop-supreme-logo.png) ([commit 280aad8](https://github.com/ericyd/loop-supreme/commit/280aad8186033123993a956b59d27e8292913479))
- Merged PR [#9](https://github.com/ericyd/loop-supreme/pull/9) and [#10](https://github.com/ericyd/loop-supreme/pull/10)
- From a user perspective, not much has changed. Some styling has been updated, but the basic click-track and recording track is identical.
- Recording does work and the timing seems better, though there is still pretty significant latency between recording and playback. I'll need to see how to fix this so "playing in time" is possible

![Loop Supreme Worklets](https://cdn.hashnode.com/res/hashnode/image/upload/v1668365663105/6vlTFFux4.png)

## Time logging

- I decided to stop time logging because this took a lot of time and research. My previous time logs were very off the cuff, so when I lost track of total time spent I decided it wasn't worth it any more. Suffice to say - this one took pretty long 😅
