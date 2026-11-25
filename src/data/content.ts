// Single source of truth for all site copy.
// Everything here comes from the CV or the portfolio brief. Do not add claims that aren't in either.

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
  // The hero shows public/me.jpg automatically once it exists.
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
    "I joined Innolytix as a Data Engineering intern in September 2025 and now work there as a Data Engineer / BI Developer. I've built a governed Medallion platform on Microsoft Fabric for a bank, real-time fleet analytics for a logistics operator, cross-cloud revenue reporting for a retailer, and an AI document and search platform for an insurer.",
    "On the side, I build products: BankSphere AI for KYC in banking, and PlantMind, an AI operations layer for manufacturing. Both start from the same rule: AI in serious industries has to explain itself before it's clever.",
  ],
  // `value` counts up; `text` is shown as-is (for things that aren't a count).
  stats: [
    // 1,041 = `pytest --collect-only` on the BankSphere repo, 2026-11-18. Tests aren't tagged unit/integration/eval, so no split is shown.
    { value: 1041, label: "Automated tests on BankSphere AI" },
    { value: 2, label: "AI products built and shipped: BankSphere AI and PlantMind" },
    { value: 4, label: "Client platforms delivered" },
    { text: "DP‑700 + PL‑300", label: "Microsoft certified" },
  ] as { value?: number; text?: string; label: string }[],
};

/** Public links for a product. Only links that exist are rendered; never add a placeholder. */
export type ProductLinks = { demo?: string; repo?: string; video?: string };

export type Feature = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  art: "decision" | "detective" | "challenge" | "timemachine" | "twin" | "fourEyes" | "audit" | "redteam";
  /** Screenshot in /public/projects/banksphere/. Features without one show a labelled diagram (FeatureArt). */
  media?: string;
};

export const banksphere = {
  slug: "banksphere-ai",
  name: "BankSphere AI",
  tagline: "Governed AI for KYC & compliance in banking.",
  honesty: "Synthetic data, no real customers",
  // Repo is private, so code is shown on request instead of linked.
  links: { demo: "https://app.spherekyc.dpdns.org", video: "/work/banksphere-ai/#demo" } as ProductLinks,
  walkthrough: "BankSphere walkthrough",
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
  ],
  video: "demo.mp4",
  features: [
    {
      id: "kyc",
      kicker: "01 · Onboarding",
      title: "KYC decisions in one pass",
      body: "ID-card OCR, card checks, watchlist screening and a risk score decide the outcome: approve, send to officer review, or ask the customer to resubmit.",
      art: "decision",
      media: "kyc.webp",
    },
    {
      id: "detective",
      kicker: "02 · Officer desk",
      title: "AI Compliance Detective",
      body: "Officers ask questions about a case and get answers that cite the evidence they came from.",
      art: "detective",
      media: "detective.webp",
    },
    {
      id: "challenge",
      kicker: "03 · Human oversight",
      title: "Challenge the AI",
      body: "An officer can push back on any AI conclusion and make it defend or revise its reasoning before a decision is made.",
      art: "challenge",
    },
    {
      id: "timemachine",
      kicker: "04 · Replay",
      title: "Time Machine case replay",
      body: "Replay any case step by step to see exactly what the system knew and decided at each point in time.",
      art: "timemachine",
    },
    {
      id: "twin",
      kicker: "05 · Regulation",
      title: "Regulatory Digital Twin & knowledge graph",
      body: "A digital twin of the regulatory rulebook plus a compliance knowledge graph that links customers, cases, rules and evidence.",
      art: "twin",
    },
    {
      id: "fourEyes",
      kicker: "06 · Financial crime",
      title: "Screening with four-eyes approval",
      body: "Financial-crime screening where sensitive decisions need a second, independent approver before they take effect.",
      art: "fourEyes",
    },
    {
      id: "audit",
      kicker: "07 · Evidence",
      title: "Tamper-evident audit trail",
      body: "Every action lands in a hash-chained audit log with write-once checkpoints, so any after-the-fact edit is detectable.",
      art: "audit",
      media: "audit.webp",
    },
    {
      id: "redteam",
      kicker: "08 · Proof",
      title: "Red-team & evaluation suites",
      body: "Adversarial red-team and evaluation suites run alongside 1,000+ automated tests to keep the AI honest as it changes.",
      art: "redteam",
    },
  ] satisfies Feature[],
};

// Homepage shows 4 of the 8 features; the case study shows all of them.
const byId = (id: string) => banksphere.features.find((f) => f.id === id)!;
export const homeFeatures: Feature[] = [
  { ...byId("kyc"), kicker: "01 · Onboarding" },
  {
    ...byId("detective"),
    kicker: "02 · Officer desk",
    title: "Ask the AI, then challenge it",
    body: "Officers get answers with citations back to the evidence, and can push back on any conclusion before they make the call.",
  },
  { ...byId("audit"), kicker: "03 · Evidence" },
  { ...byId("redteam"), kicker: "04 · Proof" },
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
  honesty: "Synthetic data, no real customers",
  // The hosted demo opens on a sign-in screen; logins are handed out on request.
  links: { demo: "https://plantmind.spherekyc.dpdns.org" } as ProductLinks,
  demoNote: "Demo login on request",
  walkthrough: "PlantMind walkthrough",
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

/** One column of a case-study architecture diagram, left to right (top to bottom on phones). */
export type ArchStage = { id: string; label: string; items: string[] };

export type Project = {
  slug: string;
  index: string;
  name: string;
  sector: string;
  summary: string;
  /** One-line result for the case-study hero. Qualitative unless the owner gives a number. */
  result: string;
  /** 2–3 concrete sentences. */
  problem: string;
  /** What Muzzammil personally owned. Worded per project. */
  role: string;
  /** Only set from the owner's answers. Rows without a value are hidden. */
  team?: string;
  duration?: string;
  architecture: ArchStage[];
  /** Each highlight points at the diagram stage it lives in. */
  highlights: { stage: string; text: string }[];
  /** "I chose X over Y because Z." Only from the owner; the section is hidden until set. */
  decisions?: string[];
  /** One paragraph from the owner; hidden until set. */
  hardProblem?: string;
  results: string[];
  academic?: boolean;
  stack: string[];
  hue: number; // accent hue for the card visual
  nodes: string[]; // pipeline drawn in the homepage card visual
};

export const projects: Project[] = [
  {
    slug: "intelligent-document-processing",
    index: "01",
    name: "Intelligent Document Processing & Compliance Platform",
    sector: "Insurance",
    summary: "AI-powered classification, OCR and routing of claims and policy documents, with RAG search over historical cases.",
    result: "Claims and policy documents are classified, read and routed automatically, and officers search past cases in plain language.",
    problem:
      "An insurer classified claims and policy documents by hand, keyed in their data and routed them to the right team. Past cases sat in a records system with no quick way to search them, and every change had to respect records-management rules.",
    role: "Built the capture, routing and RAG search pipeline on IBM Datacap, FileNet and Watsonx.ai as the Data Engineer at Innolytix.",
    architecture: [
      { id: "sources", label: "Sources", items: ["Claims documents", "Policy documents"] },
      { id: "capture", label: "Capture", items: ["IBM Datacap", "OCR extraction", "Classification"] },
      { id: "store", label: "Records store", items: ["IBM FileNet", "CMIS lifecycle", "Retention policies"] },
      { id: "ai", label: "AI layer", items: ["IBM Watsonx.ai", "RAG over case files", "Risk-based routing"] },
      { id: "use", label: "Used by", items: ["Claims officers", "Priority queues", "Audit"] },
    ],
    highlights: [
      { stage: "capture", text: "Classification, OCR extraction and routing of claims and policy documents with IBM Datacap, FileNet and Watsonx.ai." },
      { stage: "ai", text: "A RAG search layer so claims officers can query historical case files in natural language, with full audit and records-management compliance." },
      { stage: "store", text: "CMIS-based records lifecycle management to enforce retention policies." },
      { stage: "ai", text: "Automatic routing of high-priority cases based on document content and risk indicators." },
    ],
    results: [
      "High-priority cases are routed automatically from their content and risk indicators, so they no longer wait in a manual triage queue.",
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
    summary: "Real-time IoT analytics tracking a live vehicle fleet: health, geofencing, fuel efficiency and driver behaviour.",
    result: "Vehicle health, location, fuel and driver behaviour are visible live, with alerts raised as events happen.",
    problem:
      "A logistics operator found out about vehicle faults, route deviations and fuel waste after the fact, from reports run days later. They needed a live view of the fleet and alerts while there was still time to act.",
    role: "Built the streaming path from IoT Hub to Eventhouse, the Activator alert rules and the Power BI dashboards.",
    architecture: [
      { id: "sources", label: "Sources", items: ["Vehicle telemetry", "GPS + engine data"] },
      { id: "ingest", label: "Streaming ingestion", items: ["Azure IoT Hub", "Fabric Eventstream"] },
      { id: "store", label: "Real-time store", items: ["Fabric Eventhouse", "KQL databases", "Historical telemetry"] },
      { id: "logic", label: "Rules & scoring", items: ["Fabric Activator", "Geofencing rules", "Driver scoring (KQL)"] },
      { id: "use", label: "Used by", items: ["Power BI dashboards", "Real-time alerts", "Operations & leadership"] },
    ],
    highlights: [
      { stage: "ingest", text: "Streaming ingestion from Azure IoT Hub into Fabric Eventstream and Eventhouse, with Fabric Activator for real-time alerts." },
      { stage: "logic", text: "Vehicle health monitoring, geofencing alerts and fuel-efficiency tracking." },
      { stage: "store", text: "Driver behaviour scoring and route-deviation alerts on top of historical telemetry." },
      { stage: "use", text: "Executive Power BI dashboards on fleet utilisation and maintenance costs." },
    ],
    results: [
      "Alerts for vehicle health, geofence breaches and route deviations fire while the vehicle is still on the road.",
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
    result: "One governed source for branch performance and regulatory reporting, with access scoped by branch and region.",
    problem:
      "A bank's core banking, treasury and CRM data lived in separate systems that didn't agree with each other. Branch performance and regulatory reports were slow to produce and hard to trust, and access to sensitive figures wasn't tied to the branch hierarchy.",
    role: "Owned the Fabric Medallion layers, the Data Factory quality checks and the Power BI semantic models, plus their CI/CD in Azure DevOps.",
    architecture: [
      { id: "sources", label: "Sources", items: ["Core banking", "Treasury", "CRM"] },
      { id: "ingest", label: "Ingestion", items: ["Data Factory pipelines", "Automated quality checks"] },
      { id: "store", label: "Medallion lakehouse", items: ["Bronze: raw", "Silver: cleaned", "Gold: modelled"] },
      { id: "model", label: "Semantic layer", items: ["Direct Lake models", "DAX KPIs", "Identity-based RLS"] },
      { id: "use", label: "Used by", items: ["Branch managers", "Executives", "Regulatory reporting"] },
    ],
    highlights: [
      { stage: "store", text: "A governed Medallion platform on Microsoft Fabric Direct Lake consolidating core banking, treasury and CRM data." },
      { stage: "ingest", text: "Automated Data Factory quality controls, and identity-based RLS mapped to branch and regional hierarchies." },
      { stage: "model", text: "Enterprise Power BI semantic models with incremental refresh and DAX KPI reporting for branch managers and executives." },
      { stage: "use", text: "Azure DevOps CI/CD pipelines for analytics and BI releases." },
    ],
    results: [
      "One governed source for audit and regulatory reporting, with access scoped to each branch and region.",
      "Analytics and BI changes ship through the same reviewed CI/CD pipeline instead of manual deployments.",
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
    result: "Revenue and customer lifetime value reported in one place across store and online channels.",
    problem:
      "A multi-channel retailer's sales, inventory and customer data was split across AWS, Snowflake and Microsoft Fabric. Revenue and customer value couldn't be reported in one place, and regional margin data needed tighter access control.",
    role: "Built the daily POS and e-commerce ingestion and the governed semantic models with RLS and CLS behind the merchandising dashboards.",
    architecture: [
      { id: "sources", label: "Sources", items: ["POS systems", "E-commerce", "Inventory"] },
      { id: "ingest", label: "Ingestion", items: ["Daily automated pipelines"] },
      { id: "store", label: "Cross-cloud storage", items: ["AWS", "Snowflake", "Microsoft Fabric"] },
      { id: "model", label: "Semantic layer", items: ["Revenue + CLV models", "RLS by role", "CLS on margin"] },
      { id: "use", label: "Used by", items: ["Merchandising dashboards", "Promotions & inventory planning"] },
    ],
    highlights: [
      { stage: "store", text: "A secure analytics layer across AWS, Snowflake and Microsoft Fabric." },
      { stage: "ingest", text: "Automated daily ingestion pipelines from POS and e-commerce systems." },
      { stage: "model", text: "Governed semantic models for unified revenue and CLV reporting, with RLS and CLS restricting regional margin data by role." },
      { stage: "use", text: "Merchandising dashboards that segment customers by lifetime value." },
    ],
    results: [
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
    result: "Remaining useful life and failure probability predicted from sensor data, checked against historical failure logs.",
    problem:
      "Industrial equipment is usually serviced on a fixed schedule or after it breaks. The goal was to predict failures early from sensor telemetry, so maintenance could be planned before a breakdown.",
    role: "My final-year BSCS project at Dawood University of Engineering & Technology: I built the data platform, the models and the dashboards.",
    architecture: [
      { id: "sources", label: "Sources", items: ["Equipment sensors", "Vibration + time series"] },
      { id: "ingest", label: "Ingestion", items: ["Automated pipelines", "AWS S3"] },
      { id: "store", label: "Processing", items: ["AWS EC2", "Feature engineering (Python)"] },
      { id: "model", label: "Models", items: ["AWS SageMaker", "RUL + failure probability", "Prediction API"] },
      { id: "use", label: "Used by", items: ["Power BI dashboards", "Maintenance planning"] },
    ],
    highlights: [
      { stage: "ingest", text: "Cloud data platform on AWS S3, EC2 and SageMaker for equipment telemetry." },
      { stage: "store", text: "Time-series and vibration features, and models estimating remaining useful life and failure probability." },
      { stage: "model", text: "The best-performing model deployed behind a lightweight API." },
      { stage: "use", text: "Automated ingestion pipelines and executive Power BI dashboards." },
    ],
    results: [
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
    ],
  },
  {
    group: "BI & visualisation",
    items: ["Power BI", "DAX", "Semantic modelling", "KPI framework design", "Incremental refresh", "RLS", "CLS"],
  },
  {
    group: "AI & automation",
    items: ["Generative AI", "RAG", "Intelligent Document Processing", "OCR", "AI search", "LLM integrations", "IBM Watsonx.ai"],
  },
  {
    group: "Languages",
    items: ["Python", "SQL", "PySpark", "Spark SQL", "KQL"],
  },
  {
    group: "Tools",
    items: ["Fabric Data Factory", "Apache Airflow", "Docker", "Git"],
  },
  { group: "AWS", items: ["S3", "EC2", "SageMaker"] },
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
  "Docker",
  "RAG",
];

export const experience = [
  {
    period: "Dec 2025 – Present",
    role: "Data Engineer / BI Developer",
    company: "Innolytix",
    // Each bullet: action → what → result. Only add a number the owner has confirmed; never estimate one.
    points: [
      "Built Medallion analytics platforms on Microsoft Fabric and Azure, integrating ERP, CRM and operational systems into one governed source for reporting.",
      "Built metadata-driven ELT pipelines and star-schema models, so new sources are onboarded through configuration rather than new code.",
      "Applied partitioning and query optimisation to high-volume datasets to shorten processing and refresh times.",
      "Delivered Power BI semantic models with complex DAX (time intelligence, variance, rolling KPIs), incremental refresh and RLS for executive reporting.",
      "Set up Azure DevOps CI/CD for analytics and BI, standardising how analytics and BI changes are deployed.",
    ],
  },
  {
    period: "Sep 2025 – Nov 2025",
    role: "Data Engineering Intern",
    company: "Innolytix",
    points: [
      "Built and tested ELT pipelines and data-validation workflows with the Data Engineering team to check data quality before it reached reports.",
      "Developed Power BI reports and dashboards for internal stakeholders.",
      "Worked hands-on with Microsoft Fabric and Azure data tools.",
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
