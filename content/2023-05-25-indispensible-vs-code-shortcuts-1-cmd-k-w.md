---
title: "Indispensable VS Code shortcuts #1: `cmd+k+w`"
created: 2023-05-24T17:51:36-05:00
date: 2023-05-25T10:06:16-0500
draft: false
slug: indispensable-vs-code-shortcuts-1-cmd-k-w
description: Open your editor right now and press `cmd+k+w` (Mac) or `ctrl+k+w` (Windows). Thank me later
tags: [vscode, productivity]
---

## TLDR

Open VS Code right now and press `cmd+k+w` (Mac) or `ctrl+k+w` (Windows). Thank me later

## What does it do?

It immediately and irrevocably closes all your open tabs. Exception: dirty (unsaved) files

## Why do I love it?

Closing all your tabs is the ultimate breath of fresh air. Ramp up time between tasks is a huge drain on cognitive resources, and a major part of that is because it is extremely common to continue thinking about the previous task even after you've "switched" to a new task.

One way that I mitigate the cost of context switching is by giving myself a clean slate every time I start a new task. There is no better feeling than having a totally fresh editor waiting for your command. I find that it makes me feel less overwhelmed about starting new tasks and helps me focus on the new task rather than ruminating on my previous task.

This has been such a useful pattern for me that I find myself using this key combination in apps that don't even support this behavior, like Firefox. 😆

## How to integrate it into your workflow

Every time you start a new task, hit `cmd+k+w` / `ctrl+k+w`. No exceptions! If you have dirty/unsaved files, save or close them immediately.

## Defeating FOMO

When I started using this shortcut, I was sometimes afraid that I would forget important context on another task if I didn't keep a reference to the file I had open. After a time, I realized two things:

1. The number of times I actually missed having the file open was exactly `0`
2. The fear that I would be missing something was actually an important clue to leave myself more notes about where I was leaving off in the task.

If #2 resonates with you, here's my tip: write yourself a note in whatever file(s) are most relevant, stage the file(s), and commit with the message `WIP` for "Work In Progress". When you revisit the branch, soft-reset your branch with `git reset HEAD~1` to recall your work in progress. Maybe I'll write a larger post about saving work-in-progress in the future. Astute readers will recognize that this is basically a more cumbersome `git stash`; I still prefer it because it links my "WIP" to the specific branch I'm on, whereas `git stash` jumbles together _all_ my WIP in a single list. I use both, but I prefer a `WIP` commit when I need to context-switch away from a task. Clearly this is personal preference, use what works for you.

## Conclusion

`cmd+k+w` / `ctrl+k+w` is a wonderful way to clear your workspace between tasks and reset your mind to start each task fresh.
