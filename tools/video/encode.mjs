/**
 * Encode one or more source clips (stock footage, client uploads, generator
 * output) into the site's scroll-scrubbed backdrop set:
 *
 *   node tools/video/encode.mjs <clipA.mp4> [--grade G] [--sat 0..1] [--trim start:dur]
 *                            [-- <clipB.mp4> [--grade G] [--sat 0..1] [--trim start:dur]] ...
 *                            [--xfade <seconds>] [--crf <n>]
 *
 * Segments are separated by a bare `--`; each keeps its own grade, saturation
 * and trim. Several segments are joined with an ffmpeg crossfade (default 1s)
 * into ONE continuous clip, so the scroll position maps onto a single timeline.
 *
 * Writes public/videos/backdrop-1280.mp4, backdrop-854.mp4 and
 * backdrop-poster.jpg. Output is 24fps ALL-INTRA H.264 (-g 1 -bf 0): every
 * frame is a keyframe, so a currentTime seek decodes exactly one frame. That
 * encoding is what keeps scroll scrubbing smooth; never replace these files
 * with normally encoded exports.
 *
 * Grades pull arbitrary footage toward the graphite + signal-orange system:
 *   none       leave colours as shot
 *   muted      ~45% saturation, warm shadows, slightly darker (default)
 *   mono-warm  monochrome, neutral shadows, warm highlights (any palette fits)
 *   graphite   20% saturation, cool shadows, warm highlights, deeper blacks
 *   neural     ~70% saturation, brown/red shadows cooled to graphite, warm glows kept
 * `--sat` overrides the saturation of the chosen grade.
 *
 * Needs ffmpeg-static in node_modules (`npm i ffmpeg-static --no-save`, then
 * `npm prune` when done).
 */
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const W = 1280
const H = 720

const GRADES = {
  none: '',
  muted:
    'hue=s=0.45,colorbalance=rs=0.05:gs=0.0:bs=-0.06:rm=0.04:gm=0.0:bm=-0.05,eq=contrast=1.06:brightness=-0.02',
  'mono-warm':
    'hue=s=0,colorbalance=rs=0.01:gs=0.0:bs=0.03:rm=0.03:gm=0.0:bm=-0.02:rh=0.09:gh=0.03:bh=-0.06,eq=contrast=1.08:brightness=-0.03',
  graphite:
    'hue=s=0.2,colorbalance=rs=-0.02:gs=0.0:bs=0.04:rm=0.02:gm=0.0:bm=0.0:rh=0.07:gh=0.02:bh=-0.05,eq=contrast=1.1:brightness=-0.04',
  neural:
    'hue=s=0.7,colorbalance=rs=-0.07:gs=0.0:bs=0.08:rm=-0.04:gm=0.0:bm=0.04:rh=0.03:gh=0.0:bh=-0.03,eq=contrast=1.08:brightness=-0.04',
}

/* ---------- argument parsing: segments split on bare `--` ---------- */
const argv = process.argv.slice(2)
if (!argv.length || argv[0].startsWith('--')) {
  console.error('usage: node tools/video/encode.mjs <clip.mp4> [--grade G] [--sat s] [--trim a:b] [-- <clip2.mp4> ...] [--xfade s] [--crf n]')
  process.exit(1)
}
const globalOpts = { xfade: 1, crf: 27 }
const segments = []
let cur = null
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--') { cur = null; continue }
  if (a === '--xfade') { globalOpts.xfade = Number(argv[++i]); continue }
  if (a === '--crf') { globalOpts.crf = Number(argv[++i]); continue }
  if (a.startsWith('--')) {
    if (!cur) { console.error(`option ${a} before any input`); process.exit(1) }
    cur[a.slice(2)] = argv[++i]
    continue
  }
  cur = { input: a, grade: 'muted', sat: null, trim: null }
  segments.push(cur)
}
for (const s of segments) {
  if (!(s.grade in GRADES)) { console.error(`unknown grade "${s.grade}" for ${s.input}`); process.exit(1) }
}

/* ---------- helpers ---------- */
const ffmpeg = path.join(root, 'node_modules/ffmpeg-static/ffmpeg')
const run = (args) => {
  const r = spawnSync(ffmpeg, args, { stdio: 'inherit' })
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '))
}
const duration = (file) => {
  const err = spawnSync(ffmpeg, ['-i', file], { encoding: 'utf8' }).stderr
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(err)
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : 0
}
const gradeChain = (s) => {
  const g = GRADES[s.grade]
  if (!g) return s.sat !== null ? `hue=s=${s.sat}` : ''
  return s.sat !== null ? g.replace(/hue=s=[\d.]+/, `hue=s=${s.sat}`) : g
}
const inputOpts = (s) => {
  if (!s.trim) return []
  const [start, length] = s.trim.split(':').map(Number)
  const o = []
  if (Number.isFinite(start)) o.push('-ss', String(start))
  if (Number.isFinite(length)) o.push('-t', String(length))
  return o
}

/* ---------- 1. grade + conform each segment to a 1280x720 24fps master ---------- */
const tmp = mkdtempSync(path.join(os.tmpdir(), 'backdrop-'))
const masters = segments.map((s, i) => {
  const out = path.join(tmp, `seg-${i}.mp4`)
  const vf = [gradeChain(s), 'fps=24', `scale=${W}:${H}:force_original_aspect_ratio=increase:flags=lanczos`, `crop=${W}:${H}`].filter(Boolean).join(',')
  console.log(`segment ${i}: ${path.basename(s.input)} (${duration(s.input).toFixed(2)}s) grade=${s.grade}${s.sat !== null ? ` sat=${s.sat}` : ''}${s.trim ? ` trim=${s.trim}` : ''}`)
  run(['-y', '-loglevel', 'error', ...inputOpts(s), '-i', s.input, '-vf', vf, '-c:v', 'libx264', '-preset', 'fast', '-crf', '12', '-pix_fmt', 'yuv420p', '-an', out])
  return out
})

/* ---------- 2. crossfade the masters into one continuous clip ---------- */
let master = masters[0]
if (masters.length > 1) {
  const durs = masters.map(duration)
  const inputs = masters.flatMap((m) => ['-i', m])
  let filter = ''
  let prev = '[0:v]'
  let offset = 0
  for (let i = 1; i < masters.length; i++) {
    offset += durs[i - 1] - globalOpts.xfade
    const label = i === masters.length - 1 ? '[v]' : `[x${i}]`
    filter += `${prev}[${i}:v]xfade=transition=fade:duration=${globalOpts.xfade}:offset=${offset.toFixed(3)}${label};`
    prev = label
  }
  master = path.join(tmp, 'master.mp4')
  run(['-y', '-loglevel', 'error', ...inputs, '-filter_complex', filter.slice(0, -1), '-map', '[v]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '12', '-pix_fmt', 'yuv420p', '-an', master])
}

/* ---------- 3. all-intra deliverables + poster ---------- */
const videos = path.join(root, 'public/videos')
mkdirSync(videos, { recursive: true })
const out1280 = path.join(videos, 'backdrop-1280.mp4')
const out854 = path.join(videos, 'backdrop-854.mp4')
const poster = path.join(videos, 'backdrop-poster.jpg')
const intra = (w, out, q) =>
  run(['-y', '-loglevel', 'error', '-i', master, '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libx264', '-preset', 'slow',
    '-crf', String(q), '-g', '1', '-bf', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out])
intra(1280, out1280, globalOpts.crf)
intra(854, out854, globalOpts.crf + 1)
const total = duration(master)
run(['-y', '-loglevel', 'error', '-ss', (total * 0.1).toFixed(2), '-i', master, '-frames:v', '1', '-vf', 'scale=1600:-2', '-q:v', '5', poster])
rmSync(tmp, { recursive: true, force: true })

console.log(`backdrop: ${total.toFixed(2)}s, ${segments.length} segment(s)`)
for (const f of [out1280, out854, poster]) console.log(path.basename(f), (statSync(f).size / 1e6).toFixed(2), 'MB')
