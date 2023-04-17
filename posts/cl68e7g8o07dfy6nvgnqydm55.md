# How to communicate as a software engineer

Sat Jul 30 2022 21:15:31 GMT+0000 (Coordinated Universal Time)
cuid: cl68e7g8o07dfy6nvgnqydm55
slug: how-to-communicate-as-a-software-engineer
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1659215896565/mFycVV95V.jpg
tags: programming, general-advice, communication

---

Communication is, in my humble opinion, the hardest part of any job. Sometimes the actual engineering work is hard, but typically the hardest part is getting the right requirements, communicating project status up to the leadership team, forming consensus with your colleagues about the complex ideas of your application, or something else altogether!

_What is this article?_

- It is collection of best practices for communicating clearly and effectively with your peers, managers, and executives
- It is based on my personal experience, and numerous observations in jobs ranging from food service to grocery to electronics retail to tech support to software QA to software development

_What is this article **not**?_

- It is not informed by science. All the opinions presented here are my own, and based wholly on my personal experience.

## #1: Organize your thoughts into bullets

I've already demonstrated my favorite communication tip in this article: bullet points.

**Why?**

- **Everybody** likes scan-able updates
- Bullets ensure that discrete points are individually digestible, yet easily recognizable as cohesive with the larger point
- Condensing your message into bullets forces you to think through the important elements of your message before you deliver it, and avoiding word-vomit
- All of the above points increase the chance that your audience will understand you. Remember: _this is why you are communicating in the first place_.

## #2: Edit before you send

Take an extra minute to edit a short message, or a couple minutes to edit a long message, before you hit "send".

- Before sending a message (email or instant message), re-read it
- Try to extract your central point into a bullet, and place the bullet at the top of the message
- Use multiple bullets if absolutely necessary
- Don't be afraid to delete extraneous details - your readers will thank you!

**Why?**

Editing your messages will pay massive dividends in conveying your meaning clearly. Being understood by your audience dramatically increases the chances that you will get the outcome you want (e.g. more time on a project, help with a feature, clarity on requirements, etc).

The chances that you expressed your thoughts perfectly on the first attempt are extremely small, unless you are a remarkably talented written communicator. Be humble and recognize that your first stream-of-consciousness attempt at explaining something is likely not the best version.

## #3: Be charitable

1. **Do not** assume that your audience has time for your communication
2. **Do not** assume that your audience will place as much importance on your communication as you believe it deserves
3. **Do not** assume that points 1 and 2 mean that your audience is conceited. They are simply too busy, like all of us.
4. **Do** hold yourself to the same standards as others. Everybody has skimmed an email or a Slack message from a colleague. This does not make you a bad person, just as it does not make your colleagues bad people when they skim your communications. We are all the same.
5. **Do** assume your colleagues are smart and engaged enough to ask follow-up questions if they want or need more information.

## #4: Leave out the minutiae

(This should be taken care of with best practice #2, "Edit before you send")

- Leave out the details. If somebody wants or needs to know, trust them to ask (see "Be charitable, #5")
- Leadership does not care about implementation details
- Product does not care about implementation details
- Design does not care about implementation details
- Engineering does not care about implementation details\*, unless it is a PR review and you're sharing a specific strategy for a specific implementation

You might be thinking to yourself "But they need to know the whole situation!". To [borrow logic from Marcus Aurelius](https://www.themarginalian.org/2021/04/13/marcus-aurelius-meditations-robin-waterfield): it is impossible for every person to read everything. If it is impossible for every person to read everything, then you must accept that some people will not read everything you write. To believe otherwise is to drive yourself mad. In short, stop yearning for the impossible and learn to optimize what **is** possible.

\*Obviously there are plenty of times when engineering cares about implementation. But generally speaking, your colleagues don't want to sift through a paragraph about your lambda's runtime configuration just to get the point about a bug you discovered.

## #5: Organize your message in a pyramid

"Most concise/general/important information at the top. Most verbose/specific/supporting information at the bottom"

- If somebody cannot discern the impact of your message in the first sentence, then you did it wrong.
- Give your audience a reason to keep reading, or give them permission to stop reading
  - This goes back to trust. Trust that your audience knows how to filter information for themselves. Structure your message in such a way that the people that need to know about it can immediately identify your message as important for their role. Conversely, if your message does not apply to somebody, they should be able to tell that from the first sentence, and feel safe moving on without reading the rest.

## Examples

### Example: Production service alert

**Bad**

> Today we deployed an update to the authentication service. It included several updates which will improve the user experience quite a bit. One of the updates involved a change to the session length. This change was discussed with the security team and they decided that increasing the session length was an acceptable risk for the payoff of a better user experience and less frequent session timeouts. Unfortunately our production configuration was different from our test environment configuration and the change didn't work. Currently users cannot log it and we are working on rolling back the update. We'll keep the team updated with our progress.

**Better**

> **[Customer impact]**: Users currently cannot log in. We are actively working to resolve this issue by rolling back a failed update
>
> **Details**: Today we deployed an update to the authentication service. It included several updates which will improve the user experience quite a bit. One of the updates involved a change to the session length. This change was discussed with the security team and they decided that increasing the session length was an acceptable risk for the payoff of a better user experience and less frequent session timeouts. Unfortunately our production configuration was different from our test environment configuration and the change didn't work. We'll keep the team updated with our progress.

Wow! We barely changed anything! Yet, our revised (_\*ahem\*...**edited**_) message achieves several important goals

1. Immediately notifies other teams that there is a known bug with a serious customer impact. For example, this is crucial information to share with the support team, who will likely be dealing with customers asking why they can't log in
2. Separates the meat of the update from the supporting details. For an executive heading into a board meeting, they don't need to know anything about the daily operations of the engineers. But, they may want to know that their entire user base is currently impacted by a failed deployment. Most importantly, they will want to know that the problem has been identified and the team is actively working on a resolution.
3. Includes the details for those who are interested. But, the details are partitioned from the main update to indicate that the following information is not critical to understanding the importance of the update.

### Example: Project status update

Executive:

> Are we almost done with feature X?

**Bad**

> We broke feature X into 5 discrete user stories. After scoping as a team, each story has about 3-6 tasks. Some of these sound easy but they are really quite challenging. Even though the product requirements are pretty clear, the feature requires us to substantially re-write parts of our code base that have accumulated a lot of technical debt. This makes it a slower process than we'd prefer, but we've discussed it as a team and we don't think there is much alternative here. Even though we estimated we'd be done last week, we are thinking it might be another few weeks at our current rate. Of course, there are unknown unknowns to contend with, so it could be longer. If this timeline doesn't seem acceptable, we could consider pausing feature Y, or maybe pushing out tech update Z. I wouldn't recommend it though, the team won't be very happy about that

**Better**

> We're about 40% complete. Current estimate: it should be available to users 3 weeks from today.
>
> **Options to speed up delivery**
>
> 1. Pause feature Y
>    - this will impact user experience, so its a tradeoff
> 2. Pause tech update Z
>    - the engineering team feels strongly that this is necessary, but we could pivot to after launch to save some time
>
> **Why the delay?** Even though the product requirements are pretty clear, the feature requires us to substantially re-write parts of our code base that have accumulated a lot of technical debt. This makes it a slower process than we'd prefer, but we've discussed it as a team and we don't think there is much alternative here.

We achieved several things here

1. Answered the question up front. Its possible the execute doesn't care about speeding up delivery, they just needed an answer for the shareholders. In that case, you've given your audience permission to stop reading, and saved them valuable time
2. The options to speed up delivery are much more clearly labeled, and the associated side effects are clearly stated. Anybody reading this will be able to make a more informed decision about trade-offs
3. The explanation for the delay may or may not be important. Look back and realize that the executive didn't ask for a justification of the delay, they just asked if we're almost done. Perhaps you inferred some impatience and wanted to address that up front, but its always better to trust your colleagues ("Be charitable") to ask for the information they want. Anticipating their needs is great but to the extent that it doesn't get in their way of the actual information they are requesting.

### Example: Asking for help from a colleague

**Bad**

> Hey do you remember that feature that we merged a few months ago? It's a change to the User query that updates how we resolve their "status" property. Well when we wrote it, we didn't yet have dependency X added to our project so it was written in kind of a legacy way. Now it doesn't quite fit the style that we're using in other parts of the code. I'm working on a user story that requires me to update that property resolver and I was trying to refactor it to use the new dependency. But now when I run the tests I'm getting this weird error message. Do you know how to fix this?

**Good**

> Hey 👋🏻 I need some help on a ticket. Could you let me know a few time slots this week when you have 20-30 minutes where I could explain the issue and we could debug a little together?

Holy crap - we didn't even explain the problem at all! Yet still we had two massive achievements:

1. We saved our colleague probably 10 minutes of reading and re-reading our message and thinking about the problem, when ultimately we all know the answer is gonna be "can I see your screen? I don't really know what's going on"
2. We saved ourselves like 300 keystrokes! Our carpel tunnel will thank us later. But seriously, by removing all description of the actual problem, we also saved ourselves energy by trying (and failing) to summarize the issue for our colleague. That saved energy could be better spent in a million ways.

## Building empathy: "write messages to others in the style that you'd like others to write to you"

_This section assumes that you still aren't convinced of the need to be concise when communicating at work. If you're already convinced, you can skip this part_

Let's practice our empathy skills and imagine a situation that should be familiar to all of us: working on a ticket that was written up by someone else.

Our hypothetical ticket asks us to run a report for the business development team. They need to know how many users match some criteria so they can optimize the marketing channels. Let us consider two possible scenarios:

### Scenario 1: The ticket is concise and includes only the relevant details, nothing more

In this scenario, the ticket includes all relevant parameters to use to filter the data (e.g. time frame), the desired output format, and the expected shape of the data. You are able to execute your task (generating the report) quickly and efficiently, and both parties are satisfied with the outcome.

### Scenario 2: The ticket includes biz dev nuances that are completely irrelevant to the task at hand

In this scenario, the ticket includes a full P&L report from the previous quarter, and a detailed accounting of all the current marketing partners along with their relative performance month-over-month. The ticket writer has included charts showing the changes in CAC from the previous year and a detailed description of the various options the biz dev team considered before asking for this report. Finally, the ticket includes relevant information such as inputs and expected outputs of the report.

In this scenario, you spend a full day just grokking the task at hand. When you deliver the report, you feel a deep sense of unease about whether or not you are truly delivering what was asked of you.

Which of these scenarios feels better? Clearly the first one. Keep this in mind when communicating with your colleagues. While all the supporting details are likely important to you, try to honestly assess their value to your audience before including them in a message.

## Summary

- Everybody consumes information better in a summary format (e.g. bullet points)
- Including only the bare minimum of information in your messages will make you more effective because it will automatically increase your audience's comprehension of your message
- Be kind, courteous, and charitable. This means respecting your colleagues' time, and believing that they are capable of asking for more information if needed
- Edit your messages before you hit send! Nobody writes perfectly on a first draft. Extracting key information in a quick edit will greatly increase audience comprehension, which in turn will increase your work satisfaction

## Post script

Just want to give a shout-out to the team at [Quin](https://helloquin.com) for being fantastic colleagues and pushing me to grow every day. And rest assured, none of the above examples are about anybody in particular - they are truly an accumulation of my experiences over many, many years. 😁
