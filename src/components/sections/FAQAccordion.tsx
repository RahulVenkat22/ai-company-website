import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * FAQ accordion: plain disclosure buttons (aria-expanded + region), one item
 * open at a time. Expand/collapse and the chevron turn are Framer Motion
 * state transitions; the open item shows its answer beside a small photo.
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
      'We work across OpenAI, Anthropic, Google Vertex AI, AWS Bedrock, Azure AI and open-source models, with orchestration through LangChain, LangGraph and MCP. The model is chosen for your problem, security posture and budget, never the other way around.',
    image: '/images/expertise/system-assembly.jpg',
  },
  {
    question: 'How do you handle security and data protection?',
    answer:
      'Security by design: access control, encryption, private deployments and audit trails are part of the first architecture diagram, not an afterthought. Your data is used only for your system and never to train shared models.',
    image: '/images/expertise/document-processing.jpg',
  },
  {
    question: 'Can you work with our existing team and systems?',
    answer:
      'Yes. Most engagements integrate with existing applications, data platforms and engineering teams. We slot in as a project team, a consulting partner or a dedicated extension of your own team.',
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
  const reduce = useReducedMotion()
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <Section id="faq" variant={variant} ariaLabel="Frequently asked questions">
      <SectionHeading title="Questions, answered" />

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
                  className="group flex w-full items-center gap-6 py-6 text-left md:gap-10"
                >
                  <span
                    className={`flex-1 text-h3 transition-colors ${
                      isOpen ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-btn border transition-colors duration-300 ${
                      isOpen
                        ? 'border-primary bg-primary text-ink-inverse'
                        : 'border-line-strong text-ink group-hover:border-ink/60'
                    }`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="overflow-hidden"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease }}
                  >
                    <div className="grid gap-6 pb-8 pr-2 md:grid-cols-[1.6fr_1fr] md:gap-12">
                      <p className="max-w-xl text-body text-ink-muted">{faq.answer}</p>
                      {faq.image && (
                        <img
                          src={faq.image}
                          alt=""
                          loading="lazy"
                          width={420}
                          height={180}
                          className="h-32 w-full rounded-card object-cover md:h-36"
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
