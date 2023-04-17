# Loop Supreme, part 12: v1.0 release and project retro

Wed Dec 14 2022 19:49:51 GMT+0000 (Coordinated Universal Time)
cuid: clbo2gzr0000308l36bysf0l8
slug: loop-supreme-part-12-v10-release-and-project-retro
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1671046934439/MwC9pyOAe.png
tags: music, audio, build-in-public

---

_This is the final installation in a series about building a browser-based live looper:_

- Part 12: v1.0 release, and project retro
- [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
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

_\*Insert "it's done" Frodo meme.\*_ I'm quite pleased to announce that [Loop Supreme](https://loopsupreme.com) is live to the world! I mean, it has been for a while now, but now it is live _and_ complete. Of course, it's not 100% complete (nothing ever is), but I'm satisfied with the primary features for now. I wanted to recap the past 5-6 weeks I've spent working on it, reflect on what went well, what didn't go well, and anything I found remarkable after finishing the project.

First, let's talk about what is new since last time

## New features

- Add ability to record a live performance 🎉 [#37](https://github.com/ericyd/loop-supreme/pull/37)
- Dark mode 😎. I only made this respect system preferences; there is no "dark mode toggle". [#33](https://github.com/ericyd/loop-supreme/pull/33)
- Add some additional keyboard shortcuts: `t` for tap tempo, and `n` for renaming a track after it is selected [#32](https://github.com/ericyd/loop-supreme/pull/32)
- Add some UI improvements: track indexes for easier keyboard navigation, and a sticky metronome so you can always know what beat you're on [#33](https://github.com/ericyd/loop-supreme/pull/33)
- Fix a regression where recording over a track didn't clear out the old track data [#34](https://github.com/ericyd/loop-supreme/pull/34)
- Update PWA icons [#35](https://github.com/ericyd/loop-supreme/pull/35) and add a service worker [#36](https://github.com/ericyd/loop-supreme/pull/36)

For the most part, implementing these last features was great validation for a lot of the choices I made in this project. Adding dark mode support was ridiculously easy and took only 10 lines of code, thanks to Tailwind. (Seriously, you can [count the changes](https://github.com/ericyd/loop-supreme/pull/33/files).)

If I had spent a little more time planning at the beginning of the project, I could have [added a service worker automatically using create-react-app](https://create-react-app.dev/docs/making-a-progressive-web-app/). However, [adding it after the fact with the workbox-cli package](https://developer.chrome.com/docs/workbox/modules/workbox-cli/) was extremely straightforward too.

The most ambitious feature that I added - the ability to record a live performance - was a really fun confirmation that I learned something valuable about the Web Audio API. Whereas most of this project has felt like stumbling through the darkness, I felt confident and clear-headed while implementing this feature. Partly that is because it built on existing patterns I've established already, and partly it is because I already understood how to make it work without having to read a lot of documentation. It also showed that the design patterns I'm using aren't horrible, since adding a node to the audio graph didn't break anything and worked on the first try.

Adding these new features was fun and shockingly quick, which is exactly what I wanted.

## Retro: What went well

I wanted to take some time to reflect on the project holistically since it has been my primary time suck outside of work for the past several weeks.

### Project timeline

I was able to complete a functional version of this app in about 5-6 weeks, which is just about the length I was hoping for in this project. I specifically did not set an explicit goal of how long it would take when I started

I [created the repo on November 3rd](https://github.com/ericyd/loop-supreme/commit/bf5b0bcfdbe3d5d555c1d1da70ae3e594332b877), and I'm drafting this post on December 10th. By the time all is said and done, it might be 6 weeks, but that still seems totally reasonable for a functional PWA built as a side project.

### Features

I'm really pleased with the final set of features included in Loop Supreme. Clearly, there are a [few items in the roadmap](https://github.com/ericyd/loop-supreme/blob/3fb20dd3dbaa2edcd7d756d243abe98848269340/roadmap.md) that didn't get finished, but I realized as I was playing with it that these were less important to me. I may add them in the future, or not. I'm really pleased that the app can record audio to multiple tracks, sync to a clock, and export the recorded audio. That is the core of what I was trying to accomplish, and it all works basically as expected!

### Tech

I was very pleased with the technology I chose to use. Of all the front end frameworks, I'm most familiar with React, so it was a natural choice. Using create-react-app was seamless and delightful; I still haven't ejected and it works great. Tailwind was a really fun CSS library to use, I can see why it is so popular.

For hosting, Cloudflare has been extremely easy to use, particularly with a custom domain. I am considering moving my personal site from GitHub Pages to Cloudflare Pages just because of how easy it was. Plus there are built-in page analytics, and a lot of controls in the dashboard. They also automatically create preview deployments that never expire. Overall it was a pleasure to use and I'd choose them again without a doubt.

### Lightweight roadmap

I considered using GitHub Projects to manage this, but ended up just using a massive checklist in a markdown file. I'm so happy I did. The additional overhead of managing tasks in a Project would have been tedious and not extremely useful. For a single-contributor project, I'm very happy I chose the most lightweight project management possible.

## Retro: room for improvement

### Cloudflare `wrangler` documentation is a little sparse

It took me several iterations to figure out how to properly deploy to production using `wrangler`, the Cloudflare CLI package. I thought it was working twice before, but both times realized that I missed something important. From what I can tell, the [winning arguments are `--env production --branch main`](https://github.com/ericyd/loop-supreme/blob/3fb20dd3dbaa2edcd7d756d243abe98848269340/.github/workflows/deploy.yml#L46-L51).

I hold nothing against the Cloudflare team for this; the `wrangler` CLI clearly states that the `pages` commands are in beta. If I were to do it again, I would probably just use the built-in CI offered through the Cloudflare dashboard.

### Tailwind docs became a frequently-visited page

On the whole, I really loved using Tailwind. I thought it was easy to use, well-documented, and provided lots of flexibility for customization.

However, I found myself visiting the Tailwind docs constantly. Is flex-wrap declared with `flex-wrap` or just `wrap`? Is `display: none` declared with `display-none` or `hidden` or `none`? Is `color` declared with `text-[color-name]` or `font-[color-name]`? I'm sure this would improve over time if I used Tailwind every day, but it made me wish for an offline version of their docs that I could reference more quickly. Perhaps there is a VSCode plugin or something that would achieve what I'm looking for, I didn't search too hard.

### Definition of done was ambiguous

It was a little hard to know when to stop. Eventually, it became a "gut feeling" kind of thing. Since I was making this app for my own musical interests, I kept using it and noticing a bunch of things that I'd want to change before releasing it. This led to scope creep that I didn't plan for. It wasn't exactly a problem since I didn't have a strict timeline, but for future side projects I think I'd spend a little bit more planning time up front.

Conversely, this project was intentionally ambiguous because I truly [didn't even know if it was going to be possible](https://ericyd.hashnode.dev/new-project-building-a-web-based-audio-looper#heading-goals). While it may not have been possible to define "done" at the onset of the project, I think it would have been helpful to spend a little time after the basic proof-of-concept was working to decide at what point the project would be considered complete.

## Conclusion

I'm struggling to think of anything that truly went wrong in this project. Of all the difficulties I encountered, almost all of them were anticipated - for example, spending time learning how to integrate the Web Audio API with React. I'd say that's a successful project!

I had a bunch of fun with this project and now I'm excited to go make some music! Go check out the final product at [loopsupreme.com](loopsupreme.com)!

## Picture recap

### First "back of the envelope" sketch

![first back of the envelope sketch](https://cdn.hashnode.com/res/hashnode/image/upload/v1667522947185/ZZxai0zWE.png?auto=compress,format)

### Adding a simple metronome

![adding a simple metronome](https://cdn.hashnode.com/res/hashnode/image/upload/v1667583055159/1SkzXCrLR.png?auto=compress,format)

### Adding a scene

![adding a scene](https://cdn.hashnode.com/res/hashnode/image/upload/v1667846863020/PtbGE_zof.png?auto=compress,format)

### Record a track

![record a track](https://cdn.hashnode.com/res/hashnode/image/upload/v1668015143447/jKCRmvIqH.png?auto=compress,format)

### Metronome redesign

![metronome redesign](https://cdn.hashnode.com/res/hashnode/image/upload/v1668365663105/6vlTFFux4.png?auto=compress,format)

### Adding track functionality

![adding track functionality](https://cdn.hashnode.com/res/hashnode/image/upload/v1668636484923/BK8-_cnpp.png?auto=compress,format)

### Adding waveform

![adding waveform](https://cdn.hashnode.com/res/hashnode/image/upload/v1669225143718/mS7xfFlrs.png?auto=compress,format&format=webp)

### Massive redesign

![massive redesign](https://cdn.hashnode.com/res/hashnode/image/upload/v1669225150316/5vhbWy2DG.png?auto=compress,format&format=webp)

### Dark mode

![dark mode](https://user-images.githubusercontent.com/8379268/206600916-5391a647-b75b-4f93-b18e-2c24b7a0f260.png)
