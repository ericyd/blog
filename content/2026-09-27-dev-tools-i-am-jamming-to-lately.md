---

title: "Dev Tools I'm Jamming to Lately"
created: 2026-09-19T18:46:06-05:00
date: 2026-09-19T20:06:01-0500
draft: false
slug: dev-tools-i-am-jamming-to-lately
description: 
tags: []
---

For the first time in a few years, I've been coding outside of work. It has given me an opportunity to refresh some of my dev tooling, and I figured I'd share some of what I've been using. I give all of these tools a very high review: if they are listed here, I love them.

## Zed

For years I had used VS Code happily. But as I started using AI more and more to write the first draft of my code, I became less and less interested in all the plugins I used with VS Code. Plus, VS Code is not a "slow" application by my standards, but it isn't exactly ripping around, especially with large repos and lots of plugins. I was interested in something more minimal.

Zed (https://zed.dev/) is minimal but still full-featured, and is one of the fasted graphical applications I've used. I love that I can open a new window and load a repository as fast as I can think it. To my eyes, it feels as fast as `cd` in a terminal, but unlike a terminal, I get a full graphical editor with full VS Code keybinding support, great themes, a solid git integration, a file tree viewer, nice commands like "unique lines" built-in, and a rich ecosystem of plugins when the defaults don't cut it. I don't intend to ever go back. My only feature request would be a graphical way to force refresh the `git status` (sometimes it takes a few seconds to refresh automatically). Shameless plug: I ported my VS Code theme [Colorbox in the Park](https://github.com/ericyd/vscode-colorbox-in-the-park) to Zed if you care to install it.

## Otty

I only started using Otty (https://otty.sh/) a few weeks ago, but wow I love it! For a long time I was a plain Terminal user. iTerm2 always felt slightly too heavy for some reason, and I didn't really like the way it looked. When Ghostty (https://ghostty.org/) came out, I installed it and loved it as a nice improvement over Terminal. The main feature I wanted that Terminal didn't provide was split panels, which Ghostty has. I was content for quite a while.

Recently at work, a coworker recommended herdr (https://herdr.dev/). I liked it but didn't love it. To be clear, I'm not a terminal maximalist. I do what I need to do in the terminal and then leave. I love keybindings in my editor, but I don't like memorizing layers of commands just to do basic things, and herdr felt a little clunky without committing fully to its keyboard shortcuts. But, I really loved the "vertical tab" interface.

After a brief search for a modern terminal with vertical tabs, I found Otty and I have not looked back. It is perfect. Some people claim it is a Ghostty fork, but the [Otty credits page](https://docs.otty.sh/reference/credits) doesn't seem to support that conclusion. For one thing, Ghostty is (semi-)famously written in Zig, whereas Otty indicates it is largely built in Rust. Otty does credit Ghostty for some part of its terminal, but I got the impression it was more of a supporting feature than a full-on fork. That said, I don't know much about terminal emulators, so I could be wrong!

I digress. I highly recommend Otty if you want a fast, native-feeling terminal that looks nice and has vertical tabs, with some nice features for working with agents.

## mise

mise (https://mise.jdx.dev) is a version manager, task runner, environment manager, and more. I primarily use it as a version manager and task runner, and I couldn't be happier. I was always planning to install [Just](https://github.com/casey/just) for my next project, but mise "feeds two birds with one scone". As a (primarily) Node.js guy, a version manager is essential. I've used nvm and asdf, but mise is my favorite by far. nvm is way too slow for 2026; it incurs a noticeable lag when opening a new terminal tab, and I just can't be bothered. asdf works well but I can absolutely **never** remember the command syntax, somehow it is _just_ esoteric enough to never stick in my head. mise, by contrast, works great and is extremely fast. I love that everything is managed in a configuration file which means there are very few commands to remember, and I LOVE the task runner. Being able to define aliases, add descriptions, write multi-line tasks, and add task dependencies is just fantastic. As a Node guy, npm scripts in package.json are a classic way to write project scripts, but it is SO BAD compared to mise. Let's compare:

| Feature | npm scripts | mise |
| ------- | ----------- | ---- |
| Multi-line tasks | Not possible | Wrap it in triple quotes |
| Descriptions | Not possible | Add a `description` property |
| Aliases | Not possible | Add an `alias` property |
| Task dependency | Write a second task with `pre` prefix, like `preMyTask` | Add a `depends` property to the task definition which takes an array of dependencies |
| WHITESPACE | NOT. POSSIBLE. | mise uses toml as the config file definition: comment and whitespace away! |

The descriptions alone make `mise task` (list all tasks) infinitely more useful than `npm run` (list all scripts), not to mention it is probably 100x faster. I have been converting all my personal projects to mise as I touch them, it is a great option for Node and non-Node projects.

## OpenCode

I use Claude Code at work, but at home I use [OpenCode](https://opencode.ai/) and [DeepSeek](https://deepseek.com/en/). I don't know what to say other than OpenCode sparks **significantly** more joy than Claude Code. It works amazingly well out of the box, it is very fast, it supports a ton of models, and it Just Works. Plus there is a lot of writing coming out about how lighter weight agent harnesses work better overall. DeepSeek almost got its own heading, but I decided to just add it here. It is cheap and amazingly productive, a great general-purpose coding model.

## pnpm

I have used plain npm for years, but pnpm (https://pnpm.io/) really does have some nicer features. Beyond installing faster, the way it manages dependencies is really nice. It symlinks all the dependencies to a shared directory, which is particularly great when working with git worktrees. When you create a new worktree, running `pnpm i` is almost a no-op in terms of speed. Definitely not true with `npm i` in a git worktree. It is faster and has some nice security defaults, I'll never go back. Plus, you can manage it with `mise`! (`tools.pnpm`)

## hunk

hunk (https://www.hunk.dev/) is the newest (to me) tool on this list, but I really like it. The main thing I like about it is being able to add comments in a diff and have an agent reply to them or act on them. It makes it feel a lot more conversational to work on a feature with an agent. I don't prefer it for simply reading diffs (I use Zed for that), but being able to make inline comments and tell an agent to respond or act on them is really great.

That's it for now, bye 👋
