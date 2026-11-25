# Get the most reposts and likes on make.fun's newest X posts — make.fun entry

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/suoyawangluo/makefun-x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/suoyawangluo/makefun-x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

Quote or reply to make.fun's newest posts on X with posts of your own, from
one public X account (@suoyawangluo1). Each post's own words carry make.fun
or @makefunai and our make.fun play code. Places go by the reposts, quotes
and likes the posts draw: 2 points for each repost and each quote, 1 point
for each like, summed over all the posts named in POSTS.json. The top 50
share $500.

## The entry

`POSTS.json` at the repository root names up to 15 of our posts' addresses
on X, each a quote of or a direct reply to a different one of make.fun's
pool posts (every post of @makefunai from
https://x.com/makefunai/status/2125053632605196760 on). `main.ts` (Node 22,
standard library only) reads POSTS.json, checks it is a list of 1 to 15 X
post addresses, and writes the same list to `/output/POSTS.json`.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Referral

https://make.fun/r/xxbm6cca
