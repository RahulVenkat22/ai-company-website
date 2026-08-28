/**
 * Case studies (prompt.md §28).
 *
 * All six studies are illustrative projects: realistic engagement patterns
 * written to show how we work, with generic sectors, no client names and no
 * quantified results (credibility rules, prompt.md §45). `architecture` holds
 * ordered layer/flow strings rendered as a stack or chain in the UI.
 */

export interface CaseStudy {
  slug: string
  title: string
  category: string
  /** Generic sector descriptor, always marked illustrative. */
  sector: string
  challenge: string
  existingProblem: string
  requirements: string[]
  approach: string
  /** Ordered architecture layers / flow, top to bottom. */
  architecture: string[]
  technologies: string[]
  implementation: string
  security: string
  /** Qualitative only — no numbers, per credibility rules. */
  outcome: string
  illustrative: true
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'clinical-knowledge-assistant',
    title: 'Clinical Knowledge Assistant with Enterprise RAG',
    category: 'AI / RAG',
    sector: 'Healthcare provider (illustrative)',
    challenge:
      'Clinical and administrative staff need fast, reliable answers from a large body of care protocols, formulary documents and internal policies. Getting an answer today means searching a document portal, opening several PDFs and hoping the version found is current — which is slow for staff and risky for compliance.',
    existingProblem:
      'Knowledge lives in thousands of PDFs and intranet pages with inconsistent structure and duplicated, sometimes contradictory versions. Full-text search cannot distinguish superseded guidance from current guidance, and there is no way to restrict answers to the documents a given role is cleared to read.',
    requirements: [
      'Grounded answers with citations back to the exact source passage and document version',
      'Role-based access control enforced at retrieval time, not just at the UI',
      'Freshness handling so superseded documents can never be cited as current',
      'A review workflow allowing clinical owners to correct or suppress answers',
      'Deployment inside the organization’s own cloud tenancy',
      'Measurable answer quality before and after every change',
    ],
    approach:
      'We built retrieval as the core engineering problem. Documents are ingested through a pipeline that captures structure, effective dates and ownership metadata, then chunked and indexed for hybrid search. At query time the system filters by the caller’s entitlements and document currency, retrieves with combined vector and keyword scoring, reranks, and only then asks the model to compose an answer strictly from the retrieved passages, with citations attached to every claim.',
    architecture: [
      'Document sources (DMS, intranet, policy repository)',
      'Ingestion & enrichment pipeline (structure, versions, permissions)',
      'Hybrid index (vector + keyword + metadata)',
      'Retrieval, entitlement filtering & reranking service',
      'LLM answer composition with citation enforcement',
      'Web application with feedback & review workflow',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'pgvector',
      'Hybrid retrieval + reranking',
      'Anthropic / OpenAI APIs',
      'React',
      'Terraform',
    ],
    implementation:
      'Delivery ran in phases: a retrieval-quality prototype scored against a question set written with document owners, then a pilot with one department behind existing single sign-on, then staged rollout. The evaluation harness became part of CI, so changes to chunking, prompts or models had to beat the current baseline before deployment.',
    security:
      'The platform runs entirely inside the customer’s cloud tenancy with private networking to model endpoints. Entitlements are checked per query against the identity provider, all questions and answers are audit-logged, and no document content is used for model training. Personally identifiable information is filtered at ingestion.',
    outcome:
      'Staff get one place to ask and receive a current, cited answer instead of a folder of candidate PDFs. Compliance owners gain visibility into what is being asked and how it is answered, and the citation trail turns every response into something that can be verified rather than trusted blindly.',
    illustrative: true,
  },
  {
    slug: 'agentic-claims-operations',
    title: 'Agentic Workflow for Claims Operations',
    category: 'Agentic AI',
    sector: 'Insurance services firm (illustrative)',
    challenge:
      'A claims operations team handles a continuous inbound stream of forms, emails and attachments. Every item must be classified, keyed into a core system and routed — work that is repetitive at the median and genuinely difficult at the edges. The business wants throughput without giving up control over decisions.',
    existingProblem:
      'Intake is fully manual: staff re-type data from documents into the claims platform, and routing depends on individual experience. Errors surface days later as rework, rules live in people’s heads rather than in software, and there is no structured record of why an item was routed the way it was.',
    requirements: [
      'Automated classification and field extraction from mixed document formats',
      'Deterministic business-rule validation before any system write',
      'Hard human-approval gates for defined decision categories',
      'Complete, queryable audit trail of every agent action and tool call',
      'Escalation paths that hand specialists full context, not raw documents',
      'Ability to replay and evaluate agent decisions offline',
    ],
    approach:
      'We modeled the workflow as a graph of typed steps and gave an agent ownership of the routine path: classify, extract with confidence scores, validate against codified business rules, then act through the claims platform’s APIs. Anything below confidence thresholds, or inside a category flagged as judgment-bearing, is packaged with extracted data and reasoning and queued for a specialist. The agent’s tool access is allow-listed and every step is recorded.',
    architecture: [
      'Intake channels (email, portal uploads, scanned documents)',
      'Classification & extraction layer with confidence scoring',
      'Business rules & validation engine',
      'Agent orchestrator with allow-listed tools',
      'Core claims system APIs',
      'Human review queue & audit store',
    ],
    technologies: [
      'LLM function calling',
      'Document AI extraction',
      'Temporal-style workflow orchestration',
      'Python',
      'PostgreSQL',
      'React review console',
    ],
    implementation:
      'We started in shadow mode: the agent processed live items but wrote nothing, and its proposed actions were compared with what staff actually did. Divergences drove rule refinement and prompt changes. Automation was then enabled category by category, lowest-risk first, with human gates retained wherever the business required them.',
    security:
      'The agent authenticates to core systems with scoped service credentials, and its permitted actions are defined in configuration rather than prompts. Documents are processed within the customer’s environment, retention policies are applied to extracted data, and the audit store records inputs, outputs and tool calls for every case.',
    outcome:
      'Routine items now move through intake without manual keying, while specialists receive the difficult cases already triaged and contextualized. Operational rules previously held as tribal knowledge are codified and testable, and the audit trail makes each automated decision explainable after the fact.',
    illustrative: true,
  },
  {
    slug: 'retail-analytics-power-bi',
    title: 'Unified Retail Analytics on Power BI',
    category: 'Data Analytics / Power BI',
    sector: 'Multi-channel retailer (illustrative)',
    challenge:
      'Merchandising, e-commerce and store operations each report performance from their own extracts, so the same week can look like growth in one deck and decline in another. Leadership wants a single, trusted view of sales, stock and margin that refreshes without an analyst in the loop.',
    existingProblem:
      'Data is fragmented across a point-of-sale database, an e-commerce platform, a legacy ERP and long-lived Excel workbooks. Metric definitions differ by team, refresh is manual, and lineage is unknowable — when a number looks wrong there is no way to trace where it came from.',
    requirements: [
      'A governed warehouse consolidating POS, e-commerce and ERP data',
      'One tested definition per business metric in a shared semantic layer',
      'Automated refresh with data-quality checks that block bad loads',
      'Power BI dashboards with row-level security by region and role',
      'Self-service exploration for analysts without metric drift',
      'Documented lineage from dashboard figure back to source system',
    ],
    approach:
      'We built an ELT platform: raw source data lands in a cloud warehouse, dbt models transform it into a documented dimensional model, and a semantic layer defines each metric once with tests attached. Power BI datasets are built on the semantic layer only — no report connects to raw tables — so every dashboard, from executive summary to category deep-dive, agrees by construction.',
    architecture: [
      'Source systems (POS, e-commerce platform, ERP)',
      'ELT ingestion into cloud warehouse',
      'dbt transformation & testing layer',
      'Dimensional model + semantic layer',
      'Power BI datasets with row-level security',
      'Dashboards & self-service workspace',
    ],
    technologies: [
      'Azure Data Factory-style ingestion',
      'Cloud data warehouse',
      'dbt',
      'SQL',
      'Power BI',
      'DAX',
    ],
    implementation:
      'The first increment shipped a single trusted sales dashboard to prove the pipeline end to end; stock and margin followed on the same foundations. Data-quality tests were written alongside each model, and a weekly working session with finance and merchandising resolved metric definitions before they were encoded.',
    security:
      'Access is governed through the organization’s identity platform, with row-level security restricting each user to their region and banner. Source credentials live in a managed vault, warehouse data is encrypted at rest, and personal customer data is minimized to what reporting actually requires.',
    outcome:
      'The business now runs its trading meetings from one set of numbers with visible lineage. Refresh happens on schedule rather than on request, broken feeds are caught by tests instead of by embarrassed analysts, and new questions are answered by exploring the model rather than commissioning another extract.',
    illustrative: true,
  },
  {
    slug: 'logistics-cloud-migration',
    title: 'Legacy Platform Migration to Cloud-Native Architecture',
    category: 'Cloud Migration',
    sector: 'Logistics operator (illustrative)',
    challenge:
      'A core shipment-management platform runs on aging on-premises servers approaching end of support. The business needs the reliability and elasticity of cloud infrastructure — and a foundation for planned AI features — without pausing operations that run around the clock.',
    existingProblem:
      'The platform is a monolith with a shared database, deployed manually a few times a year because releases are risky. Hardware capacity is sized for peak season and idle otherwise, disaster recovery has never been fully tested, and environment differences make every deployment an event.',
    requirements: [
      'Migration with no extended downtime for around-the-clock operations',
      'Incremental cutover with a tested rollback path at every stage',
      'Infrastructure as code and repeatable environments from day one',
      'CI/CD replacing manual release procedures',
      'Observability across the old and new stacks during transition',
      'A demonstrably testable disaster-recovery capability',
    ],
    approach:
      'We used a strangler migration rather than a lift-and-shift big bang. The monolith moved first onto cloud infrastructure behind an API gateway largely unchanged, establishing networking, identity and observability. High-change domains — tracking, notifications, rating — were then carved out as services with their own data stores, with the gateway routing traffic progressively and both paths kept runnable until each cutover proved stable.',
    architecture: [
      'Edge & API gateway with progressive routing',
      'Rehosted core application (containerized monolith)',
      'Extracted domain services (tracking, notifications, rating)',
      'Managed databases with change-data-capture sync during transition',
      'Infrastructure as code & CI/CD pipelines',
      'Centralized observability & alerting',
    ],
    technologies: [
      'AWS / Azure class cloud platform',
      'Docker & Kubernetes',
      'Terraform',
      'CDC-based data synchronization',
      'GitHub Actions-style CI/CD',
      'Grafana / OpenTelemetry stack',
    ],
    implementation:
      'Each phase had explicit entry and exit criteria: parity tests before routing changes, error-budget monitoring during, and a rehearsed rollback if thresholds were breached. Release frequency increased as pipeline confidence grew, and the final decommissioning of on-premises hardware happened only after a full peak period on the new platform.',
    security:
      'The landing zone was built to the organization’s security baseline: private subnets, least-privilege IAM roles, encrypted data in transit and at rest, and centralized log retention. Secrets moved from configuration files into a managed vault, and the migration included a review of every externally exposed endpoint.',
    outcome:
      'The platform now scales with seasonal demand instead of being sized for it, and releases are routine rather than rare events. Disaster recovery is a tested procedure instead of a document, and the cloud foundation gives the planned analytics and AI roadmap somewhere real to land.',
    illustrative: true,
  },
  {
    slug: 'finance-document-automation',
    title: 'AI Automation for Financial Document Processing',
    category: 'AI Automation',
    sector: 'Professional services firm (illustrative)',
    challenge:
      'A finance operations group receives invoices, statements and remittance advice in every conceivable format. Each document must be read, coded and entered into the accounting system, then matched against expected payments — high-volume work where accuracy matters and month-end pressure is constant.',
    existingProblem:
      'Processing is manual end to end. Layout differences defeat the template-based OCR tool that was previously trialled, exceptions accumulate in shared inboxes, and matching against open items is done by eye. Errors are found late, during reconciliation, when they are most expensive to unwind.',
    requirements: [
      'Layout-independent extraction across supplier formats, including scans',
      'Confidence scoring with automatic routing of low-confidence fields to review',
      'Automated matching against open items in the accounting system',
      'Straight-through posting only above defined confidence and value thresholds',
      'An exception workspace that shows the document and extraction side by side',
      'Feedback loop so corrections improve future extraction',
    ],
    approach:
      'We replaced template OCR with model-based document understanding: documents are classified, fields are extracted with per-field confidence, and deterministic validation checks totals, tax logic and supplier records before anything is posted. High-confidence, low-risk documents flow straight through to the accounting API; everything else lands in a review workspace where a person confirms or corrects in seconds rather than re-keying.',
    architecture: [
      'Capture channels (email inbox, portal upload, scanner feed)',
      'Classification & model-based extraction with confidence scores',
      'Validation & business-rule engine',
      'Matching service against accounting open items',
      'Accounting system API integration',
      'Exception review workspace & correction feedback store',
    ],
    technologies: [
      'Document AI / vision-language models',
      'Python',
      'Rules engine',
      'Accounting platform APIs',
      'PostgreSQL',
      'React',
    ],
    implementation:
      'Rollout began with a single document type and one entity, run in parallel with the manual process until sampled accuracy satisfied finance leadership. Thresholds for straight-through posting were set conservatively and loosened only as evidence accumulated. Corrections captured in the review workspace were fed back into evaluation sets each cycle.',
    security:
      'Documents are processed within a controlled environment with encryption in transit and at rest, and access to the review workspace is role-based with full activity logging. Posting to the accounting system uses scoped API credentials, and value thresholds ensure high-value items always receive human approval.',
    outcome:
      'The bulk of routine documents now post without manual keying, and the team’s attention concentrates on genuine exceptions rather than transcription. Errors are caught at intake by validation rules instead of at reconciliation, and month-end close became calmer because the backlog no longer builds up ahead of it.',
    illustrative: true,
  },
  {
    slug: 'continuous-testing-platform',
    title: 'Continuous Testing Platform for a SaaS Product',
    category: 'Testing Automation',
    sector: 'B2B SaaS company (illustrative)',
    challenge:
      'A product team wants to ship weekly, but every release depends on days of manual regression testing. Quality engineering has become the bottleneck: testers repeat the same scripted checks each cycle, and the fear of missed regressions pushes releases later and makes them larger.',
    existingProblem:
      'Test coverage exists only as spreadsheets of manual scripts. A previous automation attempt produced brittle UI tests that failed on every cosmetic change and were eventually ignored. There is no API-level suite, no test data management, and no quality signal in the CI pipeline at all.',
    requirements: [
      'A layered automation strategy weighted toward API and integration tests',
      'Stable, maintainable UI tests for critical user journeys only',
      'Deterministic test data provisioning per run',
      'Suites wired into CI so every change gets a quality verdict',
      'Flake detection and quarantine so red always means broken',
      'Reporting that shows coverage and trends per release',
    ],
    approach:
      'We rebuilt the strategy around the test pyramid rather than around the UI. Business logic is exercised through API and integration suites that run in minutes; a small set of resilient end-to-end tests, built on user-facing selectors and automatic waiting, covers the journeys that must never break. Test data is created and torn down per run through a provisioning service, eliminating the shared-environment collisions that caused the old flakiness.',
    architecture: [
      'Unit & component test layer (owned by developers)',
      'API & integration suites against ephemeral environments',
      'End-to-end UI journeys (Playwright)',
      'Test data provisioning service',
      'CI orchestration with parallel execution & flake quarantine',
      'Quality reporting & trend dashboard',
    ],
    technologies: [
      'Playwright',
      'TypeScript',
      'API testing frameworks',
      'Docker-based ephemeral environments',
      'GitHub Actions-style CI',
      'Allure-class reporting',
    ],
    implementation:
      'The first milestone put an API smoke suite into CI so the pipeline produced a quality signal within weeks. Coverage then grew feature by feature, prioritized by incident history. Manual testers moved from executing scripts to designing cases and exploratory testing, with pairing sessions building automation skills inside the existing team.',
    security:
      'Test environments use synthetic data only — the provisioning service generates realistic records so production data never leaves production. CI secrets are scoped per environment, and the suites include checks for authorization boundaries so permission regressions fail the build like any functional defect.',
    outcome:
      'Releases are now gated by a fast automated verdict instead of a manual testing week, and red builds are trusted because flaky tests are quarantined rather than ignored. Regression risk no longer accumulates between large releases, and the quality conversation shifted from “did we test it?” to evidence in the pipeline.',
    illustrative: true,
  },
]
