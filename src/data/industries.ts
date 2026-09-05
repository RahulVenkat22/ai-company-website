/**
 * Industries (prompt.md §29).
 *
 * Wording is deliberately about how the technology ADAPTS to each industry:
 * never a claim of prior industry experience or client work (prompt.md §45).
 * Icons are mapped in the presenting component to keep this file pure data.
 */

export interface Industry {
  name: string
  /** One line on how our architectures adapt to this industry's constraints. */
  adapts: string
}

export const industries: Industry[] = [
  {
    name: 'Healthcare',
    adapts:
      'RAG and data platforms adapt to strict access control, auditability and document-heavy clinical workflows.',
  },
  {
    name: 'Finance',
    adapts:
      'Agentic workflows and analytics adapt to audit trails, approval gates and regulated decision processes.',
  },
  {
    name: 'Retail',
    adapts:
      'Data platforms and recommendation architectures adapt to multi-channel sales, stock and pricing data.',
  },
  {
    name: 'Manufacturing',
    adapts:
      'Predictive analytics and automation adapt to sensor data, production schedules and quality processes.',
  },
  {
    name: 'Logistics',
    adapts:
      'Cloud-native and event-driven architectures adapt to real-time tracking, routing and seasonal peaks.',
  },
  {
    name: 'Education',
    adapts:
      'AI assistants and analytics adapt to learning content, cohort reporting and student-data safeguards.',
  },
  {
    name: 'SaaS',
    adapts:
      'AI features, testing platforms and cloud architecture adapt to multi-tenant products and rapid release cycles.',
  },
  {
    name: 'Real Estate',
    adapts:
      'Document AI and analytics adapt to contract-heavy transactions, portfolio data and valuation workflows.',
  },
  {
    name: 'Professional Services',
    adapts:
      'Knowledge assistants and workflow automation adapt to engagement documents, time-driven operations and expertise retrieval.',
  },
  {
    name: 'E-commerce',
    adapts:
      'Recommendation engines and automation adapt to catalog data, order pipelines and customer-behavior signals.',
  },
]
