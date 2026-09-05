import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import backdrop from '@/config/backdrop.json'

/**
 * Homepage backdrop: the AI footage as a FRAME SEQUENCE drawn on a fixed
 * canvas, scrubbed by scroll. Page progress (top until the site footer
 * enters) maps onto a frame index through a GSAP ScrollTrigger with a short
 * catch-up (`scrub: 0.6`), so wheel steps glide instead of jumping; each
 * ticker tick draws the two nearest frames cross-blended by the fractional
 * position. No <video> element and no decoder on the scroll path: a
 * memory-bounded window of ImageBitmaps is decoded off-thread around the
 * playhead and drawn as pure blits, so response is instant in both
 * directions.
 *
 * Frames come from tools/video/encode.mjs (public/videos/frames/<set>/,
 * manifest in src/config/backdrop.json: count, padding, start index,
 * version). They load in interleaved passes (every 8th frame first, then
 * the 4ths, 2nds, rest), with frames around the current playhead pulled
 * forward, so scrubbing works within a second on a coarse set. The
 * portrait mobile set is chosen by orientation and re-chosen on rotation.
 * A poster sits underneath; the canvas fades in after its first real paint
 * and the poster is then hidden. Poster only under prefers-reduced-motion,
 * prefers-reduced-data or a data-saver / 2G connection.
 */

interface FrameSet {
  dir: string
  width: number
  height: number
}
interface Manifest {
  frames: number
  fps: number
  ext: string
  pad: number
  start: number
  version: string
  poster: string
  desktop: FrameSet
  mobile: FrameSet
}
const manifest = backdrop as Manifest
const withVersion = (url: string) => `${url}?v=${manifest.version}`
export const STORY_POSTER = withVersion(manifest.poster)

const PORTRAIT = '(orientation: portrait)'
const pickSet = (): FrameSet =>
  typeof window !== 'undefined' && window.matchMedia(PORTRAIT).matches ? manifest.mobile : manifest.desktop

/** Poster only for visitors who asked for less motion or less data. */
function backdropOff(): boolean {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return true
  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return true
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection
  return !!conn && (conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType ?? ''))
}

/** Frame indices ordered by interleaved passes (8ths, 4ths, 2nds, rest). */
function loadOrder(n: number): number[] {
  const order: number[] = []
  const seen = new Uint8Array(n)
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) {
      if (!seen[i]) {
        seen[i] = 1
        order.push(i)
      }
    }
  }
  return order
}

export function ScrollVideoStory() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)
  const [off] = useState(() => backdropOff())
  const [set, setSet] = useState<FrameSet>(pickSet)

  // Re-pick the frame set when the device rotates.
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT)
    const onChange = (e: MediaQueryListEvent) => setSet(e.matches ? manifest.mobile : manifest.desktop)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const poster = posterRef.current
    if (!root || !canvas || off) return
    const N = manifest.frames
    if (!(N > 0) || !(set.width > 0) || !(set.height > 0)) return
    const ctx2d = canvas.getContext('2d', { alpha: false })
    if (!ctx2d) return

    const src = (i: number) =>
      withVersion(`${set.dir}/${String(i + manifest.start).padStart(manifest.pad, '0')}.${manifest.ext}`)
    const images: Array<HTMLImageElement | null> = new Array<HTMLImageElement | null>(N).fill(null)
    const loaded = new Uint8Array(N)
    const queued = new Uint8Array(N)
    const state = { frame: 0 }
    const clamp = gsap.utils.clamp(0, N - 1)
    let cancelled = false

    // Context first, so every tween (including the reveal) is reverted on unmount.
    const ctx = gsap.context(() => {}, root)
    // A fresh set (first mount or rotation) starts from the poster again.
    ctx.add(() => gsap.set(canvas, { autoAlpha: 0 }))
    if (poster) poster.style.visibility = ''

    // ---- drawing ----
    let cw = 0
    let ch = 0
    let drawRect = { x: 0, y: 0, w: 0, h: 0 }
    let drawn = -1
    let dirty = true
    let revealed = false
    let settled = 0
    const firstPass = Math.ceil(N / 8)

    const reveal = () => {
      revealed = true
      ctx.add(() =>
        gsap.to(canvas, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            if (poster) poster.style.visibility = 'hidden'
          },
        }),
      )
    }
    const nearestLoaded = (i: number) => {
      if (loaded[i]) return i
      for (let d = 1; d < N; d++) {
        if (i - d >= 0 && loaded[i - d]) return i - d
        if (i + d < N && loaded[i + d]) return i + d
      }
      return -1
    }
    // Decoded ImageBitmaps for a window around the playhead (memory-bounded:
    // about 64 MB of RGBA), created off-thread nearest-first, at most three
    // at a time. draw() blits these; the compressed image is the fallback.
    const bitmaps: Array<ImageBitmap | null> = new Array<ImageBitmap | null>(N).fill(null)
    const pendingBitmap = new Uint8Array(N)
    const WINDOW = Math.max(6, Math.min(24, Math.floor(64e6 / (set.width * set.height * 4))))
    let bitmapJobs = 0
    let lastCenter = -1
    const canBitmap = typeof createImageBitmap === 'function'
    const fillWindow = (center: number) => {
      if (!canBitmap) return
      if (center !== lastCenter) {
        lastCenter = center
        for (let i = 0; i < N; i++) {
          if (bitmaps[i] && Math.abs(i - center) > WINDOW) {
            bitmaps[i]!.close()
            bitmaps[i] = null
          }
        }
      }
      for (let d = 0; d <= WINDOW && bitmapJobs < 3; d++) {
        for (const i of [center + d, center - d]) {
          if (i < 0 || i >= N || bitmaps[i] || pendingBitmap[i] || !loaded[i] || bitmapJobs >= 3) continue
          pendingBitmap[i] = 1
          bitmapJobs++
          createImageBitmap(images[i]!).then(
            (bm) => {
              bitmapJobs--
              pendingBitmap[i] = 0
              if (cancelled || Math.abs(i - lastCenter) > WINDOW) {
                bm.close()
                return
              }
              bitmaps[i] = bm
              if (Math.abs(i - state.frame) <= 1) dirty = true
              fillWindow(lastCenter)
            },
            () => {
              bitmapJobs--
              pendingBitmap[i] = 0
            },
          )
        }
      }
    }
    const source = (i: number): CanvasImageSource => bitmaps[i] ?? images[i]!
    const draw = () => {
      const p = clamp(state.frame)
      const key = Math.round(p * 64)
      if (!dirty && key === drawn) return
      const i0 = Math.floor(p)
      const i1 = Math.min(N - 1, i0 + 1)
      const a = nearestLoaded(i0)
      if (a < 0) return
      const b = loaded[i1] && i1 !== a ? i1 : -1
      const frac = b >= 0 ? Math.min(1, Math.max(0, (p - a) / (b - a))) : 0
      ctx2d.globalAlpha = 1
      ctx2d.drawImage(source(a), drawRect.x, drawRect.y, drawRect.w, drawRect.h)
      if (b >= 0 && frac > 0.02) {
        ctx2d.globalAlpha = frac
        ctx2d.drawImage(source(b), drawRect.x, drawRect.y, drawRect.w, drawRect.h)
        ctx2d.globalAlpha = 1
      }
      drawn = key
      dirty = false
      if (!revealed && (loaded[i0] || settled >= firstPass)) reveal()
      fillWindow(i0)
    }

    // ---- sizing (cover); backing store never exceeds what the source can fill ----
    const resize = () => {
      const vw = root.clientWidth || window.innerWidth
      const vh = root.clientHeight || window.innerHeight
      const fit = Math.min(set.width / vw, set.height / vh)
      const dpr = Math.max(0.5, Math.min(window.devicePixelRatio || 1, 1.5, fit))
      const nw = Math.round(vw * dpr)
      const nh = Math.round(vh * dpr)
      if (nw === cw && nh === ch) return
      cw = nw
      ch = nh
      canvas.width = cw
      canvas.height = ch
      const scale = Math.max(cw / set.width, ch / set.height)
      const w = set.width * scale
      const h = set.height * scale
      drawRect = { x: (cw - w) / 2, y: (ch - h) / 2, w, h }
      dirty = true
      draw() // same task as the reallocation: no black frame
    }
    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(root)

    // ---- progressive loading: playhead neighbourhood first, then interleaved passes ----
    let failed = 0
    const order = loadOrder(N)
    let next = 0
    const inflight = new Set<HTMLImageElement>()
    const nextIndex = () => {
      const c = Math.round(clamp(state.frame))
      for (let d = 0; d <= 8; d++) {
        for (const i of [c + d, c - d]) if (i >= 0 && i < N && !queued[i]) return i
      }
      while (next < order.length && queued[order[next]]) next++
      return next < order.length ? order[next++] : -1
    }
    const pump = () => {
      if (cancelled) return
      const i = nextIndex()
      if (i < 0) return
      queued[i] = 1
      const img = new Image()
      ;(img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = settled < firstPass ? 'high' : 'low'
      inflight.add(img)
      // Frames stay compressed until they enter the bitmap window; decoding
      // everything on arrival would compete with scrolling for no benefit.
      const ready = new Promise<void>((res, rej) => {
        img.onload = () => res()
        img.onerror = () => rej(new Error('load'))
      })
      img.src = src(i)
      ready.then(
        () => {
          inflight.delete(img)
          if (cancelled) return
          images[i] = img
          loaded[i] = 1
          settled++
          failed = 0
          if (Math.abs(i - state.frame) <= 8) {
            dirty = true
            fillWindow(Math.round(clamp(state.frame)))
          }
          pump()
        },
        () => {
          inflight.delete(img)
          if (cancelled) return
          failed++
          // A broken set (deploy without frames): stop early, keep the poster.
          if (failed >= 12 && settled === 0) {
            cancelled = true
            return
          }
          pump()
        },
      )
    }
    for (let k = 0; k < 6; k++) pump()

    // ---- scroll mapping ----
    const endScroll = () => {
      const footer = document.querySelector<HTMLElement>('main ~ footer')
      const footerTop = footer
        ? footer.getBoundingClientRect().top + window.scrollY
        : ScrollTrigger.maxScroll(window) + window.innerHeight
      return Math.max(1, Math.min(ScrollTrigger.maxScroll(window), footerTop - window.innerHeight))
    }
    ctx.add(() => {
      gsap.to(state, {
        frame: N - 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: endScroll, scrub: 0.6, invalidateOnRefresh: true },
      })
      // Slow push-in across the whole page: the backdrop's parallax drift.
      gsap.fromTo(
        root,
        { scale: 1 },
        {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: { start: 0, end: () => ScrollTrigger.maxScroll(window), scrub: true },
        },
      )
    })
    gsap.ticker.add(draw)

    return () => {
      cancelled = true
      inflight.forEach((img) => {
        img.onload = null
        img.onerror = null
        img.src = ''
      })
      inflight.clear()
      bitmaps.forEach((bm) => bm?.close())
      ro.disconnect()
      gsap.ticker.remove(draw)
      ctx.revert()
    }
  }, [set, off])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh will-change-transform"
      aria-hidden="true"
    >
      <img
        ref={posterRef}
        src={STORY_POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
      {!off && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0" />}
      {/* Light wash so the footage reads as backdrop, not content. */}
      <div className="absolute inset-0 bg-scene/20" />
    </div>
  )
}
