/**
 * Technology stories (prompt.md §27).
 *
 * Every story is illustrative: it describes a realistic engagement pattern
 * without naming clients, quoting metrics or implying past customer work
 * (credibility rules, prompt.md §45). The `flow` array holds the arrow
 * phases rendered as a mini chain in the UI.
 */

export interface TechnologyStory {
  slug: string
  title: string
  category: string
  /** Ordered phases rendered as an arrow chain, e.g. Problem → Architecture → … */
  flow: string[]
  problem: string
  approach: string
  technologies: string[]
  /** Qualitative only — no numbers, per credibility rules. */
  outcome: string
  illustrative: true
}

export const stories: TechnologyStory[] = [
  {
    slug: 'enterprise-rag-platform',
    title: 'Enterprise RAG Platform',
    category: 'AI / RAG',
    flow: ['Problem', 'Architecture', 'Technology', 'Result'],
    problem:
      'An organization holds years of institutional knowledge across wikis, contracts, policy documents and support tickets, but employees cannot find reliable answers. Keyword search returns stale or conflicting documents, and every answer has to be verified by a subject-matter expert before anyone will act on it.',
    approach:
      'We design retrieval as a pipeline, not a plugin: document ingestion with structure-aware chunking, hybrid retrieval that combines vector similarity with keyword and metadata filters, and a reranking stage before anything reaches the model. Answers are grounded in retrieved passages and returned with citations, and document-level permissions are enforced at query time so users only ever see what they are entitled to see. An evaluation harness scores retrieval quality and answer faithfulness on a curated question set before each release.',
    technologies: [
      'Python',
      'LangChain',
      'Vector database (pgvector / Pinecone class)',
      'Hybrid search + reranking',
      'OpenAI / Anthropic APIs',
      'FastAPI',
      'React',
    ],
    outcome:
      'Teams get a single, cited answer surface over previously scattered knowledge. Because every response links back to source passages and respects existing access control, the assistant can be trusted in regulated workflows rather than treated as a novelty.',
    illustrative: true,
  },
  {
    slug: 'business-intelligence-transformation',
    title: 'Business Intelligence Transformation',
    category: 'Data & Analytics',
    flow: ['Fragmented Data', 'Data Platform', 'BI', 'Decision Intelligence'],
    problem:
      'Operational data lives in a CRM, an ERP, spreadsheets and a handful of SaaS exports. Each department computes its own version of revenue and churn, so leadership meetings begin with an argument about whose numbers are right. Reporting is manual, monthly and already out of date when it lands.',
    approach:
      'We consolidate sources into a governed warehouse with ELT pipelines and a dimensional model, then define a semantic layer where each business metric has exactly one tested definition. Dashboards are built on top of that layer rather than on raw tables, and data quality checks run in the pipeline so a broken feed is caught before it reaches a chart. The final layer adds trend and anomaly views so the platform surfaces questions, not just totals.',
    technologies: [
      'Cloud data warehouse (Snowflake / BigQuery class)',
      'dbt',
      'Airflow-style orchestration',
      'Power BI',
      'SQL semantic layer',
      'Data quality testing',
    ],
    outcome:
      'The organization moves from arguing about numbers to acting on them. Metrics are consistent across departments, refreshes are automatic, and analysts spend their time on analysis instead of reconciling exports.',
    illustrative: true,
  },
  {
    slug: 'manual-workflow-to-ai-agent',
    title: 'Manual Workflow to AI Agent',
    category: 'Agentic AI',
    flow: ['Manual Process', 'Agentic Workflow', 'Automation', 'Outcome'],
    problem:
      'A back-office team processes a steady stream of inbound documents — orders, claims, requests — by reading each one, extracting fields into internal systems and routing edge cases to specialists. The work is repetitive, error-prone and scales only by hiring, yet it cannot simply be scripted because inputs are unstructured and exceptions are common.',
    approach:
      'We decompose the workflow into steps an agent can own: classify the document, extract structured fields with confidence scores, validate against business rules, then either complete the task through system APIs or escalate to a human with full context attached. The agent operates inside explicit guardrails — allowed tools, spending of retries, and hard rules for what always requires human sign-off. Every action is logged so the process stays auditable, and human corrections feed back into evaluation sets.',
    technologies: [
      'LLM tool use / function calling',
      'Document extraction models',
      'Workflow orchestration',
      'Business rules validation',
      'Human-in-the-loop review UI',
      'Audit logging',
    ],
    outcome:
      'Routine cases flow through without manual touch while genuinely ambiguous ones arrive at specialists pre-triaged and pre-filled. The team’s effort shifts from data entry to judgment, and the process gains an audit trail it never had before.',
    illustrative: true,
  },
  {
    slug: 'cloud-native-ai-platform',
    title: 'Cloud-Native AI Platform',
    category: 'Cloud & MLOps',
    flow: ['AI Requirements', 'Cloud Architecture', 'Deployment', 'Monitoring'],
    problem:
      'An engineering group has promising AI prototypes running on laptops and notebooks, but no path to production. There is no shared environment for models, no controlled way to manage API keys and data access, and no answer to the questions security and finance teams are asking about isolation and cost.',
    approach:
      'We design a landing zone for AI workloads: private networking, centrally managed secrets, and separate environments for experimentation, staging and production. Model access goes through a gateway that applies authentication, rate limits and usage attribution per team. Infrastructure is defined as code, deployments run through CI/CD with automated checks, and observability covers both classic service health and AI-specific signals such as token consumption, latency per model call and output quality drift.',
    technologies: [
      'AWS / Azure / GCP landing zone',
      'Terraform',
      'Kubernetes or serverless containers',
      'API gateway + secrets management',
      'CI/CD pipelines',
      'OpenTelemetry-based observability',
    ],
    outcome:
      'Prototypes have a paved road to production instead of a cliff. Teams ship AI features through the same controlled pipeline as any other service, security reviews have concrete architecture to approve, and cost is visible per workload rather than discovered on the invoice.',
    illustrative: true,
  },
  {
    slug: 'ai-powered-application',
    title: 'AI-Powered Application',
    category: 'AI Engineering',
    flow: ['Business Requirement', 'AI Architecture', 'Application', 'Production'],
    problem:
      'A product team wants intelligence inside the product itself — drafting, summarizing and recommending within the user’s existing workflow — not a separate chatbot bolted onto the side. Early experiments showed promise but also unpredictable latency, inconsistent output quality and no strategy for handling model errors in front of end users.',
    approach:
      'We treat the model as one component in a designed system. An orchestration layer manages prompts, context assembly and fallbacks between models; streaming responses keep the interface responsive; and every AI feature has a defined failure mode that degrades gracefully instead of erroring. Output passes through validation before it reaches the user, and an evaluation suite runs against golden datasets in CI so prompt and model changes are tested like any other code change.',
    technologies: [
      'TypeScript / React',
      'Node.js or Python backend',
      'Model orchestration layer',
      'Streaming APIs (SSE / WebSockets)',
      'Structured output validation',
      'Prompt evaluation in CI',
    ],
    outcome:
      'AI becomes a dependable product capability rather than a demo. Users experience fast, consistent assistance inside their normal workflow, and the team can iterate on prompts and models with the same confidence and tooling they apply to the rest of the codebase.',
    illustrative: true,
  },
]
