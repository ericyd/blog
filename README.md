# Blog

Web log --> weblog --> blog

## Setup

```shell
cp .env.sample .env # and then populate
npm i # for publishing to cloudflare pages
brew install hugo # for building site
```

## Building

```shell
hugo
```

or for development

```shell
hugo server
```

## Publishing

```shell
npm run login # only required once in a while
npm run publish
```

This will

1. "build" (i.e. copy public files into /build directory)
2. publish to Cloudflare pages

## New post

```
hugo new my-new-post.md
```

Interestingly, the `.md` is _critical_ in this command. Without it, Hugo won't know which archetype to use.

### New micro post

To use the "micro" blog template ("archetype" in Hugo parlance), include "micro/" in the path:

```
hugo new micro/my-micro-post.md
```