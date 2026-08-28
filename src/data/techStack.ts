/**
 * Technology stack ecosystem (prompt.md §25).
 *
 * Grouped by capability, AI-first order. Rendered as text-first group cards —
 * never as a logo wall. Listing a technology does not imply certification,
 * partnership or official vendor status.
 */

export interface TechStackGroup {
  /** Display name of the capability group. */
  readonly group: string
  /** One-line description of how the group is used. */
  readonly blurb: string
  /** Technologies in the group, in display order. */
  readonly items: readonly string[]
}

export const techStack: readonly TechStackGroup[] = [
  {
    group: 'AI / ML',
    blurb:
      'Core machine learning: model training, evaluation and deployment on proven frameworks.',
    items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face'],
  },
  {
    group: 'Generative AI',
    blurb:
      'Frontier and cloud model platforms, selected per use case for quality, cost and data residency.',
    items: ['OpenAI', 'Anthropic', 'Gemini', 'Vertex AI', 'AWS Bedrock', 'Azure AI', 'Open-source LLMs'],
  },
  {
    group: 'AI Engineering',
    blurb:
      'The layer that turns models into products: retrieval, orchestration and agent protocols.',
    items: ['RAG', 'Vector Search', 'LangChain', 'LangGraph', 'CrewAI', 'MCP', 'A2A'],
  },
  {
    group: 'Data',
    blurb:
      'Pipelines, warehouses and processing engines that make data reliable enough to build on.',
    items: [
      'Python',
      'SQL',
      'Pandas',
      'NumPy',
      'Spark',
      'BigQuery',
      'Snowflake',
      'PostgreSQL',
      'pgvector',
    ],
  },
  {
    group: 'BI & Visualization',
    blurb:
      'Dashboards and reporting on trusted metrics, delivered in the tools your teams already use.',
    items: ['Power BI', 'Tableau', 'Qlik', 'Looker'],
  },
  {
    group: 'Cloud',
    blurb:
      'Secure, scalable infrastructure across the major cloud providers — matched to your estate.',
    items: ['AWS', 'Microsoft Azure', 'Google Cloud'],
  },
  {
    group: 'Application Engineering',
    blurb:
      'Modern web applications and APIs, engineered for performance and maintainability.',
    items: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Django', 'Node.js'],
  },
  {
    group: 'DevOps',
    blurb:
      'Automated delivery: containerized workloads, infrastructure as code and continuous pipelines.',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Terraform'],
  },
]
