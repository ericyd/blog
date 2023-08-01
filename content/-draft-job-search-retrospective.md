---
title: "Job Search Retrospective"
created: 2023-07-31T11:33:10-05:00
date:
draft: true
slug: job-search-retrospective
description: Job searching still sucks, so buckle up. I recently accepted an offer and I wanted to share some highlights from my recent job search.
tags: [jobs, unemployment, applications]
---

## TLDR

Job searching still sucks, so buckle up. I recently accepted an offer and I wanted to share some highlights from my recent job search.

## Stats

The moment everyone has been waiting for: statistics about my job search!

1. Total time from layoff to accepted job offer: --TODO--
2. Total applications submitted: --TODO--
3. Total response rate{{< sup 1 >}}:
4. Total number of offers: --TODO--

Here's my [Sankey diagram](https://sankeymatic.com/build/) of my job application experience:

{{< raw >}}

<!-- insert SVG here -->

{{< /raw >}}

{{< sup 1 >}}Includes: rejections and phone screens that resulted from an application. Excludes: phone screens with unaffiliated recruiters who said they would submit my application for a position and then ghosted me.

## What my interviews were like

I didn't have a bunch of interviews beyond phone screens, but most of my interviews were technical in nature. They fell into three camps:

### 1. Live coding

I had 3 interviews that involved live coding. One was a purely algorithmic question, whereas the other two were in the style of pair programming on a "real" question. Here's a summary of what I was asked

1. Write a function to shuffle an array. The solution was very simple compared to the types of questions I expected, but it got interesting when the interviewer started asking about how to test in a deterministic way for probabalistic outcomes, e.g. by measuing the entropy of the system and the probability of obtaining certain results. The probability discussion is far outside my expertise but made for an interesting discussion.
2. Given a file that represents three routes on a REST API, write tests and refactor to fix bugs and make the code more maintainable. The primary task here was simple, but I made two fundamental mistakes:
   1. I didn't read the instructions before I dove in (I took the interviewer's preface at face value, which burned a couple minutes).
   2. I got stuck going down rabbit holes of debugging instead of focusing on the high level objective. I felt OK about what I presented but I didn't really "finish" the assignment by the end which probably counted against me
3. Given an HTTP service that serves 3 different entities (parent -> children -> grandchildren relationship), write a program that lists all grandchildren given a specific parent ID. The core program was quite simple and I spent way too much time talking about irrelevant factors during this interview. It turned out that after I completed the main program, there were follow-up questions that were more interesting and more nuanced. My big take-away here was:
   1. Do not prematurely optimize code in an interview. Note where things can be better and then move on. Trust that the interviewer will ask you for more detail if they want it.

### 2. Technical knowledge

I had 2 interviews that tested my technical knowledge by asking questions like

1. How would you write a mock of an MQTT service for the purpose of unit tests?
2. What is the difference between a Promise and a timeout function with respect to the event loop in Node.js?
3. If you had a large amount of data buffered into a client-side application, how would you efficiently scan to the data that corresponds to a specific timestamp?
4. What are the spread and rest operators in JavaScript and how can you use them?
5. What are some design patterns you've used?
6. What are some examples of when you've used inheritance and composition?

I kind of like this style of interview because it presents the opportunity for a dialogue. I felt out of my element with the design patterns question even though I should have known it was coming. I think my biggest area for growth here is being more concise - I tend to ramble.

### 3. System design

I have never done a system design interview before. I was _extremely lucky_ that early in my interview process at one company, they told me I'd be doing system design in a later interview. That gave me time to figure out WTF is a system design interview.

There are _a lot_ of resources out there for system design interviews. My brother [swears by this system design guide](https://github.com/donnemartin/system-design-primer#study-guide), but personally I found the [Interviewing.io guide on system design interviews](https://interviewing.io/guides/system-design-interview/) to be exactly what I needed. The writing is absolutely top-notch, and the course is extremely focused on topics that provide a high ROI for job applicants. In my opinion, the biggest bang for the (free) buck came from their two YouTube videos showing experienced engineers performing a mock system design interview. ([Link to the lesson with the two embedded videos](https://interviewing.io/guides/system-design-interview/part-two#a-there-s-no-right-way-to-design-a-system), [direct link to first video](https://www.youtube.com/watch?v=Zi0pPkiFemE), [direct link to second video](https://www.youtube.com/watch?v=PU_sgwZvm6s).) This course was crucial for me because it gave me a _structure_ to organize all the knowledge I have in my head. Most of the concepts they teach are things I've read about, heard about, or used directly, but without working through the course, I never would have been able to accurately articulate my thoughts in an interview setting.

In addition to helping me prepare for the system design interview specifically, I felt that studying system design helped me feel more confident as an interviewer overall. I noticed a significant boost in my general interviewing confidence after studying system design because I felt like I had been given a key of useful terms to discuss during interviews.

## Helpful resources

In no particular order, I found some of these resources to be highly useful

- Interview guides
  - [Interviewing.io system design interview guide](https://interviewing.io/guides/system-design-interview/)
  - [LeetCode study plan](https://leetcode.com/studyplan/). Look, I'm not saying LeetCode is perfect, but I found it useful to practice the experience of tackling algorithmic problems. In my experience, most small- to mid-sized companies don't use algorithmic problems in interviews, but I still think understanding the fundamentals is useful to build the muscle memory when you're talking to prospective peers about how you approach programming in general. More than anything, it gets your brain used to approaching unfamiliar problems in a constrained scenario - regardless of your industry or the style of interview, being able to think quickly and accurately about new situations is always useful.
- Job boards
  - https://app.otta.com - Thanks Kim for the rec! Some great high-profile tech companies on here.
  - https://remote.co - If you're looking for remote work, this board has a lot of good options!
- Negotiating salary
  - [This post on Reddit was absolutely fantastic for me](https://www.reddit.com/r/cscareerquestions/comments/10aglj4/negotiating_salary_quick_guide_on_how_to_get_more/). As someone who naturally falls into the "meek and mild" camp, this post was incredibly helpful in breaking me out of my comfort zone and asking for what I deserve.
  - need to read/watch
    - https://interviewing.io/blog/negotiate-salary-recruiter
    - https://www.youtube.com/watch?v=qilnCGjrpso

## Learning experiences / take-aways

1. Be prepared for a _large_ number of no-replies!
2. Keep a pulse on the market, and try to understand if it makes sense to hold out for a dream job or not.
3. Do not underestimate the value of interview practice! I would have been absolutely hosed in a couple of my interviews if I hadn't spent time practicing some algorithmic questions (à la LeetCode) and in particular [studying system design interviews](https://interviewing.io/guides/system-design-interview/).

## Conclusion

Job searching still sucks. Don't forget to be kind to yourself, and others.

If you're a hiring manager or recruiter, please _do not underestimate the value of a response_, even if it is a rejection! Silence is devastating for job applicants. If you can spare a moment, please give a sentence of feedback as to why you declined (I realize that discrimination laws make this challenging for prospective employers).

If you're a job applicant, consider checking out [my other post for some tips and tricks I used to keep my sanity while job searching](https://blog.ericyd.com/how-i-kept-my-sanity-in-my-first-month-of-job-searching/). Also: give yourself permission to avoid LinkedIn! It's a useful tool, but it can be exceptionally morale-draining to read non-stop posts about either A. layoffs, or B. someone getting the job you wanted.

And no matter what your role in the process: Be sure to get enough sleep, eat as well as you can, and practice empathy for those around you. We're all just humans doing our best in a difficult world.
