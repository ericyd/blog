---
title: "Frontend and Backend Development Are the Same Thing"
created: 2024-01-04T14:37:16-06:00
date: 2024-01-04T15:25:56-0600
draft: false
slug: frontend-and-backend-development-are-the-same-thing
description: Despite the pervasive opinion that frontend and backend are different domains of programming, I believe that frontend and backend development are the same, in the context of developing software for web and/or cloud applications.
tags: ["opinion"]
---

## TLDR

Despite the pervasive opinion that frontend and backend are different domains of programming, I believe that frontend and backend development are the same, in the context of developing software for web and/or cloud applications. If you aren't too familiar with the terms or concepts of frontend and backend development, this post probably isn't for you.

## Definitions

For the purpose of this post, I consider "frontend" to be the domain of web development that is concerned with the actual HTML, JavaScript, and CSS that is delivered to, and run on, a client's web browser. I consider "backend" to be concerned with code running on the server and interacting with public resources (such as external APIs) and non-public resources (such as a database).

## Similarities

Some people will surely think I'm insane or inexperienced, but in my opinion there are more similarities between frontend and backend than there are differences. For the rest of the article, I'll use quotation marks to refer to "frontend" and "backend" as they are popularly understood (see [Definitions](#definitions), above).

Here is the primary reason that I believe "frontend" and "backend" are the same: _All web development is fundamentally concerned with ferrying data between sources and destinations._ In "backend", the most classical example of this is ferrying data between API endpoints and a database. In "frontend", the most classical example is ferrying data between an API endpoint and HTML elements that are rendered to the user's screen.

In addition, most modern web development takes place within frameworks. "Frontend" and "backend" frameworks look a little different but fundamentally work the same way:
- they have an entry point
- they route requests to different components
- they separate concerns into various modules that handle specific types of data and requests
- they often have a cental data store that is shared between components and modules

Thirdly, all web development is ultimately concerned with exposing routes on a server that serve data to a client. In "frontend", we set up (typically) very few routes that (typically) serve static assets. In "backend" we may have a comparably greater number of routes, but fundamentally we are still just serving data to clients. Many "backend" routes will be dynamic, but some "backend" routes will also be static.

In my mind, these are some of the fundamental aspects of development, and they are all the same between "frontend" and "backend". For this reason, I believe they are the same. However, this article would be incomplete without a discussion of differences.

## Differences

Of course there are some differences between "frontend" and "backend" development. I personally don't feel that these are substantial enough to consider them different domains of programming, but it is important to note why some people feel strongly that these are entirely different concepts.

### Difference #1: Shape of data

I asserted previously that

> All web development is fundamentally concerned with ferrying data between sources and destinations.
>
> \- Eric Dauenhauer, this blog post

If that is true, then one of the biggest differences between "frontend" and "backend" development is the shape of data that you commonly work with. In "frontend", there are most commonly 3 shapes of data that I can think of:

1. JSON, e.g. from an API. Even if the literal response is something else like XML or binary, it will probably be deserialized into something resembling a JSON object by the library you're using to make the request.
2. HTML/DOM elements. Before the user sees them, DOM elements are fundamentally just data
3. CSS. The style rules that get applied to DOM elements are just data too.

In contrast, the "backend" will often deal with things like:

1. JSON (oh wait...)
2. Rows of records from a database (after deserialization by your ORM or query engine, let's call these "native code objects")
3. Messages from a message broker (also deserialized into a native code object)
4. Responses from an external API (probably JSON or maybe XML if you're unlucky)

It's relevant (IMO) to note that native code objects can almost always be serialized to JSON in a web application. So although the shape of the data looks somewhat different for "backend", I would argue that most of the data is fundamentally the same.

### Difference #2: Scaling

One web development concern that I think is legitimately different between "frontend" and "backend" is how to approach scaling concerns. In "frontend" development, the static assets are shipped to each client and can therefore assume that they have most of the resources from the host machine available at runtime. Certainly memory and CPU need to be considered, but for many simple applications, scaling the "frontend" isn't much of a concern.

On "backend", scaling (or scalability) is a central concern. Any seasoned "backend" engineer will be happy to talk your ears off about the tradeoffs between horizontal and vertical scaling. Adding physical machines, computational capacity, and streamlining code are all things that "backend" engineers think about in order to meet the performance requirements of their application. In addition, "backend" engineers are often constrained by the performance of centralized shared resources such as a database. For this reason, "backend" code often contains thoughtful design patterns that minimize resource access when it might impact performance. 

I believe that all levels of software engineers should think about performance while coding, so to me this isn't a huge differentiator. Many scaling concerns overlap as well, such as how to handle large queries that return a large amount of data. Pattens such as pagination must be handled on both "frontend" and "backend" according to a strict contract in order to deliver the full query results to the end user. However, I concede that the ways in which one might think about scaling on the "frontend" and "backend" are often somewhat different.

### Difference #3: Security

Undeniably, there are significant differences in application security concerns for the code that gets shipped to a user's browser and the code that gets executed on a server. Both have security concerns, and they are both quite different.

However, unless your title is something like "Security Engineer" or your specialty is something like "Security Engineering", I don't see how the difference in security concerns justifies the distinction of an entirely different programming domain. Often, web application attacks can use a combination of "frontend" and "backend" technologies to execute the attack, so just because different parts of your code are aware of different types of security concerns doesn't make them fundamentally different to me. Of course different parts of your application will vary in their scope and concern, but to me that doesn't justify a different job title or informational silo.

### Difference #4: Coding Language

You might use a different language on your "frontend" and your "backend" code. But then again, you might not. Also, I don't consider my programming domain to change based on the language I'm using: most languages these days are general purpose and can be used anywhere with the appropriate compiler. To me, this is irrelevant to the discussion.

## Conclusion, and "Why did you write this?"

Conclusion: "Frontend" and "backend" are the same thing in my mind. This is why I like the title of "full stack engineer". 

I wrote this because I find a lot of people believing strongly in a difference between frontend and backend development and I think it causes more harm than good. Some examples:

* Early-stage tech professionals who want to know what to specialize in. In my opinion, it doesn't matter, because it is all fundamentally the same thing
* Companies that silo people into a "frontend" or "backend" job description and responsibility. These companies are losing out on valuable efficiency gains that could be unlocked by freeing up their engineers to work on whatever is valuable at the time, rather than whatever fits their job description. It is natural to have subject matter experts on a team; it is unnatural to create artificial divisions between team members simply because of what files they access most commonly in their code editor.
* Job searchers who are afraid of applying to jobs because their experience doesn't "line up" with the job description. This sucks! Go out there and get the job you deserve!
    * And of course the inverse: companies who refuse to interview someone for a "backend" position because that candidate has been doing "frontend" for a while. News flash: if you're willing to train someone from React to Vue, or Express to NextJS, then you can train someone from "frontend" to "backend" because the differences are just as substantial.

What are your thoughts? Am I insane, or "outsane"?
