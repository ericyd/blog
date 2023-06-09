---
title: "One weird trick to clear out your backlog"
created: 2023-04-27T12:20:34-05:00
date: 2023-05-07T18:50:57-0500
draft: false
slug: one-weird-trick-to-clear-out-your-backlog
---

- [Thesis](#thesis)
- [Setting the stage](#setting-the-stage)
- [Doubling down, because I don't learn](#doubling-down-because-i-dont-learn)
- [Real, practical value](#real-practical-value)
- [A golden rule for filing Bugs That Matter™️](#a-golden-rule-for-filing-bugs-that-matter™️)
  - [Exceptions](#exceptions)
- [Automatic prioritization](#automatic-prioritization)
- [Less cognitive overhead](#less-cognitive-overhead)
- [Deliver value _now_](#deliver-value-now)
- [Things don't matter as much as you think they do in the moment](#things-dont-matter-as-much-as-you-think-they-do-in-the-moment)
- [In summary](#in-summary)

## Thesis

Low-severity bug reports can reduce a software team's ability to deliver value. One strategy to reduce this negative effect is to close all bug reports that have been open longer than a month. Never-ending backlogs create cognitive load and anxiety; we owe it to ourselves to fight aggressively against backlog entropy.

## Setting the stage

A couple years ago, I [replied to a post](https://www.reddit.com/r/ProgrammerHumor/comments/nj82rf/life_of_a_qa_engineer/) on the [/r/ProgrammerHumor](https://www.reddit.com/r/ProgrammerHumor) subreddit. The title of the post was "Life of a QA engineer". The post was a link to an image of a GitHub issue with the title "Cat broke UI by holding down space".

Me being me, I decided to ignore all relevant context and [post a grumpy reply about real life](https://www.reddit.com/r/ProgrammerHumor/comments/nj82rf/life_of_a_qa_engineer/gz6l3xe/?context=3). My reply read

> As a former QA myself, I actually think bug reports like this are a huge drain on team energy, and a big reason for both burnout in QA and also antipathy between devs and QA.
>
> There is absolutely no practical value to reporting a bug like this. No user is going to be offended at a broken UI because their cat sat on a keyboard. Plenty of worse UI issues exist in the wild even in the "happy path".
>
> Moreover, any reasonable dev team will always have higher priority bugs to fix or features to release, meaning this bug sits on the backlog for all eternity adding cognitive load to every future dev or PM who looks at the backlog. Let's be kind to each other and stop reporting useless shit like this.
>
> Also I know you were making a joke so I hope this didn't come across as mean spirited. I am not attacking you just venting about QA culture that I've seen that I find to be unproductive.

The original post got +21,000 upvotes, and my post got -30 downvotes 🤣

## Doubling down, because I don't learn

Recently I was discussing a tangentially-related issue with my boss and was reminded of this post from years ago. I realized how, if anything, I feel even more strongly about my original stance than I did at the time.

It is possible (likely?) that the main reason my reply on Reddit got downvoted so strongly was because I was replying in a non-humorous way to a humor thread - fair point. But based on the replies that people posted to me, I got a distinct sense that most people just plain disagreed with my perspective. [One popular reply to my post wrote](https://www.reddit.com/r/ProgrammerHumor/comments/nj82rf/comment/gz6qd4j/?utm_source=reddit&utm_medium=web2x&context=3):

> Bugs should always be noted (assuming they're in scope, not part of a deprecated/unsupported module, etc), that doesn't mean they need to be fixed (or be fixed quickly)
> ...
> The presence of a bug in a backlog does not cause any issue for any team with competent software... to manage that backlog

This perspective makes my blood start to boil, until I remember to take a breath and repeat my internet mantra a few times (_we're all just humans, doing our best in this difficult world. we're all just humans..._). As someone who proudly embraces "pragmatism" as my driving professional force, it breaks my brain to engage in practices that waste energy and provide no value.

I categorically disagree with the statement that "bugs should always be noted", regardless of the caveat about being in scope. To explain why, let us consider what is the purpose of reporting a bug in software, and whose labor is expended to process bug reports.

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

If a unit of work (a "ticket") doesn't serve a goal for the product, then it probably isn't worth spending time on. If a bug report doesn't advance the value of the product, then it should not be filed in the first place! Does fixing a broken UI add value to your product? Maybe, depending on what goal you are trying to achieve.

In my experience, too few bug reports (and even sometimes feature tickets) provide real value for the product. It is easy to get bogged down in the nuance of your day-to-day work and rarely "come up for air" to think about the product holistically. Some examples:

- QA testers are going to be deeply focused on identifying defects in software; it is natural that a QA tester might get tunnel vision about bug reports and assume that just because something is wrong means it must be fixed. (I've done this myself)
- Product managers might get deeply focused on a feature they are developing and add a bunch of details that seem important in the planning phase but realistically add very little value to a product.
- Developers will commonly add technical complexity that does not add real value, simply because it adheres to a notion of a "best practice" or the way it "should" be written. (I've also done this 😆)

It is easy to lose sight of adding value to a product, and it isn't an indictment of any one person or practice. Since bugs are inevitable in all software, it is common that complex software will have unresolved bug reports. Ensuring that bug reports add value to the product will pay massive dividends for your team over the long term.

## A golden rule for filing Bugs That Matter™️

What if I told you there was a single rule you could follow that would make you more productive, less stressed, and more motivated to do your work? Here it is:

**If a bug cannot be fixed within a month, it should be closed. If a bug has been open longer than a month, it should be closed.**

Why do I propose such a strict and short expiration?

1. If a bug has been sitting around for longer than a month, then it is - by definition - _not_ a high priority bug. We can safely continue to ignore it
2. Every human has a limited amount of working memory. Unless the bug is high priority and gets immediate attention, new work and new bug reports will squeeze it out of the team's working memory. If it isn't in anybody's working memory, then other work has taken priority, and we can safely ignore the bug.
3. If your team is in the extremely rare situation where you have no active work, then I _guarantee_ nobody is going to feel motivated to spend their time squashing low-severity, low-priority bugs from more than a month ago

There are several benefits to following a one-month bug expiration, such as:

1. Automatic prioritization: if a bug is closed and it later gets re-reported, that is a hint that it is more important than originally thought. Maybe this time you will have capacity to fix it within a month
2. Less cognitive overhead for _everybody_ on the team
3. Keeps you and your team laser-focused on delivering value _now_

### Exceptions

I hear the chorus shouting "But what about...!". Of course this "golden rule" is not truly golden - there are exceptions in real life, such as:

1. Feature work is not included in the one-month expiration; it can reasonably take more than a month to develop technical plans for a feature.
2. Very large companies that do not move quickly. Perhaps they need more than a month to plan work for their development teams
3. Early release software in alpha or beta stages. If you release software to beta testers, you are probably asking for a flood of bug reports that you cannot reasonably address within a month.
   - _However!_ If you find yourself releasing a general availability product, the month-old rule should immediately kick in!
4. Open source projects that are run by volunteers or part-time workers. While it is _extremely_ important to be highly conscientious about filing bug reports for open source projects, it isn't reasonable to expect that the same prioritization rules apply.
   - It is worth noting that _a lot_ of the opinions and advice offered in this post do not apply very well to open source projects. If you are volunteering your time to build software for the world, please ignore me and do what works for you! 🙇🏻

Bug reports obviously serve an important role in software development. A thorough and well-written bug report can be a gift from the heavens for a developer. However, even a perfectly written bug report can still cause toil if fixing it does not add value to your product. Fewer bugs for the sake of fewer bugs does not help anyone achieve their goals.

Let's explore some the benefits of a one-month bug expiration in depth

## Automatic prioritization

One of the biggest challenges with delivering value to your users is knowing what to work on, and when. Prioritizing work can be remarkably difficult, and it takes a lot of energy. Feature work will always be challenging in this regard because the product team has to make trade-offs between what they want (probably everything) and what the engineering team can realistically deliver.

Fixing bugs is always a difficult addition to the prioritization process. How does the bug's priority compare to a feature's priority? Is there a static percentage for how many bugs you take on vs. how many feature tickets you commit to? Do you try to fix every bug that is over a given severity?

If you follow a system where bugs automatically expire after a month, much of this work is done for you. This system forces a team to focus on only high severity bugs that deliver high value. If they don't meet this criteria, they will likely expire after a month and nobody will notice or care. In my experience, it isn't difficult to get people on board with spending time fixing high-severity bugs; where it gets murky is fixing medium-to-low-severity bugs, particularly if its unclear how many people the bug is affecting. (Ideally we all have perfect metrics on user patterns and can quickly and accurately identify how many users are affected by any particular bug. In reality, this process is often fraught for a variety of reasons, the most common of which is that people are generally overworked and unable to perform due dilligence on every reported bug.)

Less time prioritizing tickets means less effort spent on tedious work. This reduces cognitive overhead during the planning process, which as we will see, can pay massive dividends for the team.

## Less cognitive overhead

Some teams are structured in such a way that one person on the team is primarily responsible for managing the tickets in the backlog, and prioritizing work for the engineering team. In this type of structure, engineers rarely if ever look at the backlog. Its easy to forget that humans are doing labor every time tickets are prioritized. There is cognitive overhead to maintaining more tickets in the backlog. Decisions about what to prioritize become harder because its impossible to accurately represent the relative priority of 1000 or even 100 tickets.

Have you ever read one of those internet lists that tries to rank the "top 100" of something - movies, albums, whatever? The bottom 90 entries all blur into one big glob because most people's brain's don't have enough working memory to accurately keep track of that many entries. The top 10 are significantly more interesting, not just because they are the "best", but because we as humans can actually process 10 items at a time. The mere existence of the ordered list does not indicate proper prioritization - e.g. the relative difference in priority between number 77 and 78 on the list would be nearly impossible for most people to determine. Why do we assume that we are more capable of prioritizing bug reports than popular music albums?

The result of a massive backlog is that some tickets naturally rise to the top because they are clear and achieve a specific objective. The rest fall to the bottom and feed the latent anxiety of everyone who looks at the backlog. It is truly hopeless to go through a list of 100+ tickets that are all approximately the same in terms of severity and assign a priority to them. When I say "approximately the same in terms of severity", I mean that in terms of real, practical value, no ticket is different from another.

Having more tickets in the backlog than a team can reasonably complete means that some tickets will stay in the backlog forever. Who does this impact? Everyone! Digital clutter is still clutter, and having innumerable tickets in the backlog means cognitive overhead for everyone who looks at the backlog. It is difficult to quantify the cost of ticket-induced cognitive load (TICL™️), but it is certainly greater than zero for most people.

The situation is even worse for product managers that need to read through the backlog on a regular basis to prioritize tickets relative to each other. In this case, the time required to correctly prioritize a bug scales _at least_ linearly with the number of bugs that are sitting in the backlog. More bugs means more time required to prioritize bugs. This means less time is available for product development, which means less value delivered to the user/client/customer.

One common justification for unlimited bug reports is that bugs serve as documentation for known issues in the software. This is great in theory but in reality breaks down very quickly. Duplicate bug reports are extremely common for one of two reasons:

1. The original bug report is phrased in a different way than expected, so searching for the bug doesn't come up because the reporter is searching for the wrong term(s)
2. The reporter is pressed for time (or lazy or overworked) and doesn't search for existing bugs before filing the bug

"Bug reports as documentation" is a failed strategy because nobody reads bug tickets to understand a product, and they don't serve their intended effect of preventing duplicate bug reports.

The chance that software testers can use the backlog as a source of truth for all documented bugs approaches zero as the list grows larger. Bugs are often complex, which means that describing them in words is difficult and prone to variance. If a bug is phrased in a slightly different way than one might expect when filing the bug report, it is unlikely that the reporter will find the bug report in the first place.

If your list of bugs has grown larger than can fit in a single person's working memory, then chances are your bug list is no longer providing value to your product.

## Deliver value _now_

I propose that the ultimate goal of a software development team should be to deliver value. Delivering value makes most people feel good. So why do we often find ourselves toiling over work that doesn't matter?

One issue is [Parkinson’s law of triviality](https://en.wikipedia.org/wiki/Law_of_triviality){{< sup 1 >}}: that people are prone to spending more time on trivial issues than big, important issues. This contributes to a general over-emphasis on things that don't matter, which means that teams can often get bogged down making small optimizations to code or designs that ultimately provide no real value to their users.

Another issue is having too much work to do and not being able to keep up with it all. Most teams will try to balance their work between features and bug fixes. But what if the bug fixes are low value to begin with? If teams aren't continuously dilligent about the bugs they are fixing, it becomes quite easy to fill up a work schedule by squashing low-value bugs rather than building high-value features. I've even seen teams engage in "bug bash" events where an entire week (or more!) of developer time might be spent on squashing bugs. Are the bugs providing value? Who knows! The simple fact that they exist is enough to cause anxiety among all levels of the organization, from customer support to the C-suite.

If you refuse to work on bugs that have been sitting around for more than a month, it automatically frees you up to focus on work that provides value. I assure you, bugs that are valuable will not fall through the cracks; people will always find time to address the bugs that are actually causing problems for your users. By removing the cognitive burden of a never-ending list of bugs that "should" to be fixed, teams can regain their time, energy, and motivation to deliver value on things that matter.

## Things don't matter as much as you think they do in the moment

It is really easy to have strong feelings about things in the moment. Software developers are famously opinionated people. Product owners are not always perceived as being hyper-opinionated, bute they will always have a stake in their products. Similarly, QA tester/engineers have a tendency to prioritize a bug they reported over other work, because of a natural bias towards one's own work.

However, it is almost a universal rule that the level of investment in a specific bug drops off exponentially over time. Unless a bug report can be addressed in a very short amount of time, the chance that someone will deeply care about it in a month is extremely small. If bug fixes have diminishing returns for the people that filed them, then the bug fix may not provide a lot of value to users either.

Unless bugs provide real value to the user, we should no be spending time on them!

## In summary

I fully re-wrote this post at least 3 times and at this point I'm not sure how cohesive my "point" is. I encourage you to reach out to me if you think it could use work! Maybe I'll write a follow-up in the future.

In an attempt to provide a semblance of value to the readers who have made it this far, here's a short-n-sweet list that summarizes what I'm trying to say.

1. The purpose of software development should be to deliver value to your users
2. One routine part of software development that can get in the way of delivering value is low-severity/low-value bug reports.
3. Try your best to file meaningful bug reports. Does fixing your bug add value to the product? Does your team have time in the next month to address the bug? If the answer to either of these questions is "no", consider not filing it
4. If you're responsible for maintaining a backlog for your team, consider auto-closing all bugs that have been open longer than a month. Make this a part of your work routine! See if there is any measurable negative outcomes, or any measurable positive outcomes.

And a little nugget specifically for open source: Always be conscientious when filing bugs on open source projects. In all liklihood, the maintainer(s) do(es) not have enough time or energy to care about your bug report; don't get angry at them for volunteering their time.

---

{{< sup 1 >}}I was reminded of Parkinson's Law of Triviality from [this blog post](https://ericaheinz.com/notes/give-it-the-craigslist-test) which I thought generally dove-tailed well with my feelings about delivering value faster, so I wanted to give it a shot out.
