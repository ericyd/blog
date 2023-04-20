---
title: "Migrating From Hashnode to Self Hosted"
date: 2023-04-19T10:02:54-05:00
draft: false
slug: migrating-from-hashnode-to-self-hosted
---

I started this blog [on Hashnode](https://ericyd.hashnode.dev/), a free blogging platform which caters to the software community.

I think Hashnode does a lot of things really well, and I was grateful that it allowed me to start up a blog with nearly zero overhead. So why did I move away from it? It came down to a single checkbox really:

![Picture of checkbox in Hashnode publishing pane which reads "Hide article from Hashnode feed"](https://res.cloudinary.com/ericyd/image/upload/v1681916743/blog/Screenshot_2023-04-19_at_9.56.39_AM_bjhybg.png)

## What Hashnode does well

Hashnode is a really slick blogging platform with a lot of cool features, for example:

1. Excellent markdown-based editor with convenient WYSIWYG features
2. Social features built-in to enable things like comments, likes, and shares
3. Integrated CDN to make it easy to upload images and embed them in your blog (including helpful integrations like Unsplash to grab stock images for your posts)
4. Lots of extensibility, including the option for custom CSS and a custom domain
5. Option for automatic content backup to GitHub (this was priceless when I decided to migrate away)

For most use cases, Hashnode offers pretty much everything a blogger could want.

## What Hashnode did not do well (for me)

Within the past year, I decided to start blogging more about non-tech-related topics. My fist foray into this realm was [The Purge makes no sense](/the-purge-makes-no-sense/), though I soon followed it up with others.

Although I didn't hesitate to publish my posts, I was aware of the fact that my posts didn't really "fit in" with the Hashnode community interests. This was, after all, a community built around software that regularly hosts blogging hackathons sponsored by tech companies. Just take a look at [the Hashnode homepage](https://hashnode.com/) and you'll see what an "average" blog post looks like.

It was shortly after I started publishing non-tech content that I noticed this checkbox buried deep in the "publish" sidebar. It reads

> **Hide article from Hashnode feed**
>
> If you'd rather not have your article show up in Hasnode's feed that's displayed to our entire community
>
> (checkbox) Yes, hide this article from Hashnode and display it only on my blog

I utilized this checkbox a few times, although it struck me as odd that I was maintaining a blog on a community-centered platform when I was intentionally hiding my content from the community.

What I have noticed over the past few months is that I've had ideas for blog posts that feel "rough around the edges". These ideas felt like they were worth exploring, but I also felt confident that they weren't well suited for the Hashnode community. The ideas I wanted to explore were more experimental or philosophical.

In addition to a mis-match of content, I felt myself pulling back from publishing on Hashnode because I felt that it required a higher degree of polish than I always wanted to commit to. I found myself wishing I had a place to post my "unfinished" thoughts where I wouldn't have to worry about how the "community" felt about them.

I realized that self-hosting my blog was my best option. My rationale was basically:

1. Self-hosting will re-center myself as the primary beneficiary of my writing
2. Writing for "me" rather than "the audience" will open me up to exploring more unusual, niche, or unfinished ideas
3. Opening myself to more styles of writing will increase my total writing output
4. Increasing my total writing output will naturally improve my writing, because practice is the key to everything in life

The risk of self-hosting is also quite low for me. I don't have a lot of followers to worry about losing, and the technical lift is low (and also fun to me because I'm a nerd 🤓).

## How I migrated to self-hosting

I knew that I wanted to reuse my [ericyd.com](https://ericyd.com) domain for my blog, since I already owned it and it made sense to consolidate my content in one place. However, my homepage hosted at [ericyd.com](https://ericyd.com) was hosted on GitHub Pages, and I wanted to manage my blog separately from my homepage. I knew that GitHub Pages automatically nested other repos under the root domain (e.g. [ericyd.github.io/generative-art](https://ericyd.github.io/generative-art) is the GitHub Pages site for [my generative-art repo](https://github.com/ericyd/generative-art)), so hosting at ericyd.com/blog would be a pretty easy option.

However, I was really enamored with my experience with Cloudflare Pages, which I was introduced to [when building LoopSupreme](https://blog.ericyd.com/loop-supreme-part-12-v10-release-and-project-retro/#tech). I knew that moving my personal site to Cloudflare Pages would give me more flexibility in routing my project using a subdomain, which was how I really "wanted" to do it.

After I moved my personal site from GitHub Pages to Cloudflare Pages, I needed to set up my blog on the `blog.ericyd.com` subdomain. This was easy to configure in the Cloudflare dashboard since I had already configured my root DNS for my personal site. This isn't intended to be a tutorial so please excuse the elision of technical details.

The last step was to build my blog as a static site so I could publish to Cloudflare Pages.

## Choosing a static site generator

Part of my motivation for moving away from Hashnode was to retain as much simplicity as possible in my writing experience. Hashnode streamlines a lot of things, but publishing always felt like "a big deal" to me. I wanted publishing to feel dead simple and low stakes.

I knew I wanted to just write in markdown. I tried [barf](https://git.sr.ht/~bt/barf) and it worked fine but I was surprised and turned off by how slow it was. Perhaps that's because I used `pandoc` instead of their recommended `smu` for markdown generation, but either way it was annoying to me. I've used Jekyll in the past and it was fine but I wanted to try something new and had heard good things about Hugo, so I tried it out. I dislike how [their Quickstart guide](https://gohugo.io/getting-started/quick-start/) leans entirely on using an established theme; I wanted to just build a dead-simple HTML page from my markdown document. However, after getting my layouts configured, I was pleased by its wicked speed and high degree of customizability (though I may never use most of it). Another big plus was automatic code syntax highlighting without including a JS lib in the site.

Migrating to a static site generator did [take some work](https://github.com/ericyd/blog/pull/2), but the process was aided significantly by the automatic backup that Hashnode provides. Basically all my markdown docs were automatically exported for me and I was able to just run a few scripts to clean them up in the way Hugo expected.

## Conclusion

Hashnode is a really great blogging platform and I wish them all the best. Regardless, hosting my own blog makes more sense for me right now and I'm looking forward to writing more here.
