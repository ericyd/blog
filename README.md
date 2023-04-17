# Blog

Web log --> weblog --> blog

## Setup

```shell
cp .env.sample .env # and then populate
npm i
```

## Publishing

```shell
npm run login # only required once in a while
npm run publish
```

This will

1. "build" (i.e. copy public files into /build directory)
2. publish to Cloudflare pages
