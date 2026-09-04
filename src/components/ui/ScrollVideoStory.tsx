import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage scroll story: three robot videos pinned to the viewport behind
 * the page. Playback is DRIVEN by scroll — each zone of the page maps
 * onto one video's timeline, so scrolling down advances the footage,
 * scrolling up rewinds it, and the playhead always tracks the scroll
 * position. When scrolling stops, the playhead settles and holds.
 *
 * The backdrop is visible everywhere: fully through the window sections
 * (Hero, both ParallaxBands, FinalCTA — tagged `data-video-window`) and
 * dimly through the `.story-glass` content wrappers in Home.tsx. A wash
 * div here keeps the footage dark enough for the glass to stay legible.
 *
 * Zone boundaries are measured from where the window sections actually sit
 * (window i shows video min(i, 2)), at the midpoint of the covered stretch
 * between windows, falling back to equal thirds if the windows can't be
 * found. Crossing a boundary crossfades to the next video.
 *
 * Scrolling DOWN is chased with real playback: the active video plays at
 * a rate proportional to how far behind the scroll target it is, so the
 * decoder renders every frame in order — visibly smoother than stepped
 * seeks. Scrolling up (and any large jump) falls back to eased seeks.
 * When scrolling stops the playhead settles and pauses, so an idle page
 * decodes nothing. Under prefers-reduced-motion this renders only
 * video 1, paused, as a static first-frame backdrop — no scrubbing, no
 * fades.
 */

const VIDEOS = [
  '/videos/story-1.mp4', // camera pushing into robot head — the promise
  '/videos/story-2.mp4', // robot + hologram — building the solution
  '/videos/story-3.mp4', // robot working in factory — production
]

const FADE_SECONDS = 0.9

/**
 * Per-tick easing toward the target frame when SEEKING (rewinds and big
 * jumps). The story files are encoded all-intra (`ffmpeg -g 1 -bf 0`) so
 * every frame is a keyframe and each seek decodes exactly one frame —
 * that encoding, not this constant, is what keeps seeks cheap; don't
 * replace the videos with normally encoded ones.
 */
const SEEK_EASE = 0.22

/** Within this many seconds of the target, seek exactly once and settle. */
const SEEK_SNAP = 0.1

/**
 * Forward gaps up to this many seconds are closed by PLAYING the video —
 * ordered decode renders far smoother than discrete seeks. Anything
 * larger lands in one exact seek instead of racing to catch up.
 */
const CHASE_MAX = 1.5

/** playbackRate = gap × gain: ~3 closes the gap in about a third of a
 * second, tracking the scroll closely without visible rubber-banding. */
const CHASE_GAIN = 3

/** Browsers reject playbackRate below ~0.0625; clamp inside that. */
const RATE_MIN = 0.07
const RATE_MAX = 8

export function ScrollVideoStory() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [motionOff] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const videos = Array.from(root.querySelectorAll('video'))
    if (videos.length !== VIDEOS.length) return

    const windows = Array.from(
      document.querySelectorAll<HTMLElement>('[data-video-window]'),
    )
    /** Video shown through the i-th window, top to bottom. */
    const videoFor = (i: number) => Math.min(i, VIDEOS.length - 1)
    const docTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY

    // scrollY thresholds between zones, ascending.
    let bounds: number[] = []
    const computeBounds = () => {
      const next: number[] = []
      for (let i = 0; i < windows.length - 1; i++) {
        if (videoFor(i) === videoFor(i + 1)) continue
        // Backdrop is fully covered from "window i scrolled past" until
        // "window i+1 enters the viewport" — fade at the midpoint.
        const covered = docTop(windows[i]) + windows[i].offsetHeight
        const entering = docTop(windows[i + 1]) - window.innerHeight
        next.push((covered + entering) / 2)
      }
      const max = ScrollTrigger.maxScroll(window)
      bounds =
        next.length === VIDEOS.length - 1 ? next : [max / 3, (2 * max) / 3]
    }
    computeBounds()

    const zoneAt = (scrollY: number) =>
      bounds.reduce((zone, b) => (scrollY > b ? zone + 1 : zone), 0)

    // Scroll-derived timeline position (0..1) per video. A video before its
    // zone rests on its first frame, after its zone on its last, so
    // re-entering a zone from either direction is continuous.
    const targets = VIDEOS.map(() => 0)
    const updateTargets = (y: number) => {
      const max = Math.max(1, ScrollTrigger.maxScroll(window))
      const edges = [0, ...bounds, max]
      for (let i = 0; i < videos.length; i++) {
        const start = edges[i]
        const end = Math.max(edges[i + 1], start + 1)
        targets[i] = Math.min(1, Math.max(0, (y - start) / (end - start)))
      }
    }
    updateTargets(window.scrollY)

    let active = zoneAt(window.scrollY)

    const ctx = gsap.context(() => {
      // Start on the zone the page is already scrolled to (no fade-in).
      videos.forEach((v, i) => gsap.set(v, { autoAlpha: i === active ? 1 : 0 }))

      const applyZone = (zone: number) => {
        if (zone === active) return
        const from = videos[active]
        const to = videos[zone]
        active = zone
        if (!from.paused) from.pause()
        videos.forEach((v) => {
          if (v !== from && v !== to) gsap.set(v, { autoAlpha: 0 })
        })
        // One jump-seek onto the incoming video's scroll frame before it
        // fades in; from here the tick loop scrubs it as the active video.
        if (to.duration && !to.seeking) {
          to.currentTime = targets[zone] * (to.duration - 0.06)
        }
        gsap.to(to, { autoAlpha: 1, duration: FADE_SECONDS, overwrite: 'auto' })
        gsap.to(from, { autoAlpha: 0, duration: FADE_SECONDS, overwrite: 'auto' })
      }

      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => {
          const y = self.scroll()
          applyZone(zoneAt(y))
          updateTargets(y)
        },
        onRefresh: (self) => {
          computeBounds()
          updateTargets(self.scroll())
        },
      })

      // Slow push-in across the whole page — the backdrop's parallax drift.
      gsap.fromTo(
        root,
        { scale: 1 },
        {
          scale: 1.07,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: () => ScrollTrigger.maxScroll(window),
            scrub: true,
          },
        },
      )
    }, root)

    // Scrub loop for ONLY the visible video (hidden videos get a single
    // jump-seek in applyZone instead). Forward motion within CHASE_MAX is
    // closed by playing the video at a proportional rate — the decoder
    // renders frames in order, which looks far smoother than stepped
    // seeks. Rewinds and large jumps seek (gated so a new seek never
    // interrupts a pending one). At rest everything pauses: an idle page
    // decodes nothing.
    const pauseVideo = (v: HTMLVideoElement) => {
      if (!v.paused) v.pause()
    }
    const tick = () => {
      const video = videos[active]
      const duration = video.duration
      if (!duration || video.readyState < 2) return
      const target = targets[active] * (duration - 0.06)
      const delta = target - video.currentTime

      // On target: settle and idle.
      if (Math.abs(delta) <= 0.02) {
        pauseVideo(video)
        return
      }

      // Scrolling down, modest gap → chase with real playback.
      if (delta > 0 && delta <= CHASE_MAX && delta * CHASE_GAIN >= RATE_MIN) {
        video.playbackRate = Math.min(RATE_MAX, delta * CHASE_GAIN)
        if (video.paused) video.play().catch(() => pauseVideo(video))
        return
      }

      // Rewind or big jump → seek.
      pauseVideo(video)
      if (video.seeking) return
      video.currentTime =
        Math.abs(delta) <= SEEK_SNAP || Math.abs(delta) > CHASE_MAX
          ? target
          : video.currentTime + delta * SEEK_EASE
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      videos.forEach(pauseVideo)
      ctx.revert()
    }
  }, [])

  if (motionOff) {
    // Static backdrop: first frame of video 1, never advanced.
    return (
      <div
        ref={rootRef}
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEOS[0]}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-[#0A0A0B]/35" />
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 -z-10 will-change-transform"
      aria-hidden="true"
    >
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === 0 ? 1 : 0 }}
          src={src}
          muted
          playsInline
          // Scrubbing needs the whole file buffered, or seeks stall.
          preload="auto"
          tabIndex={-1}
        />
      ))}
      {/* Permanent wash so the footage reads as backdrop, not content. */}
      <div className="absolute inset-0 bg-[#0A0A0B]/35" />
    </div>
  )
}
