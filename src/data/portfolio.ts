import brightMindsImage from "../assets/project-bright-minds.jpg";
import sparkRacingImage from "../assets/project-spark-racing.jpg";

export const links = {
  email: "shehansilva2013@gmail.com",
  github: "https://github.com/shehan-dev",
  githubUser: "shehan-dev",
  linkedin: "https://linkedin.com/in/shehan-s-3912bb122",
  medium: "https://medium.com/@shehansilvak",
  resume: "/resume.pdf",
};

export const navItems = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Research", id: "research" },
  { label: "Contact", id: "contact" },
] as const;

export const heroStats: { value: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 4, suffix: "+", label: "Years shipping production software" },
  { value: 50, suffix: "+", label: "Customers on a portal I architected" },
  { value: 40, suffix: "%", label: "Faster APIs (20–40%) after a migration I led" },
  { value: 3, label: "Industry & national awards" },
];

export const focusAreas = [
  {
    title: "Frontend architecture",
    copy: "Modular Angular apps (v12–v21, Signals, RxJS) with reusable component libraries and responsive UI systems.",
  },
  {
    title: "APIs & serverless",
    copy: "REST APIs and microservices with Node.js, NestJS and Fastify, plus serverless workloads on AWS Lambda.",
  },
  {
    title: "AI-assisted engineering",
    copy: "AI-assisted migrations and workflows with Cursor and Claude Code, backed by MSc research on code documentation.",
  },
];

export const skillGroups = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Data",
  "Cloud",
  "Tools",
] as const;
export type SkillGroup = (typeof skillGroups)[number];

export const skills: { name: string; group: Exclude<SkillGroup, "All">; core?: boolean }[] = [
  { name: "TypeScript", group: "Languages", core: true },
  { name: "JavaScript", group: "Languages" },
  { name: "Python", group: "Languages" },
  { name: "Java", group: "Languages" },
  { name: "SQL", group: "Languages" },
  { name: "Angular", group: "Frontend", core: true },
  { name: "RxJS", group: "Frontend", core: true },
  { name: "Signals", group: "Frontend" },
  { name: "React", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "Tailwind CSS", group: "Frontend" },
  { name: "Bootstrap", group: "Frontend" },
  { name: "SCSS", group: "Frontend" },
  { name: "Node.js", group: "Backend", core: true },
  { name: "NestJS", group: "Backend", core: true },
  { name: "Fastify", group: "Backend" },
  { name: "Express", group: "Backend" },
  { name: "REST APIs", group: "Backend" },
  { name: "Microservices", group: "Backend" },
  { name: "MongoDB", group: "Data" },
  { name: "Firestore", group: "Data" },
  { name: "SQL Server", group: "Data" },
  { name: "MySQL", group: "Data" },
  { name: "AWS Lambda", group: "Cloud", core: true },
  { name: "API Gateway", group: "Cloud" },
  { name: "CloudWatch", group: "Cloud" },
  { name: "Google Cloud Functions", group: "Cloud" },
  { name: "Firebase", group: "Cloud" },
  { name: "Docker", group: "Cloud" },
  { name: "CI/CD", group: "Cloud" },
  { name: "Git", group: "Tools" },
  { name: "Jest", group: "Tools" },
  { name: "Jira", group: "Tools" },
  { name: "Postman", group: "Tools" },
  { name: "Cursor", group: "Tools" },
  { name: "Claude Code", group: "Tools" },
];

export type Project = {
  slug: string;
  title: string;
  short: string;
  category: "AI & Research" | "Mobile & ML" | "Web";
  year: string;
  domain: string;
  tags: string[];
  stack: string[];
  image?: { src: string; alt: string };
  visual?: "pipeline";
  badge?: string;
  overview: string;
  problem: string;
  solution: string[];
  impact: string[];
  links: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "enterprise-code-comments",
    title: "Enterprise-Aware Code Comment Generation",
    short:
      "MSc research combining CodeT5 + LoRA with semantic retrieval to write comments that understand enterprise context.",
    category: "AI & Research",
    year: "2024–2026",
    domain: "AI · Machine Learning · Developer tooling",
    tags: ["CodeT5 + LoRA", "Sentence-BERT", "FAISS"],
    stack: ["Python", "Transformers (CodeT5)", "LoRA", "Sentence-BERT", "FAISS", "RAG"],
    visual: "pipeline",
    overview:
      "A research-driven system that generates context-aware code comments by combining transformer models with retrieval-augmented generation (RAG).",
    problem:
      "Existing AI tools generate generic comments that lack enterprise context, making them less useful in large-scale systems.",
    solution: [
      "Integrated CodeT5 with LoRA fine-tuning for efficient model training",
      "Used semantic retrieval (Sentence-BERT + FAISS) to inject relevant project context",
      "Designed a pipeline for enterprise-aligned documentation generation",
    ],
    impact: [
      "Improves the developer onboarding experience",
      "Produces more meaningful, context-aware documentation",
      "Bridges the gap between AI and enterprise development workflows",
    ],
    links: [
      { label: "Research summary", href: "#research" },
      { label: "GitHub", href: links.github, external: true },
    ],
  },
  {
    slug: "bright-minds",
    title: "Bright Minds: Assistive Technology for Educational Inclusion",
    short:
      "A mobile app and therapist web portal that help children with Down syndrome build speech, cognitive and motor skills.",
    category: "Mobile & ML",
    year: "2023",
    domain: "AI · Mobile · Accessibility",
    tags: ["React Native", "Flask", "Deep Learning"],
    stack: [
      "React Native",
      "React.js",
      "Node.js",
      "Flask",
      "Python",
      "Deep Learning",
      "Machine Learning",
      "MongoDB",
    ],
    image: {
      src: brightMindsImage,
      alt: "Illustration of an open book surrounded by connected learning and AI icons",
    },
    overview:
      "An assistive technology system that helps children with Down syndrome raise their skill levels and bridge the educational gap with other children.",
    problem:
      "Children with Down syndrome face speech, cognitive and fine/gross motor skill difficulties that mainstream learning tools don't address individually.",
    solution: [
      "A mobile app with activities for speech, cognitive and fine/gross motor skills, developed under the advice and supervision of industry experts",
      "Point-based activities that keep children motivated to practise daily under their parents' guidance",
      "A web application for therapists to enrol children and customise activities for each child",
      "Machine learning and deep learning models behind the interactive activities",
    ],
    impact: [
      "Makes therapy-guided learning individual rather than one-size-fits-all",
      "Supports inclusive education through technology",
      "Runner-Up at InnoServe 2023 in Taipei, Taiwan",
    ],
    links: [
      { label: "See the award", href: "#recognition" },
      { label: "GitHub", href: links.github, external: true },
    ],
  },
  {
    slug: "spark-racing",
    title: "Spark Racing Website",
    short:
      "The official website for Team Spark Racing, built to carry the team's motorsport identity, achievements and partners.",
    category: "Web",
    year: "2026",
    domain: "Web development · Branding",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
    image: {
      src: sparkRacingImage,
      alt: "Spark Racing kart at speed on track with motion-blurred background",
    },
    overview:
      "Official website for Team Spark Racing, showcasing team presence, achievements and motorsport identity.",
    problem:
      "The team needed a fast, credible home online that represents the brand to fans, sponsors and partners and can grow with the season.",
    solution: [
      "Clean, performance-focused UI",
      "Represents the racing brand's identity digitally",
      "Structured for scalability and future content expansion",
    ],
    impact: [
      "Live in production at sparkracing.lk",
      "Gives the team one home for its story, achievements and partners",
    ],
    badge: "My hobby · Motorsport",
    links: [
      { label: "Follow my hobby", href: "https://www.sparkracing.lk/", external: true },
      { label: "GitHub", href: links.github, external: true },
    ],
  },
];

export const projectFilters = ["All", "AI & Research", "Mobile & ML", "Web"] as const;

export type TimelineEntry = {
  kind: "work" | "education";
  period: string;
  title: string;
  org: string;
  mark: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    period: "Dec 2024 – Present",
    title: "Software Engineer",
    org: "Random Software Ltd.",
    mark: "RS",
    summary:
      "Full-stack engineer building scalable enterprise applications for international clients with Angular and Node.js.",
    points: [
      "Architected a customer-portal frontend from the ground up in Angular 21 (Signals, reusable components), serving 50+ customers",
      "Built reusable UI modules and REST API integrations, cutting feature delivery time by 20%",
      "Led frontend modernization and an AI-assisted migration of Angular and backend services (Hapi.js → Fastify), improving API response time by 20–40%",
      "Designed a modular mini-app marketplace architecture on AWS Lambda, API Gateway and CloudWatch",
      "Peer code reviews and solution design with international stakeholders",
    ],
    tags: ["Angular 21", "RxJS", "Fastify", "AWS Lambda"],
  },
  {
    kind: "work",
    period: "Nov 2022 – Nov 2024",
    title: "Associate Software Engineer & Intern",
    org: "Random Software Ltd.",
    mark: "RS",
    summary: "Delivered full-stack features from inception to delivery in Agile teams.",
    points: [
      "Built full-stack features with Angular and NestJS, and responsive UIs with Tailwind CSS",
      "Took part in requirements analysis, solution design and architecture decisions",
      "Contributed to sprint deliveries and client requirements",
    ],
    tags: ["Angular 16", "NestJS", "Tailwind CSS"],
  },
  {
    kind: "work",
    period: "Feb 2022 – Aug 2022",
    title: "Intern Software Engineer",
    org: "Q2 Soft",
    mark: "Q2",
    summary: "First production experience across .NET APIs and AngularJS frontends.",
    points: [
      "Built RESTful APIs in .NET Core and implemented data binding in AngularJS frontends",
      "Optimized SQL stored procedures to speed up reporting by 50%",
      "Fixed sprint and client-reported bugs in a Scrum team; presented new features to stakeholders",
    ],
    tags: [".NET Core", "AngularJS", "SQL"],
  },
  {
    kind: "education",
    period: "2024 – 2026",
    title: "MSc in Information Technology",
    org: "SLIIT · Enterprise Application Development",
    mark: "MSc",
    summary: "Research in enterprise-aware code documentation generation.",
    points: [
      "Transformer models (CodeT5, LoRA) with semantic retrieval (Sentence-BERT, FAISS)",
      "Focus on improving the developer onboarding experience",
    ],
    tags: ["Research", "NLP", "RAG"],
  },
  {
    kind: "education",
    period: "2020 – 2023",
    title: "BSc in Information Technology",
    org: "SLIIT · Specialized in Software Engineering",
    mark: "BSc",
    summary: "Final CGPA 3.59 and Dean's List for three semesters.",
    points: [
      "Dean's List: three semesters",
      "Runner-Up at InnoServe 2023 with the Bright Minds team",
    ],
    tags: ["Software Engineering"],
  },
];

export const awards = [
  {
    name: "InnoServe 2023",
    result: "Runner-Up",
    detail: "International ICT Innovative Services Awards · Taipei, Taiwan",
  },
  { name: "NBQSA 2023", result: "Merit Award", detail: "National Best Quality Software Awards" },
  { name: "CEO 2.0 2023", result: "Winner", detail: "All Island Case Study Competition" },
];

export const researchSteps = [
  {
    label: "Source code",
    detail:
      "A function or class from an enterprise codebase is the input, together with its surrounding module.",
  },
  {
    label: "Retrieve context",
    detail:
      "Sentence-BERT embeds the code; FAISS finds similar snippets, conventions and docs from the same project.",
  },
  {
    label: "Generate",
    detail:
      "A LoRA-fine-tuned CodeT5 model generates a comment conditioned on the code and the retrieved context.",
  },
  {
    label: "Enterprise-aware comment",
    detail:
      "The output follows the project's vocabulary and conventions, helping new developers onboard faster.",
  },
];

export const researchSnippet = `# Retrieval-augmented comment generation (simplified)
query   = sbert.encode(source_code)
context = faiss_index.search(query, k=5)      # project-specific examples
prompt  = build_prompt(source_code, context)  # inject enterprise context
comment = codet5_lora.generate(prompt)        # LoRA-tuned CodeT5`;
