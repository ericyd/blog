---
title: "How I Kept My Sanity In My First Month of Job Searching"
created: 2023-07-07T11:03:58-05:00
date: 2023-07-27T17:06:52-0500
draft: false
slug: how-i-kept-my-sanity-in-my-first-month-of-job-searching
description: >
  When I first received the news about my most recent layoff, I immediately felt a lot of anger and sadness. Among other things, I was angry that I would have to spend my time job searching - a universally dreaded activity. However, I surprised myself by finding a few ways to have fun with the process, and eventually even found myself enjoying aspects of it. Here are a few strategies I used to make my job search tolerable.
tags: [jobs, unemployment]
---

## TLDR

When I first received the news about my most recent layoff, I immediately felt a lot of anger and sadness. Among other things, I was angry that I would have to spend my time job searching - a universally dreaded activity. However, I surprised myself by finding a few ways to have fun with the process, and eventually even found myself enjoying aspects of it. Here are a few strategies I used to make my job search tolerable.

## Track everything

I'm part of [an online community](https://www.underdogdevs.org/) oriented towards mentorship for early-career software professionals, and several of my peers in that group have recently posted the following suggestion for job seekers: keep rigorous data about your job search. In previous job searches, I kept a copy of the posted job descriptions I applied to in a Google Doc, but nothing beyond that. This time around, I made a detailed spreadsheet where I can track jobs I applied to, Leetcode problems I completed, recruiters I spoke to, and more. The core of the spreadsheet tracks my job applications, which includes my current place in the interview process, final results (e.g. offers/rejections), and dates of specific interactions. This allows me to calculate [quick statistics](#fun-statistics) about which companies are replying, which ones aren't, and how long it takes to hear back on average. While it hasn't changed a lot about my approach, it gives me a focal point for my effort and makes it feel intentional, as opposed to just blasting out endless applications and feeling like nothing is ever going anywhere. It also makes it really easy to see if I'm meeting my weekly goals and that gives me a sense of accomplishment, even if nothing has functionally changed in my employment status.

## Use ChatGPT to write cover letters

Aside from tracking granular data on my job applications, the biggest game-changer for this job search was using ChatGPT to write my cover letters. Cover letters are always my least favorite part of the process because:

1. Writing bespoke letters to every company is impractical, so you're forced to use a certain amount of copy/pasting between letters even though you know this is "bad practice".
2. Trying to sound original to every company is a huge energy suck, particularly when job application response rates are low. It is demoralizing to spend so much energy on something that feels like it was never even read by a human.
3. There is a massive chance for typos in manual cover letters, because it isn't practical to give them the same level of scrutinty as a resume (which typically has far fewer adjustments for each job application).

This is the prompt I used:

```
Given this resume and this job description, please write a cover letter for a job application to maximize the chance of getting hired. Limit full cover letter to less than 150 words. The resume will start with ---RESUME START--- and end with ---RESUME END---. The job description will start with ---JOB DESCRIPTION START--- and end with ---JOB DESCRIPTION END---. Omit boilerplate such as address and salutation.

---RESUME START---
(insert plaintext or markdown resume here)
---RESUME END---

---JOB DESCRIPTION START---
(copy/paste job description)
---JOB DESCRIPTION END---
```

I had amazing success with this strategy! It saved so much time and energy, and kept me fresh for lots of applications. If a recruiter or hiring manager is reading this and thinks this strategy is disingenuous, my reply is: unless the job application comes with a _guaranteed response_ from the company, it isn't fair to require a cover letter in the first place. If you do guarantee a response to every application, go ahead and note that in the job description - it is uncommon and greatly appreciated!

## Take a vacation

Prior to my layoff, I had already scheduled a vacation to visit family for a week. I could never have guessed how important this was for my mental health. I blasted off a bunch of job apps before I left and then intentionally unplugged while I was away. This gave the job applications time to percolate naturally. Since job applications take time to get processed and hear back, this meant that I wasn't stressing about the lack of replies every day. When I got back, I had 1 first-round interview and 2 phone screens set up and I was also feeling super refreshed and energized. Obviously a vacation is not always practical or possible when you suddenly lose your income source, but I strongly support making time to fully unplug early in the unemployment process. I also think, if possible, sending off a bunch of applications _prior_ to taking a break is a great strategy because then you can feel passively productive when you get one or two phone screens or first round interviews.

## Set goals and stick to them

I'm a very goal-oriented person so this has been a big one for me. There are two major benefits I've found to this:

1. It keeps me focused on doing things that matter to me. It is so easy to get side-tracked in a job search, so having a pre-determined priority list of how to spend my time is extremely useful.
2. It gives me automatic positive feedback. Job searching is inherently discouraging, so feeling good about achieving goals gives me motivation to keep going.

It sounds kind of cheesy, but setting goals has helped me feel a lot more normal during this process. Also, if you include goals for "fun" things, it is even more beneficial because you get a positive feedback from doing things you enjoy. For example, writing more blog posts and making more music are two of my goals during my unemployment. I enjoy doing both of those things so sticking to my goals means doing more things I enjoy!

## Sleep in

It feels good.

## Keep a plain-text copy of your resume handy

Having a plain text resume is useful, because:

1. If you use ChatGPT to generate cover letters, having a plain text resume will be extremely useful.
2. When you're filling out profiles on sites like Indeed, Zip Recruiter, or (god forbid) a single job application that requires you to enter your experience manually, it is _really_ useful to have a plain text version ready that is accurate and free from any formatting. It protects you from formatting issues you might get when copy/pasting from a Google Doc or PDF.

I am a nerd so I have a full code-based build system for my resume. A more reasonable approach would be to use Google Docs or similar and just export to PDF. I prefer a high degree of control so I maintain a [Pug](https://pugjs.org/api/getting-started.html) template which renders to HTML, then I use [Puppeteer](https://pptr.dev/) to render to PDF. I also use [this html-to-markdown package](https://www.npmjs.com/package/@inkdropapp/html2markdown) to render the HTML back to Markdown. I have 2 main reasons I prefer a resume build system:

1. It is easier to comment-out portions of my resume and tweak the content, while preserving the previous version for comparisons or A/B tests
2. I can use CSS to style my resume
3. It keeps me engaged and gives me something "fun" to do

For most people, this system will be unreasonable, but even for normies I recommend keeping a simple plain text resume. It has been surprisingly useful, and definitely a practice I will keep going forward.

## Buy a phone clip!

I don't remember where I read this advice, but it has been crucial for all the phone screens that are required during job applications: invest in a hands-free phone clip so you don't have to hold your phone when talking to recruiters. I bought [this iKlip product](https://www.ikmultimedia.com/products/iklipxpandmini/) a while ago for the purpose of recording myself playing my keyboard, but I repurposed it for phone calls and it works like a dream. Any free-standing phone clip will work, but trust me that it will put you more at ease, and make it 100x easier to multitask on the phone, e.g.

1. take notes
2. pull up the company website
3. reference the job description
4. doodle / fidget so you don't freak out

All of these are more likely to make you come across as relaxed and confident during a phone screen, which can be crucial! It also makes it less physically tiring to be on the phone all the time which is significant if you have several calls in one day.

## "Fun" statistics

1. Total applications submitted: 34
2. Total number of replies{{< sup 1 >}}: 13
3. Total number of offers: 0
4. Average time to first reply (including rejections): 4.3 days
5. Number of openings that closed during the interview process: 1
6. Percentage of unaffiliated{{< sup 2 >}} recruiters who ghosted me after an initial chat: 100%

{{< sup 1 >}}This includes all explicit rejections, but excludes phone screens with unaffiliated recruiters who said they would submit my application and never replied.

{{< sup 2 >}}By "unaffiliated" I mean working for a staffing/recruitment agency rather than directly for the company who is hiring.

Here's my [Sankey diagram](https://sankeymatic.com/build/) of my current progress

{{< raw >}}
<svg height="600" width="600" xmlns="http://www.w3.org/2000/svg">

<title>Job application progress</title>
<!-- Generated with SankeyMATIC: 7/26/2023, 4:06:56 PM -->
<rect height="600" width="600" fill="#f9fafb"></rect>
<g transform="translate(138.00666690826415,18)">
<g id="sankey_flows">
<path id="flow1" d="M9 260.71358C212.74833 260.71358 212.74833 267.24839 416.49667 267.24839" fill="none" stroke-width="174.48529" stroke="#f00" opacity="0.45"><title>Applications → No reply yet: 21</title></path>
<path id="flow0" d="M9 144.39005C213.12417 144.39005 213.12417 106.61806 417.24833 106.61806" fill="none" stroke-width="58.16176" stroke="#f80" opacity="0.45"><title>Applications → Rejected: 7</title></path>
<path id="flow2" d="M9 372.88269C60.12417 372.88269 60.12417 421.65215 111.24833 421.65215" fill="none" stroke-width="49.85294" stroke="#17becf" opacity="0.45"><title>Applications → Phone screen: 6</title></path>
<path id="flow3" d="M120.24833 434.11538C170.8725 434.11538 170.8725 467.03733 221.49667 467.03733" fill="none" stroke-width="24.92647" stroke="#2ca02c" opacity="0.45"><title>Phone screen → First round: 3</title></path>
<path id="flow7" d="M120.24833 409.18891C268.3725 409.18891 268.3725 366.95427 416.49667 366.95427" fill="none" stroke-width="24.92647" stroke="#2ca02c" opacity="0.45"><title>Phone screen → No reply yet: 3</title></path>
<path id="flow4" d="M230.49667 475.34615C280.62083 475.34615 280.62083 500.84559 330.745 500.84559" fill="none" stroke-width="8.30882" stroke="#9467bd" opacity="0.45"><title>First round → Second round: 1</title></path>
<path id="flow5" d="M339.745 500.84559C377.36917 500.84559 377.36917 527.84559 414.99333 527.84559" fill="none" stroke-width="8.30882" stroke="#8c564b" opacity="0.45"><title>Second round → Third round: 1</title></path>
<path id="flow6" d="M230.49667 467.03733C322.12083 467.03733 322.12083 462.00486 413.745 462.00486" fill="none" stroke-width="8.30882" stroke="#e377c2" opacity="0.45"><title>First round → Position closed: 1</title></path>
</g>
<g id="sankey_nodes">
<g class="node">
<rect id="r0" class="for_r0" x="0" y="115.30916" height="282.5" width="9" fill="#17becf" fill-opacity="1"><title>Applications:
34</title></rect>
</g>
<g class="node">
<rect id="r1" class="for_r1" x="110.24833" y="0.01937" height="58.16176" width="9" fill="#1f77b4" fill-opacity="1" transform="translate(307,77.5178)"><title>Rejected:
7</title></rect>
</g>
<g class="node">
<rect id="r2" class="for_r2" x="220.49667" y="189.17613" height="199.41176" width="9" fill="#ff7f0e" fill-opacity="1" transform="translate(196,-9.17039)"><title>No reply yet:
24</title></rect>
</g>
<g class="node">
<rect id="r3" class="for_r3" x="110.24833" y="470.24143" height="49.85294" width="9" fill="#2ca02c" fill-opacity="1" transform="translate(1,-73.51576)"><title>Phone screen:
6</title></rect>
</g>
<g class="node">
<rect id="r4" class="for_r4" x="220.49667" y="507.3754" height="24.92647" width="9" fill="#d62728" fill-opacity="1" transform="translate(1,-52.8013)"><title>First round:
3</title></rect>
</g>
<g class="node">
<rect id="r5" class="for_r5" x="330.745" y="426.57548" height="8.30882" width="9" fill="#9467bd" fill-opacity="1" transform="translate(0,70.11569)"><title>Second round:
1</title></rect>
</g>
<g class="node">
<rect id="r6" class="for_r6" x="440.99333" y="426.57434" height="8.30882" width="9" fill="#8c564b" fill-opacity="1" transform="translate(-26,97.11683)"><title>Third round:
1</title></rect>
</g>
<g class="node">
<rect id="r7" class="for_r7" x="330.745" y="553.67181" height="8.30882" width="9" fill="#e377c2" fill-opacity="1" transform="translate(83,-95.82136)"><title>Position closed:
1</title></rect>
</g>
</g>
<g id="sankey_labels" font-family="sans-serif" font-size="16px" font-weight="400" fill="#000000">
<text text-anchor="middle" x="161.99333309173585" y="577" font-size="11px" font-weight="400" fill="rgb(127, 127, 127)">Made with SankeyMATIC</text>
<rect id="label0_bg" class="for_r0" x="-125.50666" y="244.88417" width="124" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0"></rect>
<text id="label0" class="for_r0" text-anchor="end" x="-7.02333" y="256.55916" dy="5.7749999999999995">Applications: 34</text>
<rect id="label1_bg" class="for_r1" x="16.75833" y="17.42525" width="91.98333" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(307,77.5178)"></rect>
<text id="label1" class="for_r1" text-anchor="end" x="103.225" y="29.10025" dy="5.7749999999999995" transform="translate(307,77.5178)">Rejected: 7</text>
<rect id="label2_bg" class="for_r2" x="95.87333" y="277.20701" width="123.11667" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(196,-9.17039)"></rect>
<text id="label2" class="for_r2" text-anchor="end" x="213.47333" y="288.88201" dy="5.7749999999999995" transform="translate(196,-9.17039)">No reply yet: 24</text>
<rect id="label3_bg" class="for_r3" x="-18.84167" y="483.4929" width="127.58334" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(1,-73.51576)"></rect>
<text id="label3" class="for_r3" text-anchor="end" x="103.225" y="495.1679" dy="5.7749999999999995" transform="translate(1,-73.51576)">Phone screen: 6</text>
<rect id="label4_bg" class="for_r4" x="113.67333" y="508.16365" width="105.31667" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(1,-52.8013)"></rect>
<text id="label4" class="for_r4" text-anchor="end" x="213.47333" y="519.83863" dy="5.7749999999999995" transform="translate(1,-52.8013)">First round: 3</text>
<rect id="label5_bg" class="for_r5" x="200.75502" y="419.05488" width="128.48333" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(0,70.11569)"></rect>
<text id="label5" class="for_r5" text-anchor="end" x="323.72167" y="430.72989" dy="5.7749999999999995" transform="translate(0,70.11569)">Second round: 1</text>
<rect id="label6_bg" class="for_r6" x="328.82" y="419.05375" width="110.66666" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(-26,97.11683)"></rect>
<text id="label6" class="for_r6" text-anchor="end" x="433.97" y="430.72875" dy="5.7749999999999995" transform="translate(-26,97.11683)">Third round: 1</text>
<rect id="label7_bg" class="for_r7" x="192.78834" y="546.15126" width="136.45" height="23.7" rx="4" fill="#fff" fill-opacity="0.55" stroke="none" stroke-width="0" stroke-opacity="0" transform="translate(83,-95.82136)"></rect>
<text id="label7" class="for_r7" text-anchor="end" x="323.72167" y="557.82622" dy="5.7749999999999995" transform="translate(83,-95.82136)">Position closed: 1</text>
</g>
</g></svg>
{{< /raw >}}
