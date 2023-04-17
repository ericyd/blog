---
title: "Loop Supreme, part 8: Building and hosting"
date: 2022-11-18T11:39:14Z
cuid: clamscuo2000208lk4f9hbkua
draft: false
slug: loop-supreme-part-8-building-and-hosting
tags: music, audio, build-in-public
---

_This is part 8 in a series about building a browser-based audio live looper_

- [Part 12: v1.0 release, and project retro](https://ericyd.hashnode.dev/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](https://ericyd.hashnode.dev/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](https://ericyd.hashnode.dev/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](https://ericyd.hashnode.dev/loop-supreme-part-9-visualizing-the-waveform)
- Part 8: Building and hosting
- [Part 7: Latency and adding Track functionality](https://ericyd.hashnode.dev/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](https://ericyd.hashnode.dev/loop-supreme-part-6-workers-and-audioworklets)
- [Part 5: Record and loop a track](https://ericyd.hashnode.dev/loop-supreme-part-5-record-and-loop-a-track)
- [Part 4: Adding a Scene](https://ericyd.hashnode.dev/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](https://ericyd.hashnode.dev/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](https://ericyd.hashnode.dev/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](https://ericyd.hashnode.dev/new-project-building-a-web-based-audio-looper)

## Goal

Fix the build issue that was causing `AudioWorkletProcessors` to fail to load. Host it somewhere.

## Implementation

Fixing the build issue was the weirdest rabbit hole I've gone down. I could see that all the files were being put in the correct places, but for some reason the app was choking when trying to register the RecordingProcessor (an `AudioWorkletProcessor`). This was written in plain JS so I couldn't understand what the issue was. I tried converting it to TS but that threw an error too.

I finally inspected the built contents of the `recorder.js` file in my `build` directory, and immediately saw the problem. Due to [a Webpack bug](https://github.com/webpack/webpack/issues/11543), the compiled file contained `import` statements that referenced absolute paths on my local machine. Of course, the built files should be independently runable, so it made no sense to include hardcoded file paths to my local machine.

After reading a good chunk of the replies in the [Webpack issue thread](https://github.com/webpack/webpack/issues/11543), I tried several of the recommended fixes, to no avail. I debated installing the `worklet-loader` library, but it sounded like the Webpack team did not love this solution. I decided to keep to my project ethos of "dead simple & rough edges are OK", and built a simple [postbuild script](https://github.com/ericyd/loop-supreme/blob/92b5ac28b1f45d870698c507d8e3ff06d8e8a678/scripts/postbuild.sh) that simply copies the JS file contents from the source file into the final file. This isn't ideal because it isn't minified, but it's a fairly small file and this is a project site. We can optimize in the future. The other potential downside is that older browsers might choke on the "new" ES class syntax, but since most of the features in this app will fail in older browsers anyway, I decided it wasn't worth my time to investigate.

The other big push was getting hosting set up with Cloudflare. I was really pleased how easy it was to get up and running. I think some of their `wrangler` docs could be fleshed out, but they make it clear that the `pages` commands are in beta so I'm willing to cut them some slack. If you're launching your own site on Cloudflare Pages, there are 3 key things to do:

1. Create your API Token with "Cloudflare Pages: Edit" permissions - found under the "Account" category. I missed this several times because the entries are alphabetical and I assumed it would just be called Pages (after all, everything is "Cloudflare"...). See screencap below
2. Create your project with Wrangler before you publish: `wrangler pages project create my-project`, **then** `wrangler pages publish build -- --project-name=my-project`
3. Set your env vars correctly at the command line. It isn't extremely well documented by you need a `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` env var declared when you run Wrangler. So the final command looks something like:

```shell
CLOUDFLARE_API_TOKEN=api-token \
CLOUDFLARE_ACCOUNT_ID=account-id \
wrangler pages project create my-project

CLOUDFLARE_API_TOKEN=api-token \
CLOUDFLARE_ACCOUNT_ID=account-id \
wrangler pages publish build --project-name=my-project
```

![Cloudflare API token permissions](https://cdn.hashnode.com/res/hashnode/image/upload/v1668792585759/3wK8fUO6F.png align="left")

## State of the app

- Merged PRs
  - [#15 (track control refactor)](https://github.com/ericyd/loop-supreme/pull/15)
  - [#16 (adding some basic SEO and HTML content)](https://github.com/ericyd/loop-supreme/pull/16)
  - [#17 (adding a GitHub Actions deploy script)](https://github.com/ericyd/loop-supreme/pull/17)
  - [#18 (fix the app build)](<(https://github.com/ericyd/loop-supreme/pull/18)>)
  - [#19 (fix deploy action)](https://github.com/ericyd/loop-supreme/pull/19)
- App can now build and deploy automatically
- App is hosted at [loopsupreme.com](https://loopsupreme.com) (still working on the `www` subdomain redirect...)
- A few styling updates

## Next steps

- Add a waveform visualizer!
