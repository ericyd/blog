# Make clean PRs with git merge --squash

2021-03-06T10:22:22Z

tags: github, programming, git

---

In an ideal world, every commit you make would be intentional, clean, and precise.

In the real world, every commit you make is incremental progress towards an elusive goal. It's quite common for larger feature branches to include some ugly commits that don't add value to the end PR. My most common ugly commits fall into one of these general categories

- make a commit, then undo that work in a future commit
- add debugging code that I forget to remove
- attempt to solve the problem one way, then switch approaches and solve it a completely different way
- merge upstream branches to work off their in-progress features, but then the upstream branch changes, resulting in merge conflicts

For large PRs, it's very likely that my commit history is convoluted and contains some less-than-ideal commit messages.

My solution? Create a new branch from `main` and "merge squash" my other branch:

```bash
git branch -m gonna-pr         # rename current branch
git checkout main && git pull  # switch to main
git checkout -b my-real-branch # create final branch from main
git merge --squash gonna-pr    # merge squash your old code
git reset                      # unstage files for review
```

After you commit something nice and clean, you can delete the original if desired

```bash
git branch -D gonna-pr
```

## What is this actually doing?

"Merge squash" pulls all the files from your other branch into your current branch, and stages them. But it does **not** commit the merge. This means that all your changes are combined so you can view all your changes at the same time, side-by-side.

## Advantages to "merge squash"

1. It **forces** you to review your own code before opening a PR. This is a benefit for your colleagues (less time correcting simple oversights) but also a great learning experience for yourself. It's quite common for me to look at code I've written an immediately see a better way. Either way, you can feel confident that the PR you're submitting is the best it can possibly be, because you've already reviewed your own code!
2. It reduces the possibility of including unnecessary files or changes in your PR because you're forced to manually add each meaningful file to the final branch.
3. It reduces the number of extraneous commits in your branch. This can be a benefit to reviewers so they don't have the cognitive overhead of trying to read through your commit history and understand your changes.
4. It allows you to remove embarrassing commit messages before review! We've all had those commits with messages like "typo...", or "fixing the thing", or "what is this??". Those are an important part of development but nobody needs to see those

## Why not interactive rebase?

I know at least one person is reading this thinking "interactive rebase has all these benefits and far fewer terminal commands, you should use that instead".

Interactive rebase is indeed a powerful tool, but I think it's inferior. Here's why I don't use it as often

1. You have a much higher chance of having to resolve merge conflicts with interactive rebase. If your branch has substantial divergence from the upstream branch it's based on, you might find yourself fixing merge conflicts for longer than is necessary.
2. Interactive rebase doesn't give you the ability to easily review your changes as a whole set, before submitting them for PR. See "advantage #1" above
3. Other than a little bit less terminal typing, there's really no benefit other than the "cool factor" of saying you know how to do an interactive rebase.

I will note one important place where interactive rebase is a **better** option: if you want to retain a commit history where distinct commits have modified the same file. With interactive rebase, you can keep such a history intact, but with merge squash you are forced to lump same-file changes into a single commit.

## Conclusion

Git is a complicated tool but now you have one more trick up your sleeve to look like a pro. Go forth and make wonderful PRs for everyone to appreciate!
