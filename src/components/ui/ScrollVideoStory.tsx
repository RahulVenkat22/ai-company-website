import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage backdrop: ONE video (public/videos/backdrop-*.mp4, produced by
 * tools/video/encode.mjs from any source clip, or by tools/video/render.mjs
 * from the generator) pinned behind the whole page, its playhead DRIVEN by
 * scroll. Page progress from the top to where the footer enters
 * maps linearly onto the video's timeline: scrolling down assembles the
 * structure, scrolling up takes it apart, and when scrolling stops the
 * frame holds. It is visible everywhere: full-strength through the Hero
 * and the other window sections, dimmed through the `.story-glass`
 * content stretches.
 *
 * Forward motion is chased with real playback at a rate proportional to
 * the gap (ordered decode renders far smoother than stepped seeks);
 * rewinds and large jumps use eased seeks. The file is encoded all-intra
 * (every frame a keyframe) so a seek decodes exactly one frame; that
 * encoding, not this code, is what keeps scrubbing smooth. Do not replace
 * the videos with normally encoded exports (see tools/video/encode.mjs).
 *
 * A poster frame sits underneath and the video fades in once it has data.
 * Under prefers-reduced-motion only the poster renders.
 */

const SRC_DESKTOP = '/videos/backdrop-1280.mp4'
const SRC_MOBILE = '/videos/backdrop-854.mp4'
export const STORY_POSTER = '/videos/backdrop-poster.jpg'

/** Per-tick easing toward the target frame when SEEKING (rewinds, jumps). */
const SEEK_EASE = 0.22
/** Within this many seconds of the target, land exactly and settle. */
const SEEK_SNAP = 0.1
/** Forward gaps up to this many seconds are closed by playing the video. */
const CHASE_MAX = 1.5
/** playbackRate = gap x gain. */
const CHASE_GAIN = 3
const RATE_MIN = 0.07
const RATE_MAX = 8

export function ScrollVideoStory() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [motionOff] = useState(() => prefersReducedMotion())
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? SRC_MOBILE : SRC_DESKTOP,
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return
    const video = root.querySelector('video')
    if (!video) return

    // Scroll range the footage spans: page top until the footer enters.
    let endScroll = 1
    const computeRange = () => {
      const footer = document.querySelector<HTMLElement>('footer')
      const footerTop = footer
        ? footer.getBoundingClientRect().top + window.scrollY
        : ScrollTrigger.maxScroll(window) + window.innerHeight
      endScroll = Math.max(1, Math.min(ScrollTrigger.maxScroll(window), footerTop - window.innerHeight))
    }
    computeRange()

    let target = 0 // 0..1 progress along the video
    const updateTarget = (y: number) => {
      target = Math.min(1, Math.max(0, y / endScroll))
    }
    updateTarget(window.scrollY)

    const ctx = gsap.context(() => {
      // Fade the footage in over the poster once frames are decodable.
      const reveal = () => gsap.to(video, { autoAlpha: 1, duration: 0.9, ease: 'power2.out' })
      if (video.readyState >= 2) reveal()
      else video.addEventListener('loadeddata', reveal, { once: true })

      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => updateTarget(self.scroll()),
        onRefresh: (self) => {
          computeRange()
          updateTarget(self.scroll())
        },
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
    }, root)

    const pauseVideo = () => {
      if (!video.paused) video.pause()
    }
    const tick = () => {
      const duration = video.duration
      if (!duration || video.readyState < 2) return
      const want = target * (duration - 0.06)
      const delta = want - video.currentTime

      if (Math.abs(delta) <= 0.02) {
        pauseVideo()
        return
      }
      // Scrolling down, modest gap: chase with real playback.
      if (delta > 0 && delta <= CHASE_MAX && delta * CHASE_GAIN >= RATE_MIN) {
        video.playbackRate = Math.min(RATE_MAX, delta * CHASE_GAIN)
        if (video.paused) video.play().catch(pauseVideo)
        return
      }
      // Rewind or big jump: seek (never interrupt a pending seek).
      pauseVideo()
      if (video.seeking) return
      video.currentTime =
        Math.abs(delta) <= SEEK_SNAP || Math.abs(delta) > CHASE_MAX
          ? want
          : video.currentTime + delta * SEEK_EASE
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      pauseVideo()
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 -z-10 will-change-transform"
      aria-hidden="true"
    >
      <img
        src={STORY_POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
      />
      {!motionOff && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          src={src}
          muted
          playsInline
          // Scrubbing needs the whole file buffered, or seeks stall.
          preload="auto"
          tabIndex={-1}
        />
      )}
      {/* Light wash so the footage reads as backdrop, not content. */}
      <div className="absolute inset-0 bg-scene/20" />
    </div>
  )
}
