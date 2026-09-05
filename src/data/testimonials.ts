/**
 * Customer reviews (prompt.md 44, 45).
 *
 * ILLUSTRATIVE PLACEHOLDERS. These quotes and people are not real customers.
 * Replace with real, permitted quotes (name, role, company, written consent)
 * before launch. Reviews are text only: no portraits are shown.
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'They questioned our brief before writing a line of code, and the architecture they proposed is the reason the assistant survived its first audit.',
    name: 'Ilse Vandermeer',
    role: 'Head of Clinical Systems, regional healthcare provider (illustrative)',
  },
  {
    quote:
      'The agents run our reconciliation every night. What impressed us was the evaluation harness they insisted on shipping alongside them.',
    name: 'Tomasz Okafor-Lind',
    role: 'Director of Finance Operations, logistics group (illustrative)',
  },
  {
    quote:
      'One team took us from a spreadsheet estate to a governed data platform with dashboards our board actually opens.',
    name: 'Priyanka Raghunathan',
    role: 'Chief Data Officer, retail bank (illustrative)',
  },
  {
    quote:
      'We expected a vendor and got engineers who argued with us about scope. Every one of those arguments made the system simpler.',
    name: 'Marcus Ferreira',
    role: 'VP Engineering, enterprise software company (illustrative)',
  },
  {
    quote:
      'The knowledge assistant answers with citations, so our support agents trust it. Adoption happened without a single mandate from management.',
    name: 'Hannah Okonkwo',
    role: 'Head of Customer Support, insurance provider (illustrative)',
  },
  {
    quote:
      'They designed the cloud platform so our own team could run it. The handover was the cleanest I have seen in my career.',
    name: 'Daniel Lindqvist',
    role: 'Chief Technology Officer, industrial manufacturer (illustrative)',
  },
  {
    quote:
      'Forecasting used to be a monthly argument about whose numbers were right. Now every metric has one definition and the meetings are about decisions.',
    name: 'Aisha Rahman',
    role: 'Director of Analytics, online marketplace (illustrative)',
  },
  {
    quote:
      'Document processing that respects our access controls sounded like a compromise. They delivered it without one.',
    name: 'Jonas Weber',
    role: 'Head of Legal Operations, professional services firm (illustrative)',
  },
  {
    quote:
      'The workflow agents handle the routine cases and escalate the rest with full context. Our people finally work on the exceptions.',
    name: 'Carmen Delgado',
    role: 'Chief Operating Officer, fulfilment company (illustrative)',
  },
  {
    quote:
      'Their architecture review found the decisions that would have hurt us at scale, before we had written the code that depended on them.',
    name: 'Nikhil Bhattacharya',
    role: 'Chief Product Officer, fintech startup (illustrative)',
  },
  {
    quote:
      'Pipelines with tests, lineage and alerts. The platform tells us when something breaks before a dashboard goes wrong.',
    name: 'Sofia Marchetti',
    role: 'Head of Data Engineering, energy utility (illustrative)',
  },
  {
    quote:
      'Security was treated as a requirement from the first workshop, which made our internal review the shortest we have ever run.',
    name: 'Owen Gallagher',
    role: 'IT Director, public sector agency (illustrative)',
  },
  {
    quote:
      'They shipped the application, then stayed to watch how people used it and kept improving it. That is rare.',
    name: 'Mei-Ling Chen',
    role: 'Head of Product, healthtech scale-up (illustrative)',
  },
  {
    quote:
      'The test automation they built runs on every release and catches what our manual cycles used to miss.',
    name: 'Rafael Souza',
    role: 'Head of Quality Engineering, telecom operator (illustrative)',
  },
  {
    quote:
      'We came with a vague idea about AI and left with a working system, a clear roadmap and a team that understood our business.',
    name: 'Elena Petrova',
    role: 'Director of Digital Transformation, retail chain (illustrative)',
  },
]
