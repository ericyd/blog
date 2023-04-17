# Loop Supreme, part 2: Adding a Metronome

2022-11-04T12:32:38Z

tags: music, build-in-public

---

_This is part 2 in a series about building a browser-based live looper_

- [Part 12: v1.0 release, and project retro](/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](/loop-supreme-part-3-metronome-click)
- Part 2: Adding a Metronome
- [Part 1: New project: building a web-based audio looper!](/new-project-building-a-web-based-audio-looper)

## Goal

I need to add a metronome!

In my ideal looper app, the metronome is the heart of the entire application. By default, I want the metronome to determine the length of the loop (number of measures 𝗑 time signature 𝗑 BPM), as well as synchronizing the start and end of recording for each loop. The user should be able to _arm_ a track for recording, but recording should actually _begin_ when the metronome starts the beginning of the loop.

## Implementation

Since the metronome is going to have properties that are shared among many components, I have 2 "obvious" options that I'm aware of in the React ecosystem:

1. create a Context that will store some "global" state about the current tick, BPM, etc
2. create an instance of a "Metronome class" and pass it around everywhere that it is needed

I'm going to try using a Context because it feels a little more "React-y" and I think it might by easier than passing a Metronome down through oodles of different components.

## Learnings

I've never seen or used [such a complex Context before](https://github.com/ericyd/loop-supreme/blob/db7e2d5df90199530195f27587a626d870a18270/src/MetronomeContext/index.tsx#L34-L68), and tbh I'm not sure if it's idiomatic for React Contexts. It does feel a little strange to be managing an interval inside the component, but in simple tests it seems to work OK. I'm also _not at all_ convinced that it is good practice to pass state updater functions to the context provider. Again, seems to work in a simple test, but we'll see when I get the `Scene` and `Track` elements going if this actually works as expected.

I also learned that for Tailwind to work properly, you need to point it at all the relevant source files. This is probably obvious to anybody who has used Tailwind before but I couldn't figure out why my styles for my header weren't working. I moved my header into the static HTML file (eventually I'll optimize this file a bit more for SEO) and wanted to use Tailwind styles for it. I had to add my `public/index.html` file [to my Tailwind config](https://github.com/ericyd/loop-supreme/blob/db7e2d5df90199530195f27587a626d870a18270/tailwind.config.js#L3) in order to make this work. After that, both `npm run css` and `npm start` compile the CSS properly and apply the styles as expected. Magic! ✨

## State of the app

1. Merged PR: https://github.com/ericyd/loop-supreme/pull/3
2. The app runs! `npm start`
3. `MetronomeContext` counts the beats. It works for various time signatures, BPMs, a measure counts
4. `Metronome` component displays current metronome settings and updates them
5. [There is a bug](https://github.com/ericyd/loop-supreme/blob/db7e2d5df90199530195f27587a626d870a18270/src/MetronomeContext/index.tsx#L48-L50) where the `MetronomeContext` is creating two intervals, as demonstrated by a simple console log. This is probably due to double-mounting done by React in development mode. Need to test in production mode to see if this will be an issue long term.

![loop-supreme-1-metronome.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1667583055159/1SkzXCrLR.png align="left")

## Time logging

- spent about an hour adding the basic MetronomeContext and Metronome component
- spent about an hour on validation and styling improvements
