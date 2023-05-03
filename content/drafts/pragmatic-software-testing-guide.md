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

This perspective makes my blood start to boil, until I remember to take a breath and repeat my internet mantra a few times (_we're all just humans, doing our best in this difficult world. we're all just humans..._). As someone who proudly embraces "pragmatism" as my driving professional force, it breaks my brain to engage in practices that waste energy and provide no value.

I categorically disagree with the statement that "bugs should always be noted", regardless of the caveat about being in scope. To explain why, let us consider what is the purpose of reporting a bug in software, and whose labor is expended to process bug reports?

## What purpose is served by a reporting a bug?

For the purposes of this article, let us agree that a "bug" is a synonym for a defect in software; that is, something that is not working as expected or designed. Given this definition, we can agree that a bug report is a (sometimes standardized) way to notify the software development team of a defect in their software.

We can safely say that the literal purpose of a bug report is to document a defect in a piece of software. But what are the practical purposes of a bug report? Ideally, there are 2 major goals of a bug report:

1. Bug reports serve as a starting point to fixing the bug - without documenting the bug, it will likely never be fixed
2. Bug reports serve as an identifier to prevent future testers from submitting duplicate bug reports

Both of these are noble goals, and justify reporting all bugs in a theoretical development framework. In reality, both of these processes often break down, thereby reducing the usefulnes of the bug report. More on this later.

## The human cost of bug reports

Some teams are structured in such a way that one person on the team is primarily responsible for managing the tickets in the backlog, and prioritizing work for the engineering team. In this type of structure, engineers rarely if ever look at the backlog. Its easy to forget that humans are doing labor every time tickets are prioritized. There is cognitive overhead to maintaining more tickets in the backlog. Decisions about what to prioritize become harder because its impossible to accurately represent the relative priority of 1000 or even 100 tickets. The result is that some tickets naturally rise to the top because they are clear and achieve a specific objective. The rest fall to the bottom and feed a latent background anxiety of everyone who looks at the backlog. It is truly hopeless to go through a list of 100+ tickets that are all approximately the same in terms of severity and assign a priority to them. When I say "approximately the same in terms of severity", I mean that in terms of real, practical value, no ticket is different from another.

Having more tickets in the backlog than a team can reasonably complete means that some tickets will stay in the backlog forever. Who does this impact? Everyone! Digital clutter is still clutter, and having innumerable tickets in the backlog means cognitive overhead for everyone who looks at the backlog. It is difficult to quantify the cost of ticket-induced cognitive load (TICL{{< sup 1 >}}), but it is certainly above zero for the majority of people.

The situation is even worse for product managers that need to read through the backlog on a regular basis to prioritize tickets relative to each other. In this case, the time required to correctly prioritize a bug scales linearly with the number of bugs that are sitting in the backlog. More bugs means more time necessary to prioritize bugs. This means less time is available for product development, which means less value delivered to the client.

Software testers are also impacted by an overflowing backlog because, in reality, duplicate bugs are extremely common for one of two reasons:

1. The original bug report is phrased in a different way than expected, so searching for the bug doesn't come up because the reporter is searching for the wrong term(s)
2. The reporter is pressed for time and doesn't search for existing bugs before filing the bug.

Bug-reports-as-documentation is a failed strategy because nobody reads bug tickets to understand a product, and they don't serve their intended effect of preventing duplicate bug reports.

The chance that software testers can use the backlog as a source of truth for all documented bugs approaches zero as the list grows larger. Bugs are often complex, which means that describing them in words is difficult and prone to variance. If a bug is phrased in a slightly different way than one might expect when filing the bug report, it is unlikely that the reporter will find the bug report in the first place. This means that the second primary goal of bug reports - to "serve as an identifier to prevent future testers from submitting duplicate bug reports" - is nullified. If we only have 1 primary goal of bug reports (to "serve as a starting point to fixing the bug") then we'd better hope that goal is reasonable!

## Should software work correctly?

The answer to the question "should software work correctly" is often an unequivocal "yes" from most people working in software.

In an ideal world, we can rightly observe that software is capable of working correctly. Barring solar flares or other non-ideal physical conditions, computers produce predictable, deterministic outputs for a given input. Since software runs on computers, the software is theoretically capable of perfectly deterministic behavior. Since software is capable of behaving in a deterministic way, we can rightly expect that bugs are fixable. If something can work in an optimal way but is instead working in a non-optimal way, it makes sense that we should expect it to work in the optimal way.

Once humans get involved in using software, things get a lot more complicated. Deterministic software turns out to be relatively straight forward in some cases. On the other hand, accurately predicting all the possible ways that a user might interact with your software is extremely difficult, and maybe impossible when considering all possible combinations of hardware, supporting software (OS, drivers), and user input. Even if you can accurately map every possible user interaction with your software, the chance that you can add elegant handling for every permutation of user input is unlikely. With very few exceptions, software developers will need to make compromises, and often lump some behaviors together into common patterns of handling input. Why do they do this? Because developers are also humans (at least, for the time being 🤣...😳), and therefore they are bound by human limitations: time, energy, and motivation are primary limiting factors that cause humans to develop software that cannot elegantly handle every permutation of user input.

It is patently unreasonable to expect that humans have unlimited energy. If there are multiple competing demands on a developer's time and energy (e.g. fixing bugs **and** producing useful product features), then it is unreasonable to assume that the developers can fix every single bug report in a reasonably complex piece of software. While a bug report can certainly provide a roadmap to fixing the bug, the usefulness of this roadmap greatly diminishes if the bug is unlikely to ever be addressed in the first place.

Thus far, we have established that:

1. In a reasonably complex piece of software, not every bug can be fixed due to limitations of human output. Therefore, not every bug report will be addressed.
2. Excessive bugs in a backlog contribute to ticket-induced cognitive load (TICL{{< sup 1 >}}) for everyone involved: the product manager, the software developers, and the software testers themselves

This leads me to the conclusion that the most compassionate solution is to be conservative about filing bugs. 🙂

## Real, practical value

What makes work worth doing? When is a feature worth developing? When is a bug worth fixing?

Of course these are difficult questions to answer, but any good product focuses on helping the user achieve a specific goal. Some example goals might be

- Get through onboarding faster (or similarly, reducing friction to create an account)
- Find relevant products in an e-commerce search
- Engage with content via comments or likes

If something doesn't contribute to a defined goal, then its unclear why one should spend time and energy on it.

It is also possible for the "user" to be the business, in which case some reasonable goals might be:

- Increase active user count
- Increase referral rate

<!--
Not clear this serves my point

Certainly, "polished UI" can be a goal, but ultimately it is a self-serving goal. Unless the polished UI directly helps your user achieve a goal, then it is wasted energy. Of course, the goal might be "give the user a sense of pride in using this brand", or "impress the user to increase the odds of referral". In this case a polished UI is clearly in service of the stated goal. But it is nebulous to define exactly how a specific feature might contribute or take away from that goal -->

If a unit of work (a "ticket") doesn't serve a goal for the product, then it probably isn't worth spending time on.

<!--
Pretty sure I can cut this whole paragraph

## Possible benefits of reporting bugs that will not be fixed

There are some possible reasons for which it might be justified to file low-severity bugs.

One situation is for the purpose of documentation. In an ideal scenario, team members or bug reporters will search for existing bug reports before filing a new bug. In this ideal scenario, having a bug documented in the backlog could save people from filing a duplicate instance of the bug. If this worked as expected, it would save labor for everyone because the bug would not need to be reassessed and reprioritized.

In reality, duplicate bugs are extremely common for one of two reasons

1. The original bug report is phrased in a different way than expected, so searching for the bug doesn't come up because the reporter is searching for the wrong term(s)
2. The reporter is pressed for time and doesn't search for existing bugs before filing the bug.

Bug-reports-as-documentation is a failed strategy because nobody reads bug tickets to understand a product, and they don't serve their intended effect of preventing duplicate bug reports.

Another situation in which reporting low-severity bugs could be hypothetically beneficial is if the product team has unlimited time and can review all bug reports adequately. In reality, product teams are made up of humans, and the one thing that every working human has in common is being perpetually overworked. Product teams don't have time to review your bugs as assign appropriate priority. -->

## Perspective of a software tester

Let's back up a little bit and talk about what might motivate a tester to report bugs in the first place.

I started my tech career in QA - first as a manual tester, and later as a QA engineer writing automated test cases. When my job was to verify correct behavior of software, it became extremely easy to find issues with the software I was testing. My perspective was often along the lines of: "it is possible for this software to work correctly, therefore it **should** work correctly". When I started my career, I would report all sorts of bugs, even if they were out of scope for the specific feature/ticket I was testing. As I progressed in my career and got more perspective on the real flow of development teams, I realized that many of my bugs were causing toil for the development team. Reporting low-severity bugs resulted in discussions with the developers about whether or not it was in scope for the feature, and eventually discussions with the product team about whether or not the behavior was worth fixing. In an abstract way, these types of bug reports resulted in a "better" product, in that things were working "correctly" from the arbitrary perspective of me, the QA engineer. What I consistently failed to consider, though, was whether or not my bug reports provided real value to the users of the software.

After I started working primarily as a developer, my view changed. As a developer, my job is to build features. Of course, building features has the parallel goal of building features **correctly**. Building features that are riddled with bugs is not really meeting the goal of the feature in the first place.

When my primary perspective is that of building value, it is easier to see when bugs provide value or not. But when my primary perspective was to ensure correctness, I found a lot more of my attention going towards finding things that were incorrect, even if they were low value. This is all to say, I think that it is a natural consequence of telling people to find bugs that we end up getting extraneous bug reports that provide very little value. Certainly if someone is paid to find things that are wrong, they will be able to find them! Is that really the right goal though?

## Things don't matter as much as you think they do in the moment

It is really easy to have strong feelings about things in the moment. Software developers are famously opinionated people; even though product owners are not always perceived as being hyper-opinionated, they will always have a stake in their products.

But, it is almost a universal rule that the level of caring drops off exponentially over time. So unless a bug report can be addressed in a very short amount of time, the chance that someone will care about it in a month is extremely small. If bug fixes have diminishing returns for the people that filed them, then we can reasonably deduce that the bug fix does not provide a lot of value to users.

Unless bugs provide real value to the user, we should no be spending time on them!

## A better way: filing Bugs That Matter™️

Bug reports obviously serve an important role in software development. A thorough and well-written bug report can be a gift from the heavens for a developer. However, even a perfectly written bug report can still cause toil if it doesn't represent value, in the form of working towards a goal. Fewer bugs for the sake of fewer bugs does not help anyone achieve their goals.

<!-- TODO: should I just use ™️ instead of having low-value footnotes? -->

Conscientious Bug Reports (CBR{{< sup 2 >}}) is a framework for filing Bugs That Matter™️. Importantly, it has nothing to do with actually writing a bug! Instead, it has everything to do with whether or not the bug report is even filed. This is conscientious for your team, your project's future maintainers, and yourself.

To make it as simple as possible, we've derived a single question that can help you determine if a bug is a CBR

1. Does the bug need to get fixed in the next month?
   - Yes: file the bug report 🐛
   - No: do not file the bug report 🎉 Bugs that are so low priority that they don't need to get fixed within a month are not CBRs

If you made it through and the bug got filed, good for you! You just filed a Conscientious Bug Report. If you stopped along the way, good for you! You just saved time and toil for yourself and others, go treat yourself to some ice cream 🙂

---

{{< sup 1 >}}TICL, or "ticket-induced cognitive load", is a made-up term, and therefore considered to be coined by {{ .Site.Title }}

{{< sup 2 >}}CBR, or "conscientious bug reports", is also a made-up term, and therefore considered to be coined by {{ .Site.Title }}
