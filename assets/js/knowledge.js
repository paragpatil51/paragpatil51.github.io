/* Knowledge base for the AI assistant's BM25 retriever.
   Each passage is self-contained so it can be shown on its own as an answer.
   `k`    extra keywords/synonyms that boost recall without changing the text
   `href` the section the answer is sourced from (shown as a source chip)
   `next` follow-up questions suggested after this passage is used */
window.KNOWLEDGE = [
  {
    id: "about",
    title: "About Parag",
    href: "#top",
    text: "Parag Patil is a GenAI / LLM engineer from Nashik, India. He builds production LLM systems end to end: RAG pipelines, multi-agent AI assistants, LLM data pipelines and the FastAPI + React apps around them. He holds a B.E. in Artificial Intelligence & Data Science, spent a year as the acting AI team lead at his previous company, a cybersecurity product firm, and writes long-form articles on AI engineering on LinkedIn.",
    k: "who is parag introduce yourself summary overview background profile genai llm engineer ai ml",
    next: ["What did he build at his last job?", "What are his core skills?", "When can he join?"]
  },
  {
    id: "availability",
    title: "Availability & location",
    href: "#contact",
    text: "Parag is available now and can join immediately (0-day notice). He is based in Nashik and prefers Pune, where he is happy to work from the office; he is also open to Mumbai, Bengaluru, Hyderabad and remote roles. The best way to reach him is <a href=\"https://www.linkedin.com/in/parag-patil-824b52253/\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>.",
    k: "join joining notice period when start available availability relocate relocation location city pune mumbai bangalore bengaluru hyderabad remote hire hiring open to work office",
    next: ["How do I contact him?", "What did he build at his last job?", "How many years of experience does he have?"]
  },
  {
    id: "contact",
    title: "Contact",
    href: "#contact",
    text: "The fastest way to reach Parag is a message on <a href=\"https://www.linkedin.com/in/parag-patil-824b52253/\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>. His code is on <a href=\"https://github.com/paragpatil51\" target=\"_blank\" rel=\"noopener\">GitHub (paragpatil51)</a>, and his résumé is available as a <a href=\"assets/Parag-Patil-Resume.pdf\" target=\"_blank\" rel=\"noopener\">PDF</a>.",
    k: "contact reach email phone message linkedin github resume cv download talk interview",
    next: ["When can he join?", "Why should we hire him?"]
  },
  {
    id: "previous-company",
    title: "Previous company",
    href: "#experience",
    text: "At his previous company, a cybersecurity product firm (Jul 2025 – Jun 2026), Parag was a Trainee Developer who acted as the company's AI team lead. He led all AI development across its products: he built QPulse (an LLM threat-intelligence platform) on his own, built the document RAG pipeline and the specialist agents for the QStellar AI assistant, and built QDetect, an ML alert-triage module. He also set practices for secure coding, data privacy and QA across the SDLC.",
    k: "job employer role title trainee developer team lead company last current previous firm organisation organization",
    next: ["Tell me about QPulse", "Has he built RAG pipelines?", "Tell me about QDetect"]
  },
  {
    id: "interviewer",
    title: "Leadership & interviewing",
    href: "#experience",
    text: "Within a year of being a candidate himself, Parag represented his previous company at campus placement drives across engineering colleges in February 2026: he presented QPulse to students on stage and led the technical evaluations of candidates. The photos are in the slideshow at the top of this page and in his <a href=\"https://www.linkedin.com/feed/update/urn:li:activity:7427387244249972736/\" target=\"_blank\" rel=\"noopener\">LinkedIn post</a>. As acting AI team lead, he also set the team's practices for secure coding, data privacy and QA.",
    k: "leadership led lead leader leading team teams mentor mentoring interviewer interviewing hiring placement drive drives campus college colleges recruit recruitment presentation public speaking speaker team management soft skills",
    next: ["What does his recommendation letter say?", "What did he build at his last job?"]
  },
  {
    id: "qpulse",
    title: "QPulse",
    href: "#qpulse",
    text: "<a href=\"https://qpulse.quasarcybertech.com/\" target=\"_blank\" rel=\"noopener\">QPulse</a> is a cyber threat-intelligence platform Parag built alone, end to end. It ingests global security feeds plus Indian sources such as CERT-In and RBI, and Gemma-3-27B (temperature 0.1) turns each article into structured JSON: severity, a 1–10 risk score, executive summary, MITRE ATT&CK TTPs, CVEs, IOCs and recommendations. It also translates articles into 7 Indian languages and sends personalised email digests. Stack: FastAPI, PostgreSQL, React 19, TypeScript and Tailwind.",
    k: "qpulse threat intelligence news platform gemma structured output json extraction feeds rss cert-in rbi sole developer solo",
    next: ["How does he reduce LLM cost?", "Which LLMs has he used?", "Tell me about QStellar"]
  },
  {
    id: "cost",
    title: "Reducing LLM cost",
    href: "#qpulse",
    text: "Parag treats tokens as a budget. In QPulse he trims article content before the model call, de-duplicates URLs so nothing is analysed twice, processes in batches of 20 with cooldowns and retries on rate-limit errors, and runs the translation engine under a token-budget limiter (60 requests and 15k tokens per minute). In QStellar, factual questions skip the LLM entirely and go straight to SQL.",
    k: "cost reduce cheaper tokens token optimization optimisation latency speed rate limit budget batching dedup truncation efficient api spend",
    next: ["How does he prevent hallucinations?", "Tell me about QPulse"]
  },
  {
    id: "rag",
    title: "Document RAG pipeline",
    href: "#qstellar",
    text: "Yes. Parag built QStellar's document RAG pipeline: LangChain loaders for PDF, DOCX, CSV and Excel; chunk sizes tuned per type (1000/150 for PDFs, 1200/200 for text, 500/50 for tables); BAAI bge-small-en-v1.5 embeddings via FastEmbed; a separate ChromaDB collection per user or session; and cited answers from a local Qwen2-7B model, cross-referenced against the platform's CVE data.",
    k: "rag retrieval augmented generation vector database vectordb chromadb embeddings chunking langchain documents pdf semantic search citations qstellar",
    next: ["Has he built AI agents?", "How does he keep data private?", "How does he prevent hallucinations?"]
  },
  {
    id: "agents",
    title: "Multi-agent assistant",
    href: "#qstellar",
    text: "Parag worked on QStellar's multi-agent AI assistant and built its specialist agents for assets, vulnerabilities, threats and executive summaries. A scope guard rejects off-topic queries, a router classifies each question as factual, analytical or conversational, factual ones go straight to SQL, and analytical ones run the agents in parallel under 8s / 18s timeouts before a local LLM synthesises the answer and a grounding layer checks it against the database.",
    k: "agents agentic multi-agent orchestration orchestrator router routing assistant chatbot tools parallel asyncio qstellar",
    next: ["How does he prevent hallucinations?", "Has he built RAG pipelines?", "What is harness engineering?"]
  },
  {
    id: "grounding",
    title: "Preventing hallucination",
    href: "#approach",
    text: "Parag's approach is to ground before generating. In QStellar, questions that have exact answers bypass the LLM and run as SQL. LLM answers pass through a grounding layer that checks the CVE IDs, counts and severities they mention against real data, and every response carries a confidence level and a source. Context budgets per agent and a circuit breaker keep the system stable.",
    k: "hallucination hallucinate grounding accuracy reliable trust guardrails safety evaluation validation confidence",
    next: ["Has he built AI agents?", "How does he reduce LLM cost?"]
  },
  {
    id: "models",
    title: "LLMs & models",
    href: "#work",
    text: "In production Parag has used Gemma-3-27B through the Google Gemini API (QPulse analysis and translation) and Qwen2-7B served locally with Ollama (QStellar's private assistant and RAG), with BAAI bge-small embeddings for retrieval. He evaluated several local LLMs through Ollama before choosing, and fine-tuned a ~3B-parameter open model on cybersecurity reports.",
    k: "llm llms models model which gemma qwen gemini ollama local open source openai claude llama embeddings bge",
    next: ["Has he fine-tuned models?", "How does he keep data private?"]
  },
  {
    id: "finetune",
    title: "Fine-tuning",
    href: "#experience",
    text: "Parag fine-tuned a ~3B-parameter open model on an in-house dataset of cybersecurity reports; the team ultimately chose Gemma-3-27B through the API for production, a practical lesson in when fine-tuning pays off. He has also written an explainer, “LLM Fine-Tuning Explained Simply: LoRA and QLoRA”.",
    k: "fine-tuning finetuning fine tune train training custom model lora qlora peft dataset adapters",
    next: ["Summarise his LoRA article", "Which LLMs has he used?"]
  },
  {
    id: "private",
    title: "Privacy & local LLMs",
    href: "#approach",
    text: "When data can't leave the network, Parag brings the model to the data. QStellar's assistant and document Q&A run on Qwen2-7B served locally through Ollama, and each user's documents live in their own ChromaDB collection so one tenant's files never reach another's answers.",
    k: "privacy private on-premise on prem local self-hosted data security tenant isolation ollama gdpr",
    next: ["Has he built RAG pipelines?", "What is his security mindset?"]
  },
  {
    id: "qdetect",
    title: "QDetect",
    href: "#qdetect",
    text: "QDetect is a QStellar module Parag built entirely alone. It connects to a Wazuh SIEM (REST API and OpenSearch) and syncs agents, alerts, vulnerabilities and CISA KEV data into PostgreSQL. Over 83,321 real alerts, a rule-based pass flagged about 84% (70,336) as noise without ever suppressing MITRE-mapped, critical, ransomware or endpoint signals. The remaining ~12k grey-zone alerts are scored by a 4-model ensemble (Isolation Forest, DBSCAN, Random Forest, KNN), and each asset gets a 0–100 security score. It has 80+ FastAPI endpoints.",
    k: "qdetect soc siem wazuh alerts triage noise suppression anomaly detection security score machine learning ensemble",
    next: ["What machine learning has he done?", "Tell me about QPulse"]
  },
  {
    id: "ml",
    title: "Machine learning",
    href: "#skills",
    text: "Parag's applied ML work centres on scikit-learn: QDetect's 4-model ensemble (Isolation Forest, DBSCAN, Random Forest, KNN) for alert-noise scoring, plus earlier projects like a loan-approval classifier and Big Mart sales regression. He has also used TensorFlow and PyTorch, and holds Infosys Springboard's Deep Learning for Developers certificate.",
    k: "machine learning ml scikit-learn sklearn classification regression clustering tensorflow pytorch deep learning neural networks data science models",
    next: ["Tell me about QDetect", "What certifications does he have?"]
  },
  {
    id: "etl",
    title: "Data pipelines & ETL",
    href: "#experience",
    text: "Parag built automated data-gathering modules and ETL pipelines that ingested and cleaned roughly 300,000 records for model training and semantic search. In QPulse, raw LLM output lands in PostgreSQL staging tables (JSONB with GIN indexes) and an ETL job promotes it to clean, de-duplicated tables. He has also written a guide to web-scraping ETL pipelines.",
    k: "etl data pipeline pipelines ingestion scraping web scraping data engineering 300k records postgres staging scheduler cleaning",
    next: ["Summarise his web scraping article", "Tell me about QPulse"]
  },
  {
    id: "stack",
    title: "Tech stack",
    href: "#skills",
    text: "Parag's core stack is Python with FastAPI, PostgreSQL, LangChain, ChromaDB, Ollama and the Gemini API on the AI side, scikit-learn for ML, and React + TypeScript + Tailwind on the frontend. He has also worked with Docker, AWS, Google Cloud, Nginx and CI/CD, and has working knowledge of Java and C++.",
    k: "skills core stack technologies tools languages python fastapi react typescript tailwind docker aws gcp nginx java c++ sql frontend backend full stack",
    next: ["What certifications does he have?", "Has he built RAG pipelines?"]
  },
  {
    id: "frontend",
    title: "Frontend work",
    href: "#qstellar",
    text: "Parag built the frontends for both QPulse (React 19, TypeScript, Vite, Tailwind, with world-map and industry heat-map views) and QStellar (React + TypeScript), and wired them to the AI modules behind them, so he can own a GenAI feature from model call to UI.",
    k: "frontend front-end ui react typescript tailwind vite full stack fullstack web dashboard",
    next: ["What are his core skills?", "Tell me about QPulse"]
  },
  {
    id: "security",
    title: "Security mindset",
    href: "#approach",
    text: "Building for security teams shaped how Parag ships AI. His APIs come with tiered rate limits, reCAPTCHA v3, security-headers middleware and masked errors (QPulse), and AI features get scope guards, circuit breakers and audit trails (QStellar). He also knows SOC tooling such as Wazuh, MITRE ATT&CK and CISA KEV.",
    k: "security secure cybersecurity rate limiting recaptcha owasp secure by design soc mitre mindset",
    next: ["Tell me about QDetect", "How does he keep data private?"]
  },
  {
    id: "writing",
    title: "Writing",
    href: "#writing",
    text: "Parag has published six long-form articles on LinkedIn, followed by 870+ people. The most recent are “Harness Engineering: The Discipline That Decides How Smart Your AI Looks” (Jul 2026) and “LLM Fine-Tuning Explained Simply: LoRA and QLoRA” (Jul 2026). Earlier pieces cover web-scraping ETL pipelines, Tableau calculated fields, humanoid robots and AI's impact on society. His style: plain explanations first, depth second, with caveats included.",
    k: "writing written write articles article blog blogs posts linkedin publications author published thought leadership",
    next: ["What is harness engineering?", "Summarise his LoRA article", "Summarise his web scraping article"]
  },
  {
    id: "harness",
    title: "Article: Harness Engineering",
    href: "#writing",
    text: "In “Harness Engineering” (Jul 2026, 14-minute read), Parag argues that the code around a model now matters more than the model: Agent = Model + Harness. He synthesises OpenAI's million-line agent-written codebase, Anthropic's planner–generator–evaluator harness, and recent research, then adds a skeptic's corner. His takeaway: good harnesses are built to shrink as models improve, and QPulse taught him this before the term existed.",
    k: "harness engineering article agents agent model scaffold scaffolding openai anthropic codex claude code context engineering",
    next: ["Summarise his LoRA article", "Has he built AI agents?"]
  },
  {
    id: "lora",
    title: "Article: LoRA & QLoRA",
    href: "#writing",
    text: "In “LLM Fine-Tuning Explained Simply: LoRA and QLoRA” (Jul 2026), Parag explains why full fine-tuning is so memory-hungry, how LoRA freezes the base weights and trains two small low-rank matrices (h = W₀x + BAx), and how QLoRA's 4-bit NF4 base, double quantisation and paged optimisers bring a 65B model under 48 GB. He closes with a practical workflow and the rule to try prompting or retrieval first.",
    k: "lora qlora article fine-tuning low rank adaptation quantization quantisation peft summarise summary",
    next: ["Has he fine-tuned models?", "What is harness engineering?"]
  },
  {
    id: "scraping",
    title: "Article: Web scraping pipelines",
    href: "#writing",
    text: "In “Data Collection Through Web Scraping: Techniques, Pipelines, and AI” (Sep 2025), Parag covers Requests, BeautifulSoup, Scrapy and headless browsers; reverse-engineering hidden JSON APIs; treating scraping as the Extract step of an ETL pipeline; how LLMs make parsers resilient to layout changes; and ethics such as robots.txt, throttling and data quality.",
    k: "web scraping article scraper beautifulsoup scrapy selenium playwright etl summarise summary",
    next: ["Has he built data pipelines?", "What has he written?"]
  },
  {
    id: "certs",
    title: "Certifications",
    href: "#skills",
    text: "Parag's certifications: Foundry & AIP Builder Foundations (Palantir, Apr 2025); Deep Learning for Developers (Infosys Springboard, Oct 2024); Career Essentials in Data Analysis (Microsoft & LinkedIn, Oct 2024); Advanced Excel with a 97% score over 120 hours (MKCL KLiC, May 2024); and a Data Science course (TechnoKraft, Aug 2023).",
    k: "certifications certification certificate certificates courses palantir foundry aip infosys springboard microsoft excel credentials",
    next: ["What are his core skills?", "What is his education?"]
  },
  {
    id: "education",
    title: "Education",
    href: "#experience",
    text: "Parag earned a B.E. in Artificial Intelligence & Data Science from K.K. Wagh Institute of Engineering Education & Research, Nashik (2021–2025), with a CGPA of 8.24/10. Before that he completed his HSC (Science) at Ram Raj Jr. College, Nashik, in 2021.",
    k: "education degree college university cgpa gpa grades graduation qualification be btech engineering school",
    next: ["What certifications does he have?", "What did he build at his last job?"]
  },
  {
    id: "internship",
    title: "TechnoKraft internship",
    href: "#experience",
    text: "From December 2023 to January 2024 Parag was a Data Science Intern at TechnoKraft, where he worked in a team on a loan-approval prediction model with Logistic Regression and visualised the results in Tableau. That project is on his GitHub as the Loan Prediction System.",
    k: "internship intern technokraft loan prediction first job",
    next: ["What other projects has he done?", "What machine learning has he done?"]
  },
  {
    id: "experience-years",
    title: "Years of experience",
    href: "#experience",
    text: "Parag has about one year of professional experience (July 2025 to June 2026) as his previous company's acting AI lead, plus a data-science internship and several years of building ML and AI projects during his degree. He is targeting GenAI / LLM engineering roles that ask for up to around 3 years.",
    k: "years how many years long senior junior fresher level yoe seniority",
    next: ["What did he build at his last job?", "When can he join?"]
  },
  {
    id: "recommendation",
    title: "Recommendation letter",
    href: "#experience",
    text: "The Director of his previous company wrote in a letter of recommendation (August 2026) that Parag “consistently demonstrated a strong willingness to learn, adapt, and take ownership” and “possesses the dedication, technical aptitude, and work ethic required to excel in future opportunities.”",
    k: "recommendation reference references letter lor manager feedback testimonial say says",
    next: ["Has he led a team?", "Why should we hire him?"]
  },
  {
    id: "projects-other",
    title: "Other projects",
    href: "#work",
    text: "Besides his professional work, Parag's public GitHub includes a Loan Prediction System (classification), Big Mart Sales Prediction (regression), a Bank Privacy Demo (cookie and onboarding consent management with an admin dashboard) and college research on the Metaverse and Deepfakes.",
    k: "projects other portfolio github open source side projects personal college",
    next: ["Tell me about QPulse", "What has he written?"]
  },
  {
    id: "volunteer",
    title: "Volunteering",
    href: "#approach",
    text: "Since 2023 Parag has volunteered with Translators without Borders, translating dementia-awareness and cancer-awareness content from English into Marathi, and he was shortlisted by United Nations Volunteers for a UNFPA online meeting on demographic trends.",
    k: "volunteer volunteering hobbies interests un translators extracurricular social",
    next: ["What languages does he speak?", "What has he written?"]
  },
  {
    id: "languages",
    title: "Languages",
    href: "#approach",
    text: "Parag speaks English with professional working proficiency, and Hindi and Marathi at native or bilingual level. That came in handy for QPulse, which translates threat intelligence into Indian regional languages.",
    k: "languages language speak speaks spoken marathi hindi english communication fluent",
    next: ["Tell me about QPulse", "Why should we hire him?"]
  },
  {
    id: "why",
    title: "Why hire Parag",
    href: "#contact",
    text: "Parag has already done the job: he took LLM features from idea to production on his own, on live products, while caring about the unglamorous parts that make GenAI trustworthy, such as grounding, token cost, privacy and security. He can own a feature across the model, the backend and the React UI, explains AI clearly in writing, and is available to join immediately.",
    k: "why hire strengths fit good candidate value stand out unique",
    next: ["When can he join?", "How do I contact him?"]
  }
];
