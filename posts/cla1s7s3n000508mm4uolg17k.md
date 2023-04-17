---
title: "New project: building a web-based audio looper!"
datePublished: Fri Nov 04 2022 00:52:07 GMT+0000 (Coordinated Universal Time)
cuid: cla1s7s3n000508mm4uolg17k
slug: new-project-building-a-web-based-audio-looper
tags: music, apis

---

_This is part 1 in a series about building a browser-based live looper_
* [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
* [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
* [Part 10: Keyboard bindings](https://ericyd.hashnode.dev/loop-supreme-part-10-keyboard-bindings)
* [Part 9: Visualizing the waveform](https://ericyd.hashnode.dev/loop-supreme-part-9-visualizing-the-waveform)
* [Part 8: Building and hosting](https://ericyd.hashnode.dev/loop-supreme-part-8-building-and-hosting)
* [Part 7: Latency and adding Track functionality](https://ericyd.hashnode.dev/loop-supreme-part-7-latency-and-adding-track-functionality)
* [Part 6: Workers and AudioWorklets](https://ericyd.hashnode.dev/loop-supreme-part-6-workers-and-audioworklets)
* [Part 5: Record and loop a track](https://ericyd.hashnode.dev/loop-supreme-part-5-record-and-loop-a-track)
* [Part 4: Adding a Scene](https://ericyd.hashnode.dev/loop-supreme-part-4-adding-a-scene)
* [Part 3: Metronome click](https://ericyd.hashnode.dev/loop-supreme-part-3-metronome-click)
* [Part 2: Adding a Metronome](https://ericyd.hashnode.dev/loop-supreme-part-2-adding-a-metronome)
* Part 1: New project: building a web-based audio looper!

## Vital stats
- [GitHub repo](https://github.com/ericyd/loop-supreme)
- Tech stack:
    - React (TypeScript)
    - Tailwind
    - [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## Summary

This is a project that I'm building in public!

I wanted to do some live looping on my (music) keyboard but wasn't super satisfied with any of the options out there. I wanted something quick-and-dirty but made it (somewhat) easy to do a loop performance.

I've also been itching for a side project. Seemed like a great way to feed two birds with one scone!

## Goals

1. Build a fully client-side web app that works as a functional audio looper for live performances and recording
2. Blog about my journey in learning the Web Audio API
3. Do it as fast and lightweight as possible. Rough edges are OK!

Disclaimer: I don't know if all my [planned features](https://github.com/ericyd/loop-supreme/blob/41d5b5849196c7b8b2c629664cf4e5f8fb8eb11c/roadmap.md) are even possible! However, [some examples online](https://github.com/pkalogiros/AudioMass/) implement several of my desired features already, so I'm hopeful.

## First steps

I've set up my repo and initialized my app with [create-react-app (CRA)](https://create-react-app.dev/docs/getting-started). I really dislike all the complexities of setting up a new project, especially one that uses TypeScript, so CRA was the natural choice to simplify setup and get a working React app in almost no time.

I have been curious about using [Tailwind](https://tailwindcss.com/docs/guides/create-react-app) for quite some time so I configured that as well. To get away from the default CRA styles, I grabbed [an icon from iconmonstr](https://iconmonstr.com/refresh-2-svg/) to use as my favicon and "logo". I'd love a bespoke logo but we'll see.

Lastly, I [wrote down my project roadmap](https://github.com/ericyd/loop-supreme/blob/41d5b5849196c7b8b2c629664cf4e5f8fb8eb11c/roadmap.md). I considered using GitHub projects to track my progress, but with the ethos of keeping this project as lightweight as possible, I figured a simple bullet list of features would be more that sufficient. My goal is to write a blog post for every bullet, or group of bullets, that I can get done in a single working session. Setting up the repo, CRA, and Tailwind took about 30-40 minutes, and writing the project roadmap took about another 30 minutes. I fully expect some of the Web Audio API implementations to take me substantially longer since I've never used them before, but that is part of the fun!

Here's a wireframe of what I'm imagining (at least right now)

![loop supreme wireframe](https://cdn.hashnode.com/res/hashnode/image/upload/v1667522947185/ZZxai0zWE.png align="left")

## Conclusion

Check back for more updates as I build out this project. If you haven't seen any updates in 3 months, it probably means I abandoned it!