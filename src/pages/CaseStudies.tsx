import { useMemo, useState } from 'react'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { FinalCTA } from '@/components/sections/FinalCTA'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Case Studies',
      item: `${site.url}/case-studies`,
    },
  ],
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-accent">
        {label}
      </h3>
      <div className="mt-2 text-small leading-relaxed text-ink-muted">{children}</div>
    </div>
  )
}

/** Vertical mini-diagram for the ordered architecture layers. */
function ArchitectureStack({ layers, title }: { layers: string[]; title: string }) {
  return (
    <ol
      aria-label={`${title} — architecture, top to bottom`}
      className="relative flex flex-col gap-2 border-l border-line-strong pl-5"
    >
      {layers.map((layer, i) => (
        <li key={layer} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[26px] top-2 h-2 w-2 rounded-full bg-primary"
          />
          <span className="text-small text-ink-muted">
            <span className="mr-2 font-mono text-caption text-ink-subtle">
              {String(i + 1).padStart(2, '0')}
            </span>
            {layer}
          </span>
        </li>
      ))}
    </ol>
  )
}

function CaseStudyArticle({ cs }: { cs: CaseStudy }) {
  return (
    <Reveal as="article" id={cs.slug} className="scroll-mt-24">
      <Card className="p-6 sm:p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge tone="primary">{cs.category}</Badge>
          <Badge>Illustrative Project</Badge>
        </div>
        <h2 className="mt-4 text-h3">{cs.title}</h2>
        <p className="mt-1.5 text-small text-ink-subtle">{cs.sector}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-7">
            <DetailBlock label="Business challenge">
              <p>{cs.challenge}</p>
            </DetailBlock>
            <DetailBlock label="Existing problem">
              <p>{cs.existingProblem}</p>
            </DetailBlock>
            <DetailBlock label="Requirements">
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                {cs.requirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock label="Technical approach">
              <p>{cs.approach}</p>
            </DetailBlock>
          </div>

          <div className="flex flex-col gap-7">
            <DetailBlock label="Architecture">
              <ArchitectureStack layers={cs.architecture} title={cs.title} />
            </DetailBlock>
            <DetailBlock label="Technologies">
              <div className="flex flex-wrap gap-2">
                {cs.technologies.map((tech) => (
                  <Badge key={tech} tone="neutral">
                    {tech}
                  </Badge>
                ))}
              </div>
            </DetailBlock>
            <DetailBlock label="Implementation">
              <p>{cs.implementation}</p>
            </DetailBlock>
            <DetailBlock label="Security considerations">
              <p>{cs.security}</p>
            </DetailBlock>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <DetailBlock label="Business outcome">
            <p>{cs.outcome}</p>
          </DetailBlock>
        </div>
      </Card>
    </Reveal>
  )
}

export default function CaseStudies() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(caseStudies.map((cs) => cs.category)))],
    [],
  )
  const [active, setActive] = useState('All')

  const visible =
    active === 'All' ? caseStudies : caseStudies.filter((cs) => cs.category === active)

  return (
    <>
      <Seo
        title="Case Studies — Illustrative Projects"
        description="Illustrative engineering deep-dives across RAG, agentic AI, analytics, cloud migration, AI automation and test automation — challenge, architecture, technologies and outcome."
        path="/case-studies"
        jsonLd={jsonLd}
      />
      <PageHeader
        image="/images/team-meeting.jpg"
        eyebrow="Case Studies"
        title="Engineering Deep-Dives"
        lead="Illustrative projects that show how we take a business challenge through architecture, implementation and security to a production outcome. Real client case studies will be published here once provided and approved [TBD]."
      />

      <Section ariaLabel="Case studies" bleed>
        <Container>
          {/* Category filter */}
          <div
            role="group"
            aria-label="Filter case studies by category"
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const selected = active === cat
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-2.5 text-small font-medium transition-colors duration-200 ${
                    selected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-line text-ink-muted hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            Showing {visible.length} case {visible.length === 1 ? 'study' : 'studies'}
          </p>

          <div className="flex flex-col gap-8">
            {visible.map((cs) => (
              <CaseStudyArticle key={cs.slug} cs={cs} />
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA />
    </>
  )
}
