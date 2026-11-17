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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://muzzammil-ahmed.vercel.app",
  heroLine: "I turn messy enterprise data into decisions — and build AI that's safe enough for banks.",
  description:
    "Data Engineer, BI Developer and Data & AI Consultant at Innolytix, Karachi. Data platforms on Microsoft Fabric, Azure, AWS and Snowflake, Power BI analytics, and governed GenAI / RAG solutions. DP-700 + PL-300 certified.",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const about = {
  story: [
    "I'm a Data Engineer and BI Developer who likes the unglamorous part: taking ERP, CRM, core-banking and operational data that doesn't agree with itself, and turning it into governed, high-performance platforms people actually trust.",
    "I started at Innolytix as a Data Engineering intern in September 2025 and was offered a full-time role three months later. Since then I've architected Medallion platforms on Microsoft Fabric and Azure, built enterprise Power BI semantic models, and delivered AI-powered document and search solutions across banking, insurance, logistics and retail.",
    "On the side, I build BankSphere AI — governed AI for KYC and compliance — because I think AI in regulated industries has to be explainable, auditable and safe before it's clever.",
  ],
  stats: [
    { value: 5, suffix: "", label: "Enterprise & cloud platforms delivered" },
    { value: 4, suffix: "", label: "Sectors: banking, insurance, logistics, retail" },
    { value: 4, suffix: "", label: "Cloud platforms: Fabric, Azure, AWS, Snowflake" },
    { value: 1000, suffix: "+", label: "Automated tests on BankSphere AI" },
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
      media: "kyc.png",
    },
    {
      id: "detective",
      kicker: "02 — Officer desk",
      title: "AI Compliance Detective",
      body: "Officers ask questions about a case and get grounded answers with citations back to the evidence — not free-floating model output.",
      art: "detective",
      media: "detective.png",
    },
    {
      id: "challenge",
      kicker: "03 — Human in charge",
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
      media: "audit.png",
    },
    {
      id: "redteam",
      kicker: "08 — Proof",
      title: "Red-team & evaluation suites",
      body: "Adversarial red-team and evaluation suites run alongside 1000+ automated tests to keep the AI honest as it changes.",
      art: "redteam",
      media: "tests.png",
    },
  ] satisfies Feature[],
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  sector: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  hue: number; // accent hue for the card visual
  nodes: string[]; // pipeline drawn in the card visual
};

export const projects: Project[] = [
  {
    slug: "intelligent-document-processing",
    index: "02",
    name: "Intelligent Document Processing & Compliance Platform",
    sector: "Insurance",
    summary: "AI-powered classification, OCR and routing of claims and policy documents, with RAG search over historical cases.",
    description:
      "Built an AI-powered document platform using IBM FileNet, IBM Datacap and IBM Watsonx.ai to automate classification, OCR extraction and routing of claims and policy documents.",
    highlights: [
      "Added a RAG search layer so claims officers could query historical case files in natural language while preserving full audit and records-management compliance.",
      "Integrated CMIS-based records lifecycle management to enforce retention policies.",
      "Reduced manual claims triage effort by automatically routing high-priority cases based on document content and risk indicators.",
    ],
    stack: ["IBM FileNet", "IBM Datacap", "IBM Watsonx.ai", "RAG", "OCR", "CMIS"],
    hue: 200,
    nodes: ["Documents", "Datacap OCR", "Watsonx.ai", "FileNet", "RAG search"],
  },
  {
    slug: "real-time-fleet-control-tower",
    index: "03",
    name: "Real-Time Fleet Control Tower",
    sector: "Logistics & transportation",
    summary: "Real-time IoT analytics tracking a live vehicle fleet — health, geofencing, fuel efficiency and driver behaviour.",
    description:
      "Engineered a real-time IoT analytics platform on Azure IoT Hub, Microsoft Fabric Eventstream, Eventhouse and Fabric Activator to track a live vehicle fleet.",
    highlights: [
      "Enabled proactive vehicle health monitoring, geofencing alerts and fuel efficiency tracking, reducing unplanned downtime through telemetry-driven maintenance planning.",
      "Layered in driver behaviour scoring and route-deviation alerts on top of historical telemetry.",
      "Built executive Power BI dashboards summarising fleet utilisation and maintenance costs for operational decision-making.",
    ],
    stack: ["Azure IoT Hub", "Fabric Eventstream", "Eventhouse", "Fabric Activator", "KQL", "Power BI"],
    hue: 165,
    nodes: ["Vehicles", "IoT Hub", "Eventstream", "Eventhouse", "Activator"],
  },
  {
    slug: "enterprise-performance-analytics",
    index: "04",
    name: "Enterprise Performance Analytics Platform",
    sector: "Banking",
    summary: "Governed Medallion platform on Fabric Direct Lake unifying core banking, treasury and CRM data.",
    description:
      "Architected an enterprise analytics platform on Microsoft Fabric Direct Lake, consolidating core banking, treasury and CRM data into a governed Medallion Architecture.",
    highlights: [
      "Automated Data Factory quality controls and configured identity-based RLS mapped to branch and regional hierarchies for audit and regulatory reporting.",
      "Built enterprise Power BI semantic models with incremental refresh and DAX-driven KPI reporting for branch managers and executives.",
      "Established Azure DevOps CI/CD pipelines to standardise deployment and improve reporting turnaround for compliance reviews.",
    ],
    stack: ["Microsoft Fabric", "Direct Lake", "Data Factory", "Medallion", "Power BI", "RLS", "Azure DevOps"],
    hue: 220,
    nodes: ["Core banking", "Bronze", "Silver", "Gold", "Power BI"],
  },
  {
    slug: "cross-cloud-revenue-intelligence",
    index: "05",
    name: "Cross-Cloud Revenue Intelligence Platform",
    sector: "Retail & e-commerce",
    summary: "Secure analytics across AWS, Snowflake and Fabric unifying sales, inventory and customer data, with CLV segmentation.",
    description:
      "Architected a secure cross-cloud analytics solution across AWS, Snowflake and Microsoft Fabric to unify sales, inventory and customer data for a multi-channel retailer.",
    highlights: [
      "Built governed semantic models for unified revenue and CLV reporting, with RLS and CLS restricting regional margin data by role.",
      "Automated daily ingestion pipelines from POS and e-commerce systems.",
      "Delivered merchandising dashboards that segmented customers by lifetime value to guide targeted promotions and inventory allocation.",
    ],
    stack: ["AWS", "Snowflake", "Microsoft Fabric", "Power BI", "RLS / CLS", "CLV modelling"],
    hue: 185,
    nodes: ["POS + web", "AWS", "Snowflake", "Fabric", "CLV"],
  },
  {
    slug: "cloud-predictive-maintenance",
    index: "06",
    name: "Cloud-Based Predictive Maintenance",
    sector: "Final year project",
    summary: "Cloud platform on AWS predicting remaining useful life and failure probability from sensor telemetry.",
    description:
      "Built a cloud data platform using AWS S3, EC2, SageMaker and Power BI to monitor industrial equipment health and predict maintenance requirements.",
    highlights: [
      "Engineered time-series and vibration-based features from sensor telemetry, and trained and evaluated models to estimate remaining useful life and failure probability.",
      "Deployed the best-performing model behind a lightweight API and validated results against historical failure logs.",
      "Automated ingestion pipelines and created executive dashboards to support proactive maintenance planning.",
    ],
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
    period: "Dec 2025 — Present",
    role: "Data Engineer / BI Developer",
    company: "Innolytix",
    points: [
      "Architected enterprise-scale analytics platforms on Microsoft Fabric and Azure, implementing Medallion architecture to integrate ERP, CRM and operational systems.",
      "Developed metadata-driven ELT pipelines and dimensional / star-schema models for high-performance analytical workloads.",
      "Implemented partitioning and optimization strategies to improve processing efficiency on high-volume datasets.",
      "Built enterprise Power BI semantic models with complex DAX, time intelligence, variance analysis and rolling KPIs; configured incremental refresh, RLS and governed semantic layers.",
      "Established Azure DevOps-driven CI/CD for analytics and BI solutions.",
    ],
  },
  {
    period: "Sept 2025 — Nov 2025",
    role: "Data Engineering Intern",
    company: "Innolytix",
    points: [
      "Built and tested ELT pipelines and data validation workflows with the Data Engineering team.",
      "Helped develop Power BI reports and dashboards for internal stakeholders.",
      "Hands-on with Microsoft Fabric and Azure data engineering tools — leading to a full-time offer.",
    ],
  },
  {
    period: "2021 — 2025",
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
  { code: "PL-300", name: "Microsoft Power BI Data Analyst", issuer: "Microsoft", featured: true },
  { code: "Coursera", name: "Microsoft Power BI & Power Platform for Productivity", issuer: "Coursera", featured: false },
  { code: "Snowflake", name: "Snowflake Training — Batches 1 to 4", issuer: "Snowflake", featured: false },
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
    body: "Document processing and natural-language search over your files — grounded, cited and built with audit and compliance in mind.",
    points: ["OCR & classification", "RAG search", "Grounded, cited answers", "Audit-ready design"],
  },
];
