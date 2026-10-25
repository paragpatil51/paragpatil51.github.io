/* Articles published on LinkedIn, with the figures from each one.
   Images live in assets/img/writing/<slug>/NN.jpg (00 = cover). */
window.ARTICLES = [
  {
    slug: "harness-engineering",
    featured: true,
    tag: "AI agents",
    title: "Harness Engineering: The Discipline That Decides How Smart Your AI Looks",
    date: "2026-07-13",
    read: "14 min read",
    url: "https://www.linkedin.com/pulse/harness-engineering-discipline-decides-how-smart-your-parag-patil-uqhzf/",
    excerpt: "Sixteen models got better at coding overnight, and none of them changed. Only the harness around them did. Why the code around the model now matters more than the model.",
    summary: [
      "A deep dive into the discipline that emerged in February 2026: everything around a model that is not the model. The article pulls together Mitchell Hashimoto, OpenAI, Anthropic, Martin Fowler, Ethan Mollick and Addy Osmani, then checks their claims against the research.",
      "It walks through OpenAI's million-line, agent-written codebase and Anthropic's planner–generator–evaluator harness for long-running agents. It ends with a skeptic's corner and a personal note: building QPulse was harness engineering before the term existed."
    ],
    takeaways: [
      "Agent = Model + Harness: state, tools, feedback loops and enforceable constraints",
      "Context is a map, not a manual. Keep instruction files short and use progressive disclosure",
      "Bind “done” to evidence such as tests and thresholds, never to the model's own claim",
      "Separate generation from evaluation, because models approve their own work",
      "Good harnesses are built to shrink as models improve"
    ],
    figures: [
      "Cover: Harness Engineering, why the code around the model now matters more than the model",
      "The expanding scope of AI engineering: prompt → context → harness",
      "Agent = Model + Harness. The harness supplies state, tools, constraints and feedback",
      "OpenAI's harness: verify against reality, not the agent's word",
      "Anthropic's three-agent harness for long-running builds: planner, generator, evaluator",
      "The harness shrinks as the model improves, across three model generations"
    ]
  },
  {
    slug: "llm-fine-tuning",
    tag: "Fine-tuning",
    title: "LLM Fine-Tuning Explained Simply: LoRA and QLoRA",
    date: "2026-07-08",
    read: "7 min read",
    url: "https://www.linkedin.com/pulse/llm-fine-tuning-explained-simply-lora-qlora-parag-patil-fx7hf/",
    excerpt: "How two ideas turned fine-tuning from a data-center problem into a single-GPU workflow, explained in plain terms first and then in depth.",
    summary: [
      "Starts from plain definitions and goes as deep as the reader wants. It covers why full fine-tuning needs on the order of 1.2 TB of memory for a 175B model, and how LoRA freezes the base weights and trains two small matrices instead, cutting trainable parameters by roughly 10,000×.",
      "QLoRA adds a 4-bit NormalFloat base, double quantisation and paged optimisers, which brings a 65B model from over 780 GB to under 48 GB. It finishes with a practical workflow and a rule of thumb: try prompting or retrieval first."
    ],
    takeaways: [
      "h = W₀x + BAx: freeze W₀, train only B and A",
      "Rank is a dial. Start at 16 across attention and feed-forward layers",
      "QLoRA by default on limited hardware, at about 4× less memory than LoRA",
      "Keep adapters separate and hot-swap a few MB per task over one shared base"
    ],
    figures: [
      "Cover: a frozen base model with small trainable adapters",
      "Where fine-tuning fits in a model's life: pre-training → fine-tuning → alignment",
      "Full fine-tuning vs LoRA: update every weight, or train two small matrices",
      "The trick: a low-rank update factors into two small matrices",
      "QLoRA = LoRA on top of a 4-bit compressed base model",
      "The fine-tuning workflow, end to end: load in 4-bit → attach LoRA → train → merge → deploy"
    ]
  },
  {
    slug: "web-scraping",
    tag: "Data engineering",
    title: "Data Collection Through Web Scraping: Techniques, Pipelines, and AI",
    date: "2025-09-06",
    read: "11 min read",
    url: "https://www.linkedin.com/pulse/data-collection-through-web-scraping-techniques-pipelines-parag-patil-8naof/",
    excerpt: "From requests and BeautifulSoup to headless browsers and hidden JSON APIs: building reliable, ethical scraping pipelines, and where LLMs fit in.",
    summary: [
      "A practical guide for beginner and intermediate developers. It covers the core tools (Requests, BeautifulSoup, Scrapy, Selenium, Playwright), handling JavaScript-heavy pages, and reverse-engineering the JSON endpoints a page already uses.",
      "Scraping is framed as the Extract step of an ETL pipeline, followed by Transform and Load with logging, retries and validation. It then looks at how LLMs make parsers resilient to layout changes, and closes with best practices on robots.txt, throttling and data quality."
    ],
    takeaways: [
      "Check for an official API, or the page's own JSON endpoints, before parsing HTML",
      "Treat scraping as the Extract step of a proper ETL pipeline",
      "Continuously validate scraped data, so schema drift raises alerts early",
      "Respect robots.txt and terms of service, and throttle requests"
    ],
    figures: [
      "Cover: websites → scraping → structured data",
      "Building a web-scraping ETL pipeline: extract → transform → load",
      "Integrating AI into web scraping"
    ]
  },
  {
    slug: "tableau",
    tag: "Analytics",
    title: "Mastering Tableau Calculated Fields: A Step-by-Step Guide",
    date: "2024-10-13",
    read: "4 min read",
    url: "https://www.linkedin.com/pulse/mastering-tableau-calculated-fields-step-by-step-guide-parag-patil-zabgf/",
    excerpt: "Derive the data your dataset doesn't have: calculated fields, IF-THEN logic and FIXED level-of-detail expressions, worked through on Airbnb listings.",
    summary: [
      "A hands-on walkthrough using Airbnb data from Lisbon. It explains why calculated fields go beyond basic filters: segmenting data into bins, simplifying complex expressions and standardising metrics.",
      "It then builds up from a first MONTH() field to IF-THEN classification of weekday and weekend reviews, and to FIXED expressions that compute per-host totals regardless of filters, the Tableau equivalent of SQL's GROUP BY."
    ],
    takeaways: [
      "Calculated fields create variables the dataset doesn't contain",
      "IF-THEN and nested logic for tiered classification",
      "{FIXED …} expressions compute at a set level of detail, like GROUP BY"
    ],
    figures: [
      "Cover: Calculated fields in Tableau",
      "Creating a calculated field",
      "IF-THEN statements: weekday vs weekend reviews",
      "Grouping data with FIXED expressions"
    ]
  },
  {
    slug: "humanoid-robots",
    tag: "Robotics",
    title: "The Fascinating Blend of Tech and Art: Ameca and Neo, Humanoid Robots Pushing the Boundaries of AI",
    date: "2023-07-19",
    read: "3 min read",
    url: "https://www.linkedin.com/pulse/fascinating-blend-tech-art-ameca-neo-humanoid-robots-parag-patil/",
    excerpt: "Two humanoid robots, two philosophies: Ameca's expressive, art-making interaction and Neo's general-purpose intelligence.",
    summary: [
      "A look at Engineered Arts' Ameca, whose expressive face and drawing ability come from generative models, style transfer and precise motor control, alongside the OpenAI-backed Neo robot built as a general-purpose test bed.",
      "It contrasts their approaches, creative interaction versus task versatility, and closes on the ethics of job displacement and responsible human–robot coexistence."
    ],
    takeaways: [
      "Ameca: human-like expression and AI-driven drawing",
      "Neo: a general-purpose humanoid aimed at broad task ability",
      "Progress has to be paired with responsible, ethical deployment"
    ],
    figures: [
      "Cover: human and robot hands",
      "Ameca, the humanoid robot created by Engineered Arts",
      "Humanoid robots from 1X (Neo) and Figure"
    ]
  },
  {
    slug: "ai-revolution",
    tag: "AI & society",
    title: "Embracing the AI Revolution: Transforming Industries and Unleashing Creativity",
    date: "2023-07-17",
    read: "3 min read",
    url: "https://www.linkedin.com/pulse/embracing-ai-revolution-transforming-industries-unleashing-patil/",
    excerpt: "AI's impact on jobs, education, politics and security, and why the opportunity comes with real responsibilities.",
    summary: [
      "My first article. It maps how AI reshapes the job market (as an enabler rather than a replacement), education (personalised and adaptive learning) and, on the darker side, political propaganda and deepfakes.",
      "It also covers the rise of AI voice-cloning scams, a theme I later saw first-hand while building cyber threat intelligence, and argues for proactive, responsible stewardship of the technology."
    ],
    takeaways: [
      "“AI will not replace jobs; people with knowledge of AI will.”",
      "Personalised learning needs equitable access",
      "Deepfakes and voice cloning demand safeguards and digital literacy"
    ],
    figures: [
      "Overview: AI's impact across industries",
      "The job market: AI as an enabler, not a threat",
      "AI in education: empowering learners",
      "The dark side: political propaganda in the AI era",
      "The rise of AI-powered scams: voice-based deception"
    ]
  }
];

/* Short posts from the LinkedIn feed */
window.POSTS = [
  {
    date: "2026-05-23",
    title: "AI is entering the “frustration phase”",
    text: "The global reaction to AI increasingly resembles the Kübler–Ross change curve: shock, denial, and now frustration. Historically, resistance gives way to experimentation and integration. The defining advantage of the next decade may belong to those who learn to evolve alongside AI."
  },
  {
    date: "2026-05-21",
    title: "AI painters before AI plumbers",
    text: "We imagined intelligent robots in factories, but got AI painters before AI plumbers. From an engineering view it makes sense: training an LLM is far easier than building a robot that can handle the chaotic real world. The question is whether we're liberating human potential or just automating the easiest skills first."
  },
  {
    date: "2026-02-11",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7427387244249972736/",
    title: "From candidate to interviewer in a year",
    text: "Proud to have represented my previous company across engineering colleges during its placement drives. Going from the candidate pool to the interviewer's chair in just a year, leading technical evaluations, showed me how much mentorship and real-world exposure matter to aspiring engineers."
  }
];
