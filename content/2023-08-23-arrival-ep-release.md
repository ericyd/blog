---
title: "Arrival EP Release"
created: 2023-08-23T19:51:14-05:00
date: 2023-08-23T19:51:14-05:00
draft: false
slug: arrival-ep-release
tags: [music]
---

![Arrival EP album art](https://i.scdn.co/image/ab67616d00001e02f4fba55bc553b3566670ca77)

I'm so happy to announce the release of my [_Arrival_](https://songwhip.com/usualphase/arrival) EP! This was such a fun project for me and I'm really pleased to be releasing it to the world.

When I was laid off in June, I set a goal to record and release 4 tracks before I got a new job. I was quite lucky that my unemployment was very short, but that meant I really needed to hustle to meet my music-making goal!

My motivation for this album was to stop over-thinking my music making. I know what I like, but I often get in my head that I ["should"](/should-is-the-worst-word/) be making more "complex" music. I often tell myself that if it isn't harmonically complex, it isn't "good enough" to release. Of course my logical mind knows this is bullshit, but my emotional mind keeps insisting that it is true. For this EP, I knew that if I had any chance in hell of hitting my goal in such a short time, I'd have to allow myself to focus on the basics and just make music that was fun.

In addition to being a great way to get my head into a good space during the uncertainty of unemployment, this also ended up being a great learning experience for me. Here are a few of my biggest take-aways:

1. Bitwig has some amazing bundled synths! I had so much fun learning the Polymer and Phase-4 synths more deeply, and learning more about sound design in the process.
2. Putting all the drums on a single track is really temping, especially using Bitwig's "Drum Machine" instrument that makes it easy to customize each instrument track. However, this made it much more difficult to mix! I would be a little more thoughtful in the future about splitting drum instruments into separate tracks.
3. [SoundBetter](https://soundbetter.com) is a wonderful site for hiring audio professionals! I decided I wanted to hire a professional to master my release, and I was extremely pleased with my experience on SoundBetter. I was able to find a mastering engineer who was excited about the project and really enhanced my tracks for release. I will definitely be back in the future! If you're wondering about format, imagine Fiverr but 100% focused on audio - from session musicians to producers and everything in between.
4. [RouteNote](https://www.routenote.com) offers a free plan to distribute music to all the major streaming platforms, which was exciting for me. I don't expect to make much money off this - my main motivation for releasing to streaming platforms is just so it's easier for friends/family to listen to it. RouteNote's free plan retains some of your streaming royalties, but for me it is worth it. Another company I was looking at was CDBaby, which charged $10 for a release but kept a smaller percentage of royalties. I did some math and figured out I'd need to earn $200 in streaming royalties before CDBaby was advantageous. I don't expect to make that much on this release so I went with the free plan.
5. [`ffmpeg`](https://ffmpeg.org/) is still the most legit option for converting audio! I received 24-bit WAV files from my mastering engineer, and I needed 16-bit FLAC for RouteNote. It turns out, `ffmpeg` not only makes it simple to convert between these formats, but also has a utility to verify that no audio data was lost in the conversion! Super useful!

## Conclusion

I really enjoyed working under a very specific timetable on this release. It forced me to be ruthless in making quick decisions, even if I knew that it wasn't "perfect". Breaking out of "perfection" mode and into "good enough" mode is usually a productive choice, but it is hard to do. Setting a firm deadline for myself was extremely beneficial for this project.

I also thought it was awesome how easy it was to hire a professional to significantly improve my mixes. Then, I was blown away to discover I could distribute it to the world for free! What an amazing world we live in. I hope you enjoy listening!

Here's the Songwhip link: https://songwhip.com/usualphase/arrival

---

Here were a couple commands I found useful for converting between lossless audio formats.

Convert from 24-bit WAV to 16-bit FLAC:

```shell
ffmpeg -i example-24bit.wav -sample_fmt s16 example-16bit.flac
```

Compare equality of original WAV file and newly-encoded FLAC file:

```shell
ffmpeg -loglevel error -i example-24bit.wav -map 0 -f hash -
# => SHA256=abc...
ffmpeg -loglevel error -i example-16bit.flac -map 0 -f hash -
# => SHA256=abc...
```
