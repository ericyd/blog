# Loop Supreme, part 5: Record and loop a track

2022-11-12T11:20:08Z

tags: music, audio, build-in-public

---

_This is part 5 in a series about building a browser-based live looper_

- [Part 12: v1.0 release, and project retro](/loop-supreme-part-12-v10-release-and-project-retro)
- [Part 11: Exporting stems and changing inputs](/loop-supreme-part-11-exporting-stems-and-changing-inputs)
- [Part 10: Keyboard bindings](/loop-supreme-part-10-keyboard-bindings)
- [Part 9: Visualizing the waveform](/loop-supreme-part-9-visualizing-the-waveform)
- [Part 8: Building and hosting](/loop-supreme-part-8-building-and-hosting)
- [Part 7: Latency and adding Track functionality](/loop-supreme-part-7-latency-and-adding-track-functionality)
- [Part 6: Workers and AudioWorklets](/loop-supreme-part-6-workers-and-audioworklets)
- Part 5: Record and loop a track
- [Part 4: Adding a Scene](/loop-supreme-part-4-adding-a-scene)
- [Part 3: Metronome click](/loop-supreme-part-3-metronome-click)
- [Part 2: Adding a Metronome](/loop-supreme-part-2-adding-a-metronome)
- [Part 1: New project: building a web-based audio looper!](/new-project-building-a-web-based-audio-looper)

## Goal

Be able to record audio from my local "media" (i.e. microphone or other input device), then loop the playback infinitely along with the beat of the metronome.

Also clean up some styling to keep things looking semi-consistent. I'm planning on a large styling refactor later when I have more essential functionality working as expected, but it feels nice to work on something that doesn't look like _total_ garbage.

## Implementation

This was the most challenging task I've completed thus far (and I don't think it is getting easier anytime soon!). It required reading a lot of documentation and putting together pieces that weren't explicitly covered in the documentation.

The easiest part of this implementation was getting access to the user's media devices. This is done with the `getUserMedia()` method which prompts the user for microphone access. Assuming the user grants permission, the method returns a `MediaStream`.

Eventually I learned that the `MediaStream` needed to be attached to a `MediaRecorder` to actually capture the audio. But here is where things got weird. It turns out that the only way to capture the data from a `MediaRecorder` is by [listening to the `dataavailable` event](https://github.com/ericyd/loop-supreme/blob/8f3f3428980a2c1a017b2a63860a44869b39cbdb/src/AudioRouter/index.tsx#L125-L128), and pushing the event data to an array.

The purpose of this app of course is to loop the audio indefinitely. For that I was pretty confident I needed an `AudioBufferSourceNode` which supports a `loop` parameter, which seemed perfect for this case. However, converting a Blob array to an `AudioBuffer` is not a straightforward process! It requires a [slightly odd conversion chain](https://github.com/ericyd/loop-supreme/blob/ed36c50abbdaed8c2681eebe3e0b6c6bc7a4975b/src/AudioRouter/index.tsx#L154-L162), but the main problem I ran into is that there was no definitive documentation for how to achieve this step. The [BaseAudioContext.decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) documentation assumes that you are getting the data from an HTTP request, which naturally will exist as an ArrayBuffer. But for audio that was recorded locally, it was not intuitive to me that I had to create a Blob from the array of Blobs, then get the underlying ArrayBuffer from the Blob, then use that data to "decodeAudioData". It felt like a weird pattern but once I hooked it up it seemed to work fine.

## Learnings (and issues)

- Recording audio with the Web Audio API is weird! Why is it necessary [to do 5 conversions](https://github.com/ericyd/loop-supreme/blob/ed36c50abbdaed8c2681eebe3e0b6c6bc7a4975b/src/AudioRouter/index.tsx#L154-L162) just to take a recording from user media and get an `AudioBufferSourceNode` that is usable to play back the audio? You can skip some of these steps if you put the Blob straight into an `<audio>` element, but that isn't what I want.
- Timing is hard! It immediately became apparent that using a JS interval to coordinate the metronome is not going to be tenable. This is probably going to be a major challenge given that I'm trying to exist in the React paradigm as much as possible. I anticipate needing to create a queue similar to [this example from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#playing_the_audio_in_time), which schedules events in advance using the audio context timer as a source of truth.
- Routing audio in the Web Audio API is becoming somewhat more intuitive. The main pattern I've picked up on so far is that Source nodes must eventually connect to the `AudioContext` destination in order to hear the data in the Source. In the case of signal processing (e.g. adding a `GainNode` to control volume), the audio signal should still flow from source -> destination. For example, after recording audio from the user media, playback flows from an `AudioBufferSourceNode` to a `GainNode` to the `AudioContext.destination` ([source code](https://github.com/ericyd/loop-supreme/blob/8f3f3428980a2c1a017b2a63860a44869b39cbdb/src/AudioRouter/index.tsx#L159-L171)).
- Input monitoring is a [pretty easy thing to add](https://github.com/ericyd/loop-supreme/blob/8f3f3428980a2c1a017b2a63860a44869b39cbdb/src/AudioRouter/index.tsx#L112-L114)! However, there is some very noticeable latency and I'll have to see if it is a good experience or not to use the input monitoring.

## State of the app

- Merged PRs [#6](https://github.com/ericyd/loop-supreme/pull/6), [#7](https://github.com/ericyd/loop-supreme/pull/7), and [#8](https://github.com/ericyd/loop-supreme/pull/8)
- It is possible to record some audio and hear it loop!
- But it sounds terrible! Not sure if this is my webcam mic I'm using for testing, or if it is some configuration I have in the app.
- Recording multiple tracks does not work yet. I will need to think deeply about how to structure the audio API so each track can be stateful, yet also share some global state. For example
  - Each track must have its own AudioBufferSourceNode to hold audio
  - Each track must be able to control volume (and mute) independently
  - All tracks must obey global play/pause settings
  - All tracks must be synchronized to a single clock
  - this becomes more complex as many elements of the audio API are nullable, and explicitly require user permission/behavior before they can be instantiated.

![Recording a Track](https://cdn.hashnode.com/res/hashnode/image/upload/v1668015143447/jKCRmvIqH.png align="left")

## Next steps

1. I need to make the clock more resilient. More research is needed on exactly how to achieve this.
2. I'm not convinced that doing this inside a React app is the right approach. So many of the Web Audio API interfaces require mutability that doesn't feel natural to plug into React. I'll be thinking carefully about this in the coming sessions and considering a framework-less approach. I don't want to do this because it would require redoing the dev/build pipeline, and re-writing a bunch of code. But it might be necessary.
3. Improve the recording quality. I don't know why so many samples were dropped but the current recorder is straight garbage.

## Time log

- at least 4-5 hours! 😬
