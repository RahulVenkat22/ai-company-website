import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { useParallax } from '@/lib/useParallax'

interface Reason {
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    title: 'AI-First Thinking',
    description:
      'We identify opportunities where AI can create meaningful business value. Just as importantly, we say clearly when a simpler system will serve you better.',
  },
  {
    title: 'Architecture Before Implementation',
    description:
      'We design the right solution before building it. Data flows, integration points and failure modes are worked out on paper while changing them is still cheap.',
  },
  {
    title: 'Data-Driven Engineering',
    description:
      'We transform fragmented data into useful intelligence. Governed models and single metric definitions come first, so every dashboard and AI feature stands on trusted ground.',
  },
  {
    title: 'Production Mindset',
    description:
      'We build solutions designed for real-world environments. Monitoring, error handling, evaluation and rollback paths are part of the build, not an afterthought.',
  },
  {
    title: 'Security by Design',
    description:
      'Security and data protection are considered throughout the lifecycle. Access control, encryption and audit trails are designed in from the first architecture diagram.',
  },
  {
    title: 'End-to-End Capability',
    description:
      'From AI and data to applications, cloud, testing and ongoing support. One team carries the work from problem statement to production and stays accountable after launch.',
  },
]

/**
 * Why-choose-us — the editorial "pinned background" pattern: the section is
 * a window onto a viewport-fixed photograph (bg-window + parallax) with the
 * serif heading sticky on the left while six numbered glass cards scroll
 * past on the right. Sticky is plain CSS; GSAP only scrubs the photo zoom.
 * Always rendered on dark, so text colors are explicit white.
 */
export function WhyChooseUs() {
  const layerRef = useParallax<HTMLDivElement>(0.25)

  return (
    <Section
      id="why-choose-us"
      bleed
      className="bg-window relative isolate overflow-hidden !py-0"
      ariaLabel="Why technology teams choose us"
    >
      <div
        ref={layerRef}
        className="parallax-layer -z-20"
        style={{ backgroundImage: 'url(/images/band-tech.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#130F0D]/85 via-[#130F0D]/60 to-[#130F0D]/45"
        aria-hidden="true"
      />

      <div className="container-site grid gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Sticky editorial intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal className="flex max-w-xl flex-col gap-5">
            <p className="inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.22em] text-white/70">
              <span className="h-px w-8 bg-[#FF5E1C]" aria-hidden="true" />
              Why choose us
            </p>
            <h2 className="text-h1 text-white">
              Why technology teams <span className="accent-word !text-[#FF5E1C]">choose us</span>
            </h2>
            <p className="max-w-lg text-body-lg text-white/80">
              Not a list of buzzwords — the working principles that shape how
              every engagement is scoped, architected and delivered.
            </p>
          </Reveal>
        </div>

        {/* Numbered glass cards */}
        <ul className="flex list-none flex-col gap-5">
          {reasons.map(({ title, description }, i) => (
            <Reveal as="li" key={title} delay={60}>
              <div className="rounded-card border border-white/15 bg-white/10 p-7 backdrop-blur-md md:p-8">
                <p className="font-serif text-2xl text-[#FF5E1C]">
                  {String(i + 1).padStart(2, '0')}.
                </p>
                <h3 className="mt-4 text-h3 text-white">{title}</h3>
                <p className="mt-3 text-small leading-relaxed text-white/75">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
