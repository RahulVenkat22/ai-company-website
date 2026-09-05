/**
 * Renders tools/video/scene.html frame by frame in headless Chrome and encodes
 * the brand backdrop videos + poster into public/videos/.
 *
 *   node tools/video/render.mjs preview   -> tools/video/out/preview-sheet.jpg
 *   node tools/video/render.mjs full      -> public/videos/backdrop-1280.mp4,
 *                                            backdrop-854.mp4, backdrop-poster.jpg
 *
 * Needs playwright + ffmpeg-static available in node_modules (install them
 * with `npm i playwright ffmpeg-static --no-save`, then `npm prune`).
 * Encoding is ALL-INTRA (-g 1 -bf 0): every frame is a keyframe, so a
 * currentTime seek decodes exactly one frame. That is what keeps scroll
 * scrubbing smooth. Never replace these files with normally encoded exports.
 */
import { chromium } from 'playwright'
import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const mode = process.argv[2] || 'preview'
const outDir = path.join(here, 'out')
const frames = path.join(outDir, 'frames')
rmSync(frames, { recursive: true, force: true })
mkdirSync(frames, { recursive: true })

const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 })
await page.goto('file://' + path.join(here, 'scene.html'))
const total = await page.evaluate(() => window.FRAMES)

const list =
  mode === 'preview'
    ? [0, 0.2, 0.4, 0.6, 0.8, 1].map((f) => Math.min(total - 1, Math.round(f * (total - 1))))
    : Array.from({ length: total }, (_, i) => i)

let n = 0
for (const i of list) {
  await page.evaluate((i) => window.renderFrame(i), i)
  const name = mode === 'preview' ? `prev-${n}.png` : `${String(i).padStart(4, '0')}.png`
  await page.screenshot({ path: path.join(frames, name), clip: { x: 0, y: 0, width: 1600, height: 900 } })
  n++
  if (mode === 'full' && i % 48 === 0) console.log(`frame ${i}/${total}`)
}
await browser.close()

const ffmpeg = path.join(root, 'node_modules/ffmpeg-static/ffmpeg')
const run = (args) => {
  const r = spawnSync(ffmpeg, args, { stdio: 'inherit' })
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '))
}

if (mode === 'preview') {
  run(['-y', '-loglevel', 'error', '-framerate', '1', '-start_number', '0', '-i', path.join(frames, 'prev-%d.png'),
    '-vf', 'scale=533:-1,tile=3x2', '-frames:v', '1', '-q:v', '3', path.join(outDir, 'preview-sheet.jpg')])
  console.log('preview ->', path.join(outDir, 'preview-sheet.jpg'))
} else {
  const videos = path.join(root, 'public/videos')
  mkdirSync(videos, { recursive: true })
  const enc = (w, crf, out) =>
    run(['-y', '-loglevel', 'error', '-framerate', '24', '-i', path.join(frames, '%04d.png'),
      '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
      '-g', '1', '-bf', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out])
  const d1280 = path.join(videos, 'backdrop-1280.mp4')
  const d854 = path.join(videos, 'backdrop-854.mp4')
  enc(1280, 29, d1280)
  enc(854, 28, d854)
  const posterFrame = String(Math.round(total * 0.1)).padStart(4, '0')
  const poster = path.join(videos, 'backdrop-poster.jpg')
  run(['-y', '-loglevel', 'error', '-i', path.join(frames, `${posterFrame}.png`), '-vf', 'scale=1600:-2', '-q:v', '5', poster])
  for (const f of [d1280, d854, poster]) console.log(path.basename(f), (statSync(f).size / 1e6).toFixed(2), 'MB')
}
