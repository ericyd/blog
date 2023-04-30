---
title: "Pragmatic software testing guide"
created: 2023-04-27T12:20:34-05:00
date:
draft: true
slug: pragmatic-software-testing-guide
---

- when to file a bug?
- comparison to policing: if your job is to find "bad behavior", then you will over-prioritize bad behavior
- when to discard bugs
- backlog: serves as a repo for what has been reported previously or not
- people don't search the backlog
- lets stop reporting useless/low value bugs
- when I was QA, I was very dedicated to the idea that "this is not right, and it is possible for it to be right, so it should be right". As a developer, I'm much more dedicated to the idea of pragmatism: if the enhancement doesn't provide value, or if it isn't causing issues in its current state, skip it.

---

A couple years ago, I [replied to a post](https://www.reddit.com/r/ProgrammerHumor/comments/nj82rf/life_of_a_qa_engineer/) on the [/r/ProgrammerHumor](https://www.reddit.com/r/ProgrammerHumor) subreddit. The title of the post was "Life of a QA engineer". The post was a link to an image of a GitHub issue with the title "Cat broke UI by holding down space".

Me being me, I decided to ignore all relevant context and [post a grumpy reply about real life](https://www.reddit.com/r/ProgrammerHumor/comments/nj82rf/life_of_a_qa_engineer/gz6l3xe/?context=3). My reply read

> As a former QA myself, I actually think bug reports like this are a huge drain on team energy, and a big reason for both burnout in QA and also antipathy between devs and QA.
>
> There is absolutely no practical value to reporting a bug like this. No user is going to be offended at a broken UI because their cat sat on a keyboard. Plenty of worse UI issues exist in the wild even in the "happy path".
>
> Moreover, any reasonable dev team will always have higher priority bugs to fix or features to release, meaning this bug sits on the backlog for all eternity adding cognitive load to every future dev or PM who looks at the backlog. Let's be kind to each other and stop reporting useless shit like this.
>
> Also I know you were making a joke so I hope this didn't come across as mean spirited. I am not attacking you just venting about QA culture that I've seen that I find to be unproductive.

The original post got +21,000 reputation, and my post got -30 🤣

## Doubling down, because I don't learn

Recently I was discussing a tangentially-related issue with my boss and was reminded of this post from years ago. I realized how, if anything, I feel even more strongly about my original stance than I did at the time.

It is possible (likely?) that the main reason my reply on Reddit got downvoted so strongly was because I was replying in a non-humorous way to a humor thread. Valid point. But based on the replies that people posted to me, I got a distinct sense that most people just plain disagreed with my perspective. [One popular reply to my post wrote](https://www.reddit.com/r/ProgrammerHumor/comments/nj82rf/comment/gz6qd4j/?utm_source=reddit&utm_medium=web2x&context=3):

> Bugs should always be noted (assuming they're in scope, not part of a deprecated/unsupported module, etc), that doesn't mean they need to be fixed (or be fixed quickly)
> ...
> The presence of a bug in a backlog does not cause any issue for any team with competent software... to manage that backlog

This perspective makes my skin crawl and my blood start to boil, before I remember to take a breath and repeat my internet mantra a few times (_we're all just humans, doing our best in this difficult world. we're all just humans..._). As someone who proudly embraces "pragmatism" as my driving professional force, it breaks my brain to engage in practices that waste energy and provide no value.

I categorically disagree with the statement that "bugs should always be noted", regardless of the caveat about being in scope. To explain why, let us consider what is the purpose of reporting a bug in software?

## What purpose is served by a reporting a bug?

For the purposes of this article, let us agree that a "bug" is a synonym for a defect in software; that is, something that is not working as expected or designed. Given this definition, we can agree that a bug report is a (sometimes standardized) way to notify the software development team of a defect in their software.

In an ideal world, we can rightly observe that software is capable of working correctly. Barring solar flares or other non-ideal physical conditions, computers product predictable, deterministic outputs for a given input. Since software runs on computers, the software is theoretically capable of perfectly deterministic behavior. Therefore, deviation from that deterministic behavior is a defect. Since software is capable of behaving in a deterministic way, we can rightly expect that bugs are fixable. If something can work in an optimal way but is instead working in a non-optimal way, it makes sense that we should expect it to work in the optimal way.

Once humans get involved in using software, things get a lot more complicated. Deterministic software turns out to be relatively straight forward in most cases. On the other hand, accurately predicting all the possible ways that a user might interact with your software is extremely difficult, and maybe impossible. Even if you can accurately map every possible user interaction with your software, the chance that you can add elegant handling for every permutation of user input is unlikely. With very few exceptions, software developers will need to make compromises, and often lump some behaviors together into common patterns of handling input. Why do they do this? Because developers are also humans (at least, for the time being 🤣...😳), and therefore they are bound by human limitations: time, energy, and motivation are primary limiting factors that cause humans to develop software that cannot elegantly handle every permutation of user input.
