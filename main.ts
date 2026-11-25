// makefun-x-reposts-02 entry (Node 22, standard library only).
//
// The entry is the X posts themselves: posts of ours on X, from one public
// account (@suoyawangluo1), each quoting or replying directly to a different
// one of make.fun's pool posts on x.com/makefunai, each one's own words
// carrying make.fun or @makefunai and our make.fun play code. POSTS.json at
// the repository root names them; the house reads their reposts, quotes and
// likes from X. Nothing this program writes about the posts is scored.
//
// This program reads POSTS.json, checks it is a list of 1 to 15 X post
// addresses, and writes the same list back out to /output/POSTS.json, so the
// gate sees exactly the list the repository holds. The placeholder address in
// POSTS.json must be replaced with the real post addresses before submitting.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const POSTS_FILE = join(BOT_DIR, 'POSTS.json');
const OUT_FILE = join(OUTPUT_DIR, 'POSTS.json');

const POST_ADDRESS =
  /^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[^/]+\/status\/\d+$/;

type GateReport = { ok: boolean; count: number; reason: string };

function parsePosts(): { posts: string[]; report: GateReport } {
  const raw = readFileSync(POSTS_FILE, 'utf8');
  const parsed: unknown = JSON.parse(raw);
  const list = (parsed as { posts?: unknown } | null)?.posts;
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(list)) {
    return { posts: [], report: { ok: false, count: 0, reason: 'POSTS.json must be an object with a "posts" array' } };
  }
  if (list.length < 1 || list.length > 15) {
    return { posts: [], report: { ok: false, count: list.length, reason: `POSTS.json must name 1 to 15 posts, got ${list.length}` } };
  }
  const bad = list.find((p) => typeof p !== 'string' || !POST_ADDRESS.test(p));
  if (bad !== undefined) {
    return { posts: [], report: { ok: false, count: list.length, reason: `not an X post address: ${String(bad)}` } };
  }
  return { posts: list as string[], report: { ok: true, count: list.length, reason: 'gate passes' } };
}

function writePosts(posts: string[]): string {
  const body = JSON.stringify({ posts }, null, 2) + '\n';
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, body, 'utf8');
  return createHash('sha256').update(body, 'utf8').digest('hex');
}

function verifyWritten(expectedSha: string): void {
  const back = readFileSync(OUT_FILE, 'utf8');
  const actualSha = createHash('sha256').update(back, 'utf8').digest('hex');
  if (actualSha !== expectedSha) {
    throw new Error(`read-back mismatch: wrote ${expectedSha}, read ${actualSha}`);
  }
  console.log(`verified ${OUT_FILE} sha256 ${actualSha}`);
}

const { posts, report } = parsePosts();
if (!report.ok) {
  throw new Error(report.reason);
}
const sha = writePosts(posts);
verifyWritten(sha);
console.log(`wrote ${OUT_FILE} (${report.count} post${report.count === 1 ? '' : 's'}): ${report.reason}`);
