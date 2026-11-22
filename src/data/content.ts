// Single source of truth for all site copy.
// Everything here comes from the CV or the portfolio brief — do not add claims that aren't in either.

export const site = {
  name: "Muzzammil Ahmed",
  role: "Data Engineer · BI Developer · Data & AI Consultant",
  company: "Innolytix",
  location: "Karachi, Pakistan",
  email: "muzzammil.ahmed835@gmail.com",
  linkedin: "https://www.linkedin.com/in/muzzammil-ahmed2",
  github: "https://github.com/MuzzammilAhmed2",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muzzammilahmed2.github.io",
  heroLine: "I turn messy enterprise data into decisions.",
  heroSub: "And build AI designed for regulated industries.",
  // TODO: add a professional photo at public/me.jpg; the hero shows it automatically once it exists.
  photo: process.env.NEXT_PUBLIC_HAS_PHOTO === "1" ? "/me.jpg" : null,
  // Shown only when public/Muzzammil-Ahmed-CV.pdf exists (see next.config.ts). Use a copy without the phone number.
  cv: process.env.NEXT_PUBLIC_HAS_CV === "1" ? "/Muzzammil-Ahmed-CV.pdf" : null,
  description:
    "Data Engineer & BI Developer in Karachi: data platforms on Microsoft Fabric, Azure, AWS and Snowflake, Power BI and governed AI. DP-700 & PL-300 certified.",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const about = {
  heading: "Data that leadership trusts. AI whose every decision can be traced.",
  story: [
    "I'm a Data Engineer, BI Developer and Data & AI Consultant. I take ERP, CRM, core-banking and operational data that doesn't agree with itself and turn it into governed, high-performance platforms people actually trust.",
    "I started at Innolytix as a Data Engineering intern in September 2025 and was offered a full-time role three months later. Since then I've built Medallion platforms on Microsoft Fabric and Azure, built enterprise Power BI semantic models, and delivered AI-powered document and search solutions across banking, insurance, logistics and retail.",
    "On the side, I build products: BankSphere AI for KYC in banking, and PlantMind, an AI operations layer for manufacturing. Both start from the same rule: AI in serious industries has to explain itself before it's clever.",
  ],
  stats: [
    { value: 4, suffix: "", label: "Client platforms delivered" },
    { value: 4, suffix: "", label: "Sectors: banking, insurance, logistics, retail" },
    { value: 4, suffix: "", label: "Cloud platforms: Fabric, Azure, AWS, Snowflake" },
    // 1,041 = `pytest --collect-only` on the BankSphere repo, 2026-11-18. Tests aren't tagged unit/integration/eval, so no split is shown.
    { value: 1041, suffix: "", label: "Automated tests on BankSphere AI" },
  ],
};

export type Feature = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  art: "decision" | "detective" | "challenge" | "timemachine" | "twin" | "fourEyes" | "audit" | "redteam";
  media?: string; // filename inside /public/projects/banksphere/
};

export const banksphere = {
  slug: "banksphere-ai",
  name: "BankSphere AI",
  tagline: "Governed AI for KYC & compliance in banking.",
  honesty: "Working product on synthetic data · Code walkthrough on request",
  stack: [
    "Python",
    "FastAPI",
    "Azure Entra ID",
    "Cosmos DB",
    "Blob Storage",
    "AI Document Intelligence",
    "AI Content Safety",
    "AI Foundry",
    "AI Search",
    "GSAP UI",
  ],
  video: "demo.mp4",
  features: [
    {
      id: "kyc",
      kicker: "01 — Onboarding",
      title: "KYC decisions in one pass",
      body: "ID-card OCR, card checks, watchlist screening and a risk score decide the outcome: approve, send to officer review, or ask the customer to resubmit.",
      art: "decision",
      media: "kyc.webp",
    },
    {
      id: "detective",
      kicker: "02 — Officer desk",
      title: "AI Compliance Detective",
      body: "Officers ask questions about a case and get grounded answers with citations back to the evidence — not free-floating model output.",
      art: "detective",
      media: "detective.webp",
    },
    {
      id: "challenge",
      kicker: "03 — Human oversight",
      title: "Challenge the AI",
      body: "An officer can push back on any AI conclusion and make it defend — or revise — its reasoning before a decision is made.",
      art: "challenge",
      media: "challenge.png",
    },
    {
      id: "timemachine",
      kicker: "04 — Replay",
      title: "Time Machine case replay",
      body: "Replay any case step by step to see exactly what the system knew and decided at each point in time.",
      art: "timemachine",
      media: "time-machine.png",
    },
    {
      id: "twin",
      kicker: "05 — Regulation",
      title: "Regulatory Digital Twin & knowledge graph",
      body: "A digital twin of the regulatory rulebook plus a compliance knowledge graph that links customers, cases, rules and evidence.",
      art: "twin",
      media: "digital-twin.png",
    },
    {
      id: "fourEyes",
      kicker: "06 — Financial crime",
      title: "Screening with four-eyes approval",
      body: "Financial-crime screening where sensitive decisions need a second, independent approver before they take effect.",
      art: "fourEyes",
      media: "four-eyes.png",
    },
    {
      id: "audit",
      kicker: "07 — Evidence",
      title: "Tamper-evident audit trail",
      body: "Every action lands in a hash-chained audit log with write-once checkpoints, so any after-the-fact edit is detectable.",
      art: "audit",
      media: "audit.webp",
    },
    {
      id: "redteam",
      kicker: "08 — Proof",
      title: "Red-team & evaluation suites",
      body: "Adversarial red-team and evaluation suites run alongside 1,000+ automated tests to keep the AI honest as it changes.",
      art: "redteam",
      media: "tests.png",
    },
  ] satisfies Feature[],
};

// Homepage shows 4 of the 8 features; the case study shows all of them.
const byId = (id: string) => banksphere.features.find((f) => f.id === id)!;
export const homeFeatures: Feature[] = [
  { ...byId("kyc"), kicker: "01 — Onboarding" },
  {
    ...byId("detective"),
    kicker: "02 — Officer desk",
    title: "Ask the AI — then challenge it",
    body: "Officers get answers with citations back to the evidence, and can push back on any conclusion before they make the call.",
  },
  { ...byId("audit"), kicker: "03 — Evidence" },
  { ...byId("redteam"), kicker: "04 — Proof" },
];

export type Showcase = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  media: string; // filename inside /public/projects/plantmind/
};

// PlantMind facts come from the PlantMind repo README, PROJECT_SPEC.md and docs/DECISIONS.md.
// 76 = `pytest --collect-only` on the PlantMind repo, 2026-11-22. Screens captured from the hosted synthetic demo the same day.
export const plantmind = {
  slug: "plantmind",
  name: "PlantMind",
  tagline: "An AI operations layer for manufacturing.",
  lead: "One workspace where maintenance, quality, customer care and leadership share a private knowledge engine, live plant data, human approval gates and a hash-linked audit trail.",
  honesty: "Working product on synthetic data · Walkthrough on request",
  sectors: "Manufacturing · Maintenance · Quality · Azure AI",
  stack: [
    "Python",
    "FastAPI",
    "SQLAlchemy 2",
    "PostgreSQL + pgvector",
    "Alembic",
    "Azure AI Foundry",
    "RAG",
    "WhatsApp Cloud API",
    "React + TypeScript",
    "Docker Compose",
  ],
  facts: [
    { value: "5", label: "Roles with their own permissions" },
    { value: "25", label: "Synthetic plant documents indexed" },
    { value: "12", label: "Machines on three production lines" },
    { value: "76", label: "Automated backend tests" },
  ],
  thread: ["Sensor alert", "AI work order", "Human approval", "Audit chain"],
  showcase: [
    {
      id: "live",
      kicker: "01 · Live operations",
      title: "The plant floor, right now",
      body: "A plant health score, per-line risk, open alerts, pending approvals and low-stock parts, refreshed every 30 seconds. Every number shows the query it came from.",
      media: "live-ops.webp",
    },
    {
      id: "ask",
      kicker: "02 · Knowledge engine",
      title: "Answers that cite their sources",
      body: "Ask in plain language. PlantMind answers from your manuals and SOPs (cited S1, S2…), from live plant data filtered by role, and labels anything that is general knowledge rather than your documents.",
      media: "ask.webp",
    },
    {
      id: "approvals",
      kicker: "03 · Human in the loop",
      title: "AI proposes. People decide.",
      body: "When a maintenance agent spots risk, it drafts the work order with its evidence. Nothing runs until someone with the right role reviews it and signs off.",
      media: "approvals.webp",
    },
    {
      id: "audit",
      kicker: "04 · Governance",
      title: "Every step, hash-chained",
      body: "Agent steps, tool calls, retrievals, model answers and approvals are written to an append-only, hash-linked log that a single command can verify.",
      media: "audit.webp",
    },
    {
      id: "overview",
      kicker: "05 · Workspace",
      title: "One studio for the whole shift",
      body: "Overview, live ops, alerts, NCR / CAPA, customer care and admin in a glass interface with dark and light themes, Ctrl+K search and motion controls.",
      media: "overview.webp",
    },
  ] satisfies Showcase[],
  modules: [
    { title: "Predictive maintenance", body: "Anomaly scoring and remaining-life estimates on replayed sensor data raise alerts and draft work orders." },
    { title: "NCR / CAPA", body: "A nonconformance dispatches process, supplier and inspection evidence workers, then drafts a ranked corrective action for approval." },
    { title: "Batch genealogy", body: "Trace a batch to its supplier, material certificate and the customer complaints linked to it." },
    { title: "Customer care", body: "Complaint triage with SLA targets and escalation to quality, on the web or WhatsApp." },
    { title: "WhatsApp access", body: "Staff get the AI on WhatsApp with their role's permissions. Webhooks are signature-checked and customer numbers stored only as salted fingerprints." },
    { title: "Executive brief", body: "An on-demand report whose KPI figures come from real database queries, each with its lineage." },
  ],
  principles: [
    "Every model call goes through one router, so the cloud model can be swapped for an on-prem one with a config change.",
    "Risky actions such as work orders and CAPA release become pending actions that only run after role-based approval.",
    "Retrieved document text is treated as data, never as instructions. Answers say \"not found in the documents\" rather than invent a source.",
    "Runs end to end offline with a deterministic stub model, so the full demo and test suite need no cloud keys.",
  ],
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  sector: string;
  summary: string;
  description: string;
  /** Case-study structure: Context → My role → What I built → Stack → Outcome. */
  context: string;
  role: string;
  highlights: string[];
  outcome: string[];
  academic?: boolean;
  stack: string[];
  hue: number; // accent hue for the card visual
  nodes: string[]; // pipeline drawn in the card visual
};

export const projects: Project[] = [
  {
    slug: "intelligent-document-processing",
    index: "01",
    name: "Intelligent Document Processing & Compliance Platform",
    sector: "Insurance",
    summary: "AI-powered classification, OCR and routing of claims and policy documents, with RAG search over historical cases.",
    description:
      "Built an AI-powered document platform using IBM FileNet, IBM Datacap and IBM Watsonx.ai to automate classification, OCR extraction and routing of claims and policy documents.",
    context:
      "An insurer handled claims and policy documents by hand: classifying them, keying in their data and routing them, with no quick way to search past cases.",
    role: "Data Engineer / BI Developer at Innolytix, on the delivery team.",
    highlights: [
      "Classification, OCR extraction and routing of claims and policy documents with IBM Datacap, FileNet and Watsonx.ai.",
      "A RAG search layer so claims officers can query historical case files in natural language, with full audit and records-management compliance.",
      "CMIS-based records lifecycle management to enforce retention policies.",
      "Automatic routing of high-priority cases based on document content and risk indicators.",
    ],
    outcome: [
      "Less manual claims triage: high-priority cases reach the right people automatically.",
      "Officers can search years of case files in plain language without breaking records compliance.",
    ],
    stack: ["IBM FileNet", "IBM Datacap", "IBM Watsonx.ai", "RAG", "OCR", "CMIS"],
    hue: 200,
    nodes: ["Documents", "Datacap OCR", "Watsonx.ai", "FileNet", "RAG search"],
  },
  {
    slug: "real-time-fleet-control-tower",
    index: "02",
    name: "Real-Time Fleet Control Tower",
    sector: "Logistics & transportation",
    summary: "Real-time IoT analytics tracking a live vehicle fleet — health, geofencing, fuel efficiency and driver behaviour.",
    description:
      "Engineered a real-time IoT analytics platform on Azure IoT Hub, Microsoft Fabric Eventstream, Eventhouse and Fabric Activator to track a live vehicle fleet.",
    context:
      "A logistics operator needed a live view of its vehicle fleet (health, location, fuel and driver behaviour) instead of finding out about problems after the fact.",
    role: "Data Engineer / BI Developer at Innolytix, on the delivery team.",
    highlights: [
      "Streaming ingestion from Azure IoT Hub into Fabric Eventstream and Eventhouse, with Fabric Activator for real-time alerts.",
      "Vehicle health monitoring, geofencing alerts and fuel-efficiency tracking.",
      "Driver behaviour scoring and route-deviation alerts on top of historical telemetry.",
      "Executive Power BI dashboards on fleet utilisation and maintenance costs.",
    ],
    outcome: [
      "Maintenance planned from telemetry, reducing unplanned downtime.",
      "Operations and leadership see utilisation and maintenance cost in one place.",
    ],
    stack: ["Azure IoT Hub", "Fabric Eventstream", "Eventhouse", "Fabric Activator", "KQL", "Power BI"],
    hue: 165,
    nodes: ["Vehicles", "IoT Hub", "Eventstream", "Eventhouse", "Activator"],
  },
  {
    slug: "enterprise-performance-analytics",
    index: "03",
    name: "Enterprise Performance Analytics Platform",
    sector: "Banking",
    summary: "Governed Medallion platform on Fabric Direct Lake unifying core banking, treasury and CRM data.",
    description:
      "Built an enterprise analytics platform on Microsoft Fabric Direct Lake, consolidating core banking, treasury and CRM data into a governed Medallion Architecture.",
    context:
      "A bank's core banking, treasury and CRM data lived in separate systems, which made branch performance and regulatory reporting slow and hard to trust.",
    role: "Data Engineer / BI Developer at Innolytix, on the delivery team.",
    highlights: [
      "A governed Medallion platform on Microsoft Fabric Direct Lake consolidating core banking, treasury and CRM data.",
      "Automated Data Factory quality controls, and identity-based RLS mapped to branch and regional hierarchies.",
      "Enterprise Power BI semantic models with incremental refresh and DAX KPI reporting for branch managers and executives.",
      "Azure DevOps CI/CD pipelines for analytics and BI releases.",
    ],
    outcome: [
      "One governed source for audit and regulatory reporting, with access scoped to each branch and region.",
      "Standardised deployments and faster reporting turnaround for compliance reviews.",
    ],
    stack: ["Microsoft Fabric", "Direct Lake", "Data Factory", "Medallion", "Power BI", "RLS", "Azure DevOps"],
    hue: 220,
    nodes: ["Core banking", "Bronze", "Silver", "Gold", "Power BI"],
  },
  {
    slug: "cross-cloud-revenue-intelligence",
    index: "04",
    name: "Cross-Cloud Revenue Intelligence Platform",
    sector: "Retail & e-commerce",
    summary: "Secure analytics across AWS, Snowflake and Fabric unifying sales, inventory and customer data, with CLV segmentation.",
    description:
      "Built a secure cross-cloud analytics solution across AWS, Snowflake and Microsoft Fabric to unify sales, inventory and customer data for a multi-channel retailer.",
    context:
      "A multi-channel retailer's sales, inventory and customer data was split across clouds, so revenue and customer value couldn't be reported in one place.",
    role: "Data Engineer / BI Developer at Innolytix, on the delivery team.",
    highlights: [
      "A secure analytics layer across AWS, Snowflake and Microsoft Fabric.",
      "Automated daily ingestion pipelines from POS and e-commerce systems.",
      "Governed semantic models for unified revenue and CLV reporting, with RLS and CLS restricting regional margin data by role.",
      "Merchandising dashboards that segment customers by lifetime value.",
    ],
    outcome: [
      "Unified revenue and CLV reporting across channels.",
      "CLV segments guide targeted promotions and inventory allocation.",
    ],
    stack: ["AWS", "Snowflake", "Microsoft Fabric", "Power BI", "RLS / CLS", "CLV modelling"],
    hue: 185,
    nodes: ["POS + web", "AWS", "Snowflake", "Fabric", "CLV"],
  },
  {
    slug: "cloud-predictive-maintenance",
    index: "05",
    name: "Cloud-Based Predictive Maintenance",
    sector: "Final year project",
    summary: "Cloud platform on AWS predicting remaining useful life and failure probability from sensor telemetry.",
    description:
      "Built a cloud data platform using AWS S3, EC2, SageMaker and Power BI to monitor industrial equipment health and predict maintenance requirements.",
    context:
      "Industrial equipment is usually serviced on a fixed schedule or after it fails. The goal was to predict failures early from sensor data.",
    role: "Final-year BSCS project, Dawood University of Engineering & Technology.",
    highlights: [
      "Cloud data platform on AWS S3, EC2 and SageMaker for equipment telemetry.",
      "Time-series and vibration features, and models estimating remaining useful life and failure probability.",
      "The best-performing model deployed behind a lightweight API.",
      "Automated ingestion pipelines and executive Power BI dashboards.",
    ],
    outcome: [
      "Predictions validated against historical failure logs.",
      "Dashboards that support proactive maintenance planning.",
    ],
    academic: true,
    stack: ["AWS S3", "EC2", "SageMaker", "Python", "Power BI"],
    hue: 250,
    nodes: ["Sensors", "S3", "Features", "SageMaker", "Power BI"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Cloud platforms", items: ["Microsoft Fabric", "Microsoft Azure", "AWS", "Snowflake"] },
  {
    group: "Data engineering",
    items: [
      "ELT / ETL pipelines",
      "Medallion architecture",
      "Metadata-driven frameworks",
      "Streaming analytics",
      "Star schema modelling",
      "SCD Type 1 & 2",
      "Data warehouse design",
      "Data virtualization",
    ],
  },
  {
    group: "BI & visualization",
    items: ["Power BI", "DAX", "Semantic modelling", "KPI framework design", "Incremental refresh", "RLS", "CLS"],
  },
  {
    group: "AI & automation",
    items: ["Generative AI", "RAG", "Intelligent Document Processing", "OCR", "AI search", "LLM integrations", "IBM Watsonx.ai"],
  },
  {
    group: "Languages",
    items: ["Python", "SQL", "PySpark", "Spark SQL", "KQL", "Java", "C++"],
  },
  {
    group: "Tools",
    items: ["Azure Data Factory", "Fabric Data Factory", "Apache Airflow", "Apache NiFi", "Kafka", "Docker", "Git", "Linux", "Jupyter"],
  },
  { group: "AWS", items: ["S3", "EC2", "RDS", "Redshift", "Athena", "Glue", "IAM", "CloudWatch", "SageMaker"] },
  {
    group: "Enterprise content",
    items: ["IBM FileNet", "IBM Content Navigator", "IBM Datacap", "IBM Content Assistant", "CMIS", "IBM DB2", "Records management"],
  },
];

// Core tier, shown large. Everything else in `skills` appears under "Also worked with".
export const coreSkills: { name: string; note: string; covers: string[] }[] = [
  { name: "Microsoft Fabric", note: "Direct Lake, Data Factory, Eventstream, Eventhouse", covers: ["Microsoft Fabric"] },
  { name: "Azure", note: "Data Factory, IoT Hub, DevOps CI/CD", covers: ["Microsoft Azure"] },
  { name: "Power BI / DAX", note: "Semantic models, RLS / CLS, incremental refresh", covers: ["Power BI", "DAX", "Semantic modelling", "Incremental refresh", "RLS", "CLS"] },
  { name: "SQL", note: "Star schemas, SCD Type 1 & 2, data warehouse design", covers: ["SQL", "Star schema modelling", "SCD Type 1 & 2", "Data warehouse design"] },
  { name: "Python / PySpark", note: "ELT pipelines, Spark SQL, automation", covers: ["Python", "PySpark", "Spark SQL"] },
  { name: "Medallion / ELT", note: "Metadata-driven pipelines, bronze → silver → gold", covers: ["Medallion architecture", "ELT / ETL pipelines", "Metadata-driven frameworks"] },
];

export const marquee = [
  "Microsoft Fabric",
  "Azure",
  "AWS",
  "Snowflake",
  "Power BI",
  "Python",
  "SQL",
  "PySpark",
  "Airflow",
  "Kafka",
  "Docker",
  "RAG",
];

export const experience = [
  {
    period: "Dec 2025 – Present",
    role: "Data Engineer / BI Developer",
    company: "Innolytix",
    // Each bullet: action → what → result. Result numbers are TODOs until real figures are supplied.
    points: [
      // TODO: real figure — how many source systems, and data volume (rows or GB per month)?
      "Built Medallion analytics platforms on Microsoft Fabric and Azure, integrating ERP, CRM and operational systems into one governed source for reporting.",
      // TODO: real figure — how many pipelines / sources run on the framework?
      "Built metadata-driven ELT pipelines and star-schema models, so new sources are onboarded through configuration rather than new code.",
      // TODO: real figure — refresh or processing time before → after?
      "Applied partitioning and query optimization to high-volume datasets to shorten processing and refresh times.",
      // TODO: real figure — number of reports / dashboards and users?
      "Delivered Power BI semantic models with complex DAX (time intelligence, variance, rolling KPIs), incremental refresh and RLS for executive reporting.",
      // TODO: real figure — release frequency or deployment time saved?
      "Set up Azure DevOps CI/CD for analytics and BI, standardising how analytics and BI changes are deployed.",
    ],
  },
  {
    period: "Sep 2025 – Nov 2025",
    role: "Data Engineering Intern",
    company: "Innolytix",
    points: [
      // TODO: real figure — how many pipelines / validation checks?
      "Built and tested ELT pipelines and data-validation workflows with the Data Engineering team to check data quality before it reached reports.",
      // TODO: real figure — how many reports / stakeholders?
      "Developed Power BI reports and dashboards for internal stakeholders.",
      "Worked hands-on with Microsoft Fabric and Azure data tools, which led to a full-time offer after three months.",
    ],
  },
  {
    period: "2021 – 2025",
    role: "BSCS, Computer Science",
    company: "Dawood University of Engineering & Technology",
    points: [
      "Focus areas: Data Engineering, Database Systems, Software Engineering, Cloud Computing, Machine Learning, Artificial Intelligence.",
      "Final year project: Cloud-Based Predictive Maintenance on AWS.",
    ],
  },
];

export const certifications = [
  { code: "DP-700", name: "Microsoft Fabric Data Engineer Associate", issuer: "Microsoft", featured: true },
  { code: "PL-300", name: "Microsoft Power BI Data Analyst Associate", issuer: "Microsoft", featured: true },
  { code: "Coursera", name: "Microsoft Power BI & Power Platform for Productivity", issuer: "Coursera", featured: false },
];

export const services = [
  {
    title: "Data platforms on Fabric & Azure",
    body: "Medallion lakehouses, metadata-driven ELT and governed models that turn scattered ERP, CRM and operational data into one trusted source.",
    points: ["Microsoft Fabric & Azure", "Metadata-driven pipelines", "Star schemas & SCD", "CI/CD with Azure DevOps"],
  },
  {
    title: "Power BI dashboards",
    body: "Executive-ready semantic models and dashboards with the DAX, security and refresh strategy done properly from day one.",
    points: ["Semantic models & DAX", "RLS / CLS security", "Incremental refresh", "KPI frameworks"],
  },
  {
    title: "AI & RAG document solutions",
    body: "Document processing and natural-language search over your files, with every answer cited back to its source.",
    points: ["OCR & classification", "RAG search", "Grounded, cited answers", "Audit-ready design"],
  },
];
