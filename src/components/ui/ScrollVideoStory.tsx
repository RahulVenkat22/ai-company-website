import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage scroll story: three robot videos pinned to the viewport behind
 * the page, revealed through the transparent "window" sections (Hero, both
 * ParallaxBands, FinalCTA — each tagged `data-video-window`). Page scroll
 * is split into three zones; crossing a boundary crossfades to that zone's
 * video.
 *
 * Zone boundaries are measured from where the window sections actually sit
 * (window i shows video min(i, 2)): each boundary is the midpoint of the
 * scroll stretch where the backdrop is fully covered by opaque content
 * between two windows, so the crossfade itself happens off-screen and a
 * cut is never visible. If the windows can't be found, boundaries fall
 * back to equal thirds of the page.
 *
 * Battery rules: only the active video plays, and everything pauses while
 * no window is on screen or the tab is hidden. A video resumes from where
 * it paused (element currentTime is preserved). Under
 * prefers-reduced-motion this renders only video 1, paused, as a static
 * first-frame backdrop — no autoplay, no fades.
 */

const VIDEOS = [
  '/videos/story-1.mp4', // camera pushing into robot head — the promise
  '/videos/story-2.mp4', // robot + hologram — building the solution
  '/videos/story-3.mp4', // robot working in factory — production
]

const FADE_SECONDS = 0.9

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
        // Backdrop is hidden from "window i fully scrolled past" until
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

    let active = zoneAt(window.scrollY)
    let windowsOnScreen = true

    const play = (video: HTMLVideoElement) => {
      void video.play().catch(() => {})
    }

    // Single source of truth for playback: the active video plays while a
    // window is on screen and the tab is visible; everything else pauses
    // once it is no longer mid-crossfade. Called from every event that can
    // change that state, so races between fades and scrolling self-heal.
    const syncPlayback = () => {
      videos.forEach((video, i) => {
        if (i === active) {
          if (windowsOnScreen && !document.hidden) {
            if (video.paused) play(video)
          } else {
            video.pause()
          }
        } else if (!video.paused && !gsap.isTweening(video)) {
          video.pause()
        }
      })
    }

    const ctx = gsap.context(() => {
      // Start on the zone the page is already scrolled to (no fade-in).
      videos.forEach((v, i) => gsap.set(v, { autoAlpha: i === active ? 1 : 0 }))
      play(videos[active])

      const applyZone = (zone: number) => {
        if (zone === active) return
        const from = videos[active]
        const to = videos[zone]
        active = zone
        // Any third video is out of both zones — hide and pause it now.
        videos.forEach((v) => {
          if (v !== from && v !== to) {
            gsap.set(v, { autoAlpha: 0 })
            v.pause()
          }
        })
        if (windowsOnScreen && !document.hidden) play(to)
        gsap.to(to, { autoAlpha: 1, duration: FADE_SECONDS, overwrite: 'auto' })
        gsap.to(from, {
          autoAlpha: 0,
          duration: FADE_SECONDS,
          overwrite: 'auto',
          // Keep it moving through the crossfade, then stop decoding.
          onComplete: syncPlayback,
        })
      }

      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => applyZone(zoneAt(self.scroll())),
        onRefresh: computeBounds,
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

    // Pause everything while no window section is on screen.
    const visibleWindows = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleWindows.add(entry.target)
        else visibleWindows.delete(entry.target)
      }
      windowsOnScreen = visibleWindows.size > 0
      syncPlayback()
    })
    windows.forEach((el) => io.observe(el))

    document.addEventListener('visibilitychange', syncPlayback)

    return () => {
      document.removeEventListener('visibilitychange', syncPlayback)
      io.disconnect()
      videos.forEach((v) => v.pause())
      ctx.revert()
    }
  }, [])

  if (motionOff) {
    // Static backdrop: first frame of video 1, never played.
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
          loop
          playsInline
          autoPlay={i === 0}
          preload={i === 0 ? 'auto' : 'metadata'}
          tabIndex={-1}
        />
      ))}
    </div>
  )
}
