import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Editorial FAQ accordion: numbered serif questions with circular chevron
 * controls; the open item reveals its answer beside a small photograph.
 * Plain disclosure buttons (aria-expanded + hidden region), CSS-only
 * transitions, one item open at a time.
 */

interface FAQ {
  question: string
  answer: string
  image?: string
}

const DEFAULT_FAQS: FAQ[] = [
  {
    question: 'How does an engagement start?',
    answer:
      'With a short technical conversation, not a sales pitch. An engineer reviews your requirement, we discuss goals, data and constraints, and you receive a concrete proposal: architecture, scope, engagement model and next steps.',
    image: '/images/team-meeting.jpg',
  },
  {
    question: 'Which AI platforms and models do you work with?',
    answer:
      'We work across OpenAI, Anthropic, Google Vertex AI, AWS Bedrock, Azure AI and open-source models, with orchestration through LangChain, LangGraph and MCP. The model is chosen for your problem, security posture and budget — never the other way around.',
    image: '/images/expertise/generative-ai.jpg',
  },
  {
    question: 'How do you handle security and data protection?',
    answer:
      'Security by design: access control, encryption, private deployments and audit trails are part of the first architecture diagram, not an afterthought. Your data is used only for your system — never to train shared models.',
    image: '/images/expertise/document-processing.jpg',
  },
  {
    question: 'Can you work with our existing team and systems?',
    answer:
      'Yes — most engagements integrate with existing applications, data platforms and engineering teams. We slot in as a project team, a consulting partner or a dedicated extension of your own team.',
    image: '/images/team-laptop.jpg',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Production is the start, not the finish. Monitoring, evaluation, security updates and continuous improvement are available as an ongoing managed engagement, so the system keeps earning its place.',
    image: '/images/expertise/ai-workflows.jpg',
  },
]

export function FAQAccordion({
  faqs = DEFAULT_FAQS,
  variant = 'default',
}: {
  faqs?: FAQ[]
  variant?: 'default' | 'alt' | 'deep'
}) {
  const [open, setOpen] = useState<number>(0)

  return (
    <Section id="faq" variant={variant} ariaLabel="Frequently asked questions">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="accent-word">answered</span>
          </>
        }
      />

      <ul className="list-none border-t border-line">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          const panelId = `faq-panel-${i}`
          const buttonId = `faq-button-${i}`
          return (
            <Reveal as="li" key={faq.question} className="border-b border-line">
              <h3 className="text-body">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center gap-6 py-7 text-left md:gap-10"
                >
                  <span className="font-serif text-xl text-ink-subtle" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 font-serif text-[clamp(1.375rem,1.1rem+1.6vw,2.25rem)] leading-tight transition-colors ${
                      isOpen ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-primary text-ink-inverse'
                        : 'border border-ink/25 text-ink group-hover:border-ink'
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="grid gap-6 pb-8 pl-[3.25rem] pr-2 md:grid-cols-[1.6fr_1fr] md:gap-12 md:pl-[4.5rem]"
              >
                <p className="max-w-xl text-body text-ink-muted">{faq.answer}</p>
                {faq.image && (
                  <img
                    src={faq.image}
                    alt=""
                    loading="lazy"
                    width={420}
                    height={180}
                    className="h-32 w-full rounded-full object-cover md:h-36"
                  />
                )}
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
