#!/usr/bin/env node
/**
 * Recount the Learn with Phoebe course shelves from the hub and write the
 * numbers into src/data/course-shelves.json.
 *
 * Why this exists: the shelf counts used to be typed by hand while the truth
 * lived in the hub's courses.json. They drifted four times in six weeks
 * (50 -> 90 -> 110 -> 126 -> 153 -> 168), and each time a human had to notice
 * the site was lying. Publishing a course should be the only action required.
 *
 * This script is the ONLY writer of `liveCount` and `generatedAt`. Everything
 * else in that file - shelf names, bucket groupings, samples, icons - is
 * human-owned and never touched here.
 *
 * Usage:
 *   node scripts/sync-course-counts.mjs            recount and write
 *   node scripts/sync-course-counts.mjs --check    fail if counts are stale, write nothing
 *   node scripts/sync-course-counts.mjs --verify   also HTTP-check every course site
 *
 * It refuses to write rather than writing something wrong. Every exit below is
 * a deliberate "leave the last known good numbers alone".
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const HERE = dirname(fileURLToPath(import.meta.url))
const CONFIG = resolve(HERE, '../src/data/course-shelves.json')
const TIMEOUT_MS = 30_000

/** A feed that lost most of its courses is a broken feed, not a smaller library. */
const SHRINK_FLOOR = 0.5

const args = new Set(process.argv.slice(2))
const checkOnly = args.has('--check')
const verifySites = args.has('--verify')

const die = (msg) => {
  console.error(`sync-course-counts: ${msg}`)
  console.error('sync-course-counts: refusing to write - existing counts left untouched')
  process.exit(1)
}

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) }).catch((e) => {
    die(`could not reach ${url} (${e.message})`)
  })
  if (!res.ok) die(`${url} returned HTTP ${res.status}`)
  return res.json().catch(() => die(`${url} did not return valid JSON`))
}

const config = JSON.parse(await readFile(CONFIG, 'utf8'))
const hub = await getJson(config.source)

if (!Array.isArray(hub.courses)) die('hub payload has no `courses` array')
if (!Array.isArray(hub.buckets)) die('hub payload has no `buckets` array')

// A course with no `status` is live; `planned` and anything else is not.
const live = hub.courses.filter((c) => !('status' in c))
if (live.length === 0) die('hub reports zero live courses')

const excluded = new Set(config.excludedBuckets)
const mapped = new Set(config.shelves.flatMap((s) => s.buckets))

/*
 * The check that actually earns its keep. The hub has retired buckets (`aidm`,
 * `ecom`) and added them (`dsec`, `ship`, `biz`) without warning. Silently
 * dropping an unmapped bucket would under-count the site and look fine.
 */
const unmapped = hub.buckets
  .map((b) => b.id)
  .filter((id) => !mapped.has(id) && !excluded.has(id))
  .filter((id) => live.some((c) => c.bucket === id))
if (unmapped.length > 0) {
  die(
    `hub bucket(s) not assigned to any shelf: ${unmapped.join(', ')}. ` +
      `Add them to a shelf's "buckets" in src/data/course-shelves.json, ` +
      `or to "excludedBuckets" if they should stay off the site.`
  )
}

const counts = new Map(
  config.shelves.map((s) => [s.id, live.filter((c) => s.buckets.includes(c.bucket)).length])
)
const total = [...counts.values()].reduce((a, b) => a + b, 0)
const previousTotal = config.shelves.reduce((n, s) => n + s.liveCount, 0)

if (previousTotal > 0 && total < previousTotal * SHRINK_FLOOR) {
  die(`live total fell from ${previousTotal} to ${total} - that is a broken feed, not a smaller library`)
}

if (verifySites) {
  console.log(`sync-course-counts: checking ${live.length} course sites...`)
  const bad = []
  const queue = [...live]
  await Promise.all(
    Array.from({ length: 12 }, async () => {
      while (queue.length) {
        const c = queue.pop()
        const url = `https://phoebefu6.github.io/${c.slug}/`
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
          const body = await res.text()
          // A 200 that serves a stub is still a dead course.
          if (!res.ok || body.length < 3000) bad.push(`${c.slug} (HTTP ${res.status}, ${body.length} bytes)`)
        } catch (e) {
          bad.push(`${c.slug} (${e.message})`)
        }
      }
    })
  )
  if (bad.length > 0) die(`${bad.length} course site(s) are not live:\n  ${bad.join('\n  ')}`)
  console.log(`sync-course-counts: all ${live.length} course sites live`)
}

let changed = false
for (const shelf of config.shelves) {
  const next = counts.get(shelf.id)
  if (shelf.liveCount !== next) {
    console.log(`  ${shelf.name}: ${shelf.liveCount} -> ${next}`)
    shelf.liveCount = next
    changed = true
  }
}

const excludedCount = live.filter((c) => excluded.has(c.bucket)).length
console.log(
  `sync-course-counts: ${total} live courses across ${config.shelves.length} shelves ` +
    `(${excludedCount} excluded: ${[...excluded].join(', ')})`
)

if (!changed) {
  console.log('sync-course-counts: already up to date')
  process.exit(0)
}

if (checkOnly) {
  console.error(`sync-course-counts: counts are stale (file says ${previousTotal}, hub says ${total})`)
  console.error('sync-course-counts: run `npm run sync:courses` and commit the result')
  process.exit(1)
}

config.generatedAt = new Date().toISOString()
await writeFile(CONFIG, `${JSON.stringify(config, null, 2)}\n`)
console.log(`sync-course-counts: wrote ${CONFIG}`)
