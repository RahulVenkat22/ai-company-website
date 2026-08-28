import { ArrowRight } from 'lucide-react'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { stories } from '@/data/stories'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
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
      name: 'Technology Stories',
      item: `${site.url}/technology-stories`,
    },
  ],
}

/** Arrow chain for a story's flow phases. */
function FlowChain({ phases, title }: { phases: string[]; title: string }) {
  return (
    <ol
      aria-label={`${title} — flow: ${phases.join(', then ')}`}
      className="flex flex-wrap items-center gap-y-2"
    >
      {phases.map((phase, i) => (
        <li key={phase} className="flex items-center">
          <span className="rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-caption font-semibold text-ink-muted">
            {phase}
          </span>
          {i < phases.length - 1 && (
            <ArrowRight className="mx-2 h-4 w-4 text-ink-subtle" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  )
}

function StoryBlock({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <h3 className="text-caption font-semibold uppercase tracking-[0.12em] text-accent">
        {label}
      </h3>
      <p className="mt-2 text-body text-ink-muted">{children}</p>
    </div>
  )
}

export default function TechnologyStories() {
  return (
    <>
      <Seo
        title="Technology Stories — From Problem to System"
        description="Illustrative engineering narratives showing how we take RAG platforms, AI agents, BI transformations and cloud-native AI systems from business problem to production."
        path="/technology-stories"
        jsonLd={jsonLd}
      />
      <PageHeader
        eyebrow="Technology Stories"
        title="How Problems Become Systems"
        lead="Illustrative engineering narratives — not client references. Each story shows the pattern we follow when a class of business problem becomes a production system. Approved client case studies will be published separately."
      />

      {stories.map((story, i) => (
        <Section
          key={story.slug}
          id={story.slug}
          variant={i % 2 === 0 ? 'default' : 'alt'}
        >
          <Reveal as="article" className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="primary">{story.category}</Badge>
              <Badge>Illustrative Technology Story</Badge>
            </div>
            <h2 className="mt-4 text-h2">{story.title}</h2>

            <div className="mt-6">
              <FlowChain phases={story.flow} title={story.title} />
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <StoryBlock label="Problem">{story.problem}</StoryBlock>
              <StoryBlock label="Approach">{story.approach}</StoryBlock>
            </div>

            <div className="mt-8">
              <StoryBlock label="Outcome">{story.outcome}</StoryBlock>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {story.technologies.map((tech) => (
                <Badge key={tech} tone="neutral">
                  {tech}
                </Badge>
              ))}
            </div>
          </Reveal>
        </Section>
      ))}

      <FinalCTA />
    </>
  )
}
