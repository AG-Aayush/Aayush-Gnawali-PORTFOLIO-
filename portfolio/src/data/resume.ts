
export const personal = {
  name: "Aayush Gnawali",
  firstName: "Aayush",
  role: "AI • Backend • DevOps",
  location: "Kathmandu, Nepal",
  tagline:
    "I build AI-assisted systems and reliable backend platforms that are designed to scale and stay dependable.",
  email: "aayushgnawali45@gmail.com",
  github: "https://github.com/AG-Aayush",
  linkedin: "https://linkedin.com/in/aayushgnawali",
  medium: "https://articalgeek.medium.com/",
  instagram: "https://www.instagram.com/ayushgnawali/",
  profilePicture: "/Aayush.jpeg",
  profilePictureDark: "/Aayush-profile.jpeg",
  resumeFile: "/Aayush_Resume.pdf",
  availability: "open_to_work",
  focusAreas: ["AI & RAG", "Backend Development", "School Management Systems", "DevOps"],
} as const;

export const about = {
  story: [
    "I'm a final-year B.E. Information Technology student at Everest Engineering College, and most of what I know about backend engineering I've learned by building things that had to actually stay up an API that handles real authentication, a monitoring dashboard that has to reflect real state, a system that's supposed to notice when something breaks.",
    "That instinct is what pulled me toward DevOps and infrastructure. Writing an endpoint is one part of the job; making sure it deploys cleanly, recovers from failure, and can be reasoned about at 2am is the part I find genuinely interesting. I like the discipline of it Linux fundamentals, containerization, CI/CD, version control the unglamorous layer that everything else depends on.",
    "In parallel, I've been building toward AI/ML: training models, deploying them behind real interfaces, and thinking about how machine learning systems get operated, not just built. I care about the same things in both worlds reliability, observability, and systems that fail predictably instead of silently.",
    "I'm looking for remote opportunities where I can keep learning fast across backend, DevOps, and applied AI, and contribute to systems that other engineers can depend on.",
  ],
  highlights: [
    { label: "Focus", value: "Backend & Infrastructure" },
    { label: "Currently", value: "8th Semester, B.E. IT" },
    { label: "Interested in", value: "DevSecOps · Cloud" },
  ],
} as const;

export type ExperienceEntry = {
  id: string;
  role: string;
  org: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "lego-tech",
    role: "DevOps Intern",
    org: "Lego Tech Pvt. Ltd.",
    period: "2026",
    location: "Remote",
    summary:
      "Worked remotely on a DevOps-focused internship, gaining hands-on exposure to Linux administration, Docker workflows, and core deployment concepts in a live engineering environment.",
    points: [
      "Applied Linux fundamentals and Bash scripting to support daily system and development workflows.",
      "Built and ran containerized services using Docker and Docker Compose with YAML-based configuration and deployment tasks.",
      "Gained practical exposure to AWS core services such as EC2 for infrastructure support and deployment basics.",
      "Learned CI/CD concepts, server fundamentals, and professional DevOps workflows while working with a distributed team.",
      "Used Git for version control across infrastructure and application-related tasks.",
    ],
    stack: ["Linux", "Bash", "Docker", "Docker Compose", "YAML", "Git", "CI/CD", "AWS"],
  },
  {
    id: "e-digital-nepal",
    role: "AI & Backend Intern",
    org: "E-Digital Nepal Pvt. Ltd.",
    period: "May 2026 - August 2026",
    location: "On-site",
    summary:
      "Worked on AI assistant, document ingestion, and backend systems for school management and education technology platforms, contributing to production-grade RAG and API workflows.",
    points: [
      "Developed AI assistant features, document ingestion pipelines, semantic search, knowledge base integrations, and Retrieval-Augmented Generation (RAG) workflows.",
      "Built backend services using Python and PostgreSQL for APIs, authentication, role-based access control, and secure data management.",
      "Contributed to admin tools, dynamic form management, user tracking, monitoring, and overall platform reliability for school management systems.",
      "Implemented secure data handling practices and maintained strict data separation across school management environments.",
      "Collaborated with the engineering team on conversational workflows and production-facing AI/backend improvements that supported organizational platform goals.",
    ],
    stack: ["Python", "PostgreSQL", "FastAPI", "RAG", "Semantic Search", "AI Assistants", "Authentication", "RBAC", "School Management"],
  },
];

export type Project = {
  id: string;
  name: string;
  pitch: string;
  description: string;
  challenge: string;
  learned: string;
  stack: string[];
  github?: string;
  demo?: string;
  images?: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "self-healing",
    name: "Rule-Based Self-Healing Web Automation System",
    pitch: "Automation that notices when a web UI changes and recovers on its own.",
    description:
      "A Python-based automation system for noticing UI drift, tracking browser state, and recovering failed workflows with rule-based healing logic instead of manual intervention.",
    challenge:
      "Designing resilient automation when selectors and UI structure shift over time, especially during live application updates.",
    learned:
      "How to combine monitoring, browser event tracking, and recovery rules into a reliable automation workflow for web interfaces.",
    stack: ["Python", "Automation", "UI Monitoring", "Browser Events", "Telemetry", "Rule-Based Recovery"],
    featured: true,
  },
  {
    id: "Digital-Desktop Watch",
    name: "Digital Desktop Watch",
    pitch: "A modern digital desktop watch for your desktop that stays with you whenever you turn on your computer.",
    description: "A desktop watch application built with PyQt6, featuring real-time clock updates, custom widgets, and a clean desktop-first interface.",
    challenge: "Integrating real-time clock updates with a responsive UI while keeping the desktop experience lightweight and polished.",
    learned: "How to build desktop applications with PyQt6, handle real-time updates, and implement custom features in a focused UI.",
    stack: ["Python", "PyQt6", "Custom Widgets", "Time Display", "Alarms"],
    github: "https://github.com/AG-Aayush/Desktop-Digital-Clock.git",
    images: ["/projects/project_images/Digital-clock.png"],
    featured: true,
  },
  {
    id: "pomodoro-3d",
    name: "3D Pomodoro Website",
    pitch: "A productivity timer rebuilt as an interactive 3D interface.",
    description:
      "A JavaScript Pomodoro application built with Three.js, with interactive timer state management driving mesh rendering and rotational mechanics. Frontend logic, state, and deployment are all handled with vanilla JavaScript and GitHub Pages.",
    challenge:
      "Keeping 3D rendering performant in-browser while the timer state updates continuously asset and lighting choices had a real, visible cost.",
    learned:
      "Practical performance tuning for real-time 3D in the browser: what's cheap to animate and what isn't.",
    stack: ["JavaScript", "Three.js", "GitHub Pages"],
    demo: "https://ag-aayush.github.io/pomodoro-3d/",
    images: ["/projects/project_images/pomodoro.png"],
    featured: true,
  },
  {
    id: "IOT-based-Smart-Home-Monitoring-System",
    name: "IOT-based Smart Home Monitoring System",
    pitch: "ESP8266 Microcontroller-based remote monitoring system using HTTP for real-time data transmission.",
    description: "An ESP8266 microcontroller-based system for remote monitoring of home environment parameters, using HTTP for real-time data transmission and MySQL for data storage.",
    challenge: "Hardware failure, sensor failures, poor network connectivity.",
    learned: "How to build IOT projects, using ESP8266, HTTP, MySQL, Arduino IDE.",
    stack: ["IOT", "ESP8266", "HTTP", "MySQL", "Arduino IDE"],
    featured: true,
  },
  {
    id: "house-price",
    name: "House Price Prediction Deployment",
    pitch: "A regression model taken from notebook to a live, interactive tool.",
    description:
      "A machine learning application built with Scikit-learn and deployed with Streamlit. Covers data preprocessing, feature engineering, and a real-time inference pipeline, with visualizations for monitoring model performance rather than just outputting a single prediction number.",
    challenge:
      "Feature engineering that generalized well early versions overfit to patterns in the training data that didn't hold up on new inputs.",
    learned:
      "The gap between a model that scores well in a notebook and one that behaves sensibly in a live interface with real user input.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy"],
    demo: "https://house-price-prediction-california-6w6gf3ztnnqx76rybzdd8v.streamlit.app/",
    images: ["/projects/project_images/house-prediction.png"],
    featured: true,
  },
  {
    id: "hippyhub-ecommerce-website",
    name: "HippyHub E-Commerce Website",
    pitch: "A 3-tier e-commerce platform for hemp products and Dhaka-pattern clothing.",
    description:
      "A 3-tier e-commerce website built for hemp products and Dhaka-design clothing, using React for the frontend, FastAPI for the backend, and PostgreSQL as the database.",
    challenge:
      "Building smooth animations and transitions across the storefront while keeping the frontend performant.",
    learned:
      "This project was assigned during my DevOps training period. I containerized and ran the full stack using Docker.",
    stack: ["React", "FastAPI", "PostgreSQL", "Docker", "Docker Compose", "nginx"],
    github: "https://github.com/AG-Aayush/E-Commerce",
    featured: true,
  },
];

export type SkillCategory = {
  id: string;
  label: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    skills: ["FastAPI", "REST APIs", "Async SQLAlchemy", "Pydantic", "JWT Authentication", "OOP"],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: ["Docker", "Docker Compose", "Linux", "Bash", "YAML", "CI/CD Concepts", "Git", "GitHub"],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "Model Deployment"],
  },
  {
    id: "cloud",
    label: "Cloud & Deployment",
    skills: ["Render", "Streamlit Cloud", "GitHub Pages", "Deployment Fundamentals", "AWS"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Git", "GitHub", "Selenium", "Streamlit", "Virtual Environments", "Figma"],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    id: "other",
    label: "Other",
    skills: ["Data Structures & Algorithms", "Technical Writing", "Problem Solving"],
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  note: string;
};

export const certifications: Certification[] = [
  {
    id: "aiml-workshop",
    name: "AI/ML Workshop",
    issuer: "ITSNP",
    date: "2025",
    note: "Intensive training on neural network architectures and implementation, including CNNs.",
  },
  {
    id: "robotics",
    name: "Robotics Training",
    issuer: "Everest Engineering College",
    date: "2025",
    note: "Embedded systems and automation fundamentals.",
  },
  {
    id: "devops-cloud-upskill",
    name: "DevOps and Cloud Computing Training",
    issuer: "Upskill Nepal",
    date: "2026",
    note: "Hands-on cloud and DevOps training covering deployment, automation, and infrastructure best practices.",
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  date: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    id: "hult-prize",
    title: "Chief Content Writer",
    org: "Hult Prize Organizing Committee, Everest Engineering College",
    date: "2025",
    description:
      "Served on the organizing committee responsible for content strategy and communications; the team ranked in the Top 25% in South Asia among roughly 300 organizing committees.",
  },
  {
    id: "best-minor-project",
    title: "Best Minor Project",
    org: "Everest Engineering College",
    date: "2025",
    description:
      "Won best minor project among all 6th semester submissions for technical execution, problem solving, and presentation.",
  },
];

export const education = [
  {
    id: "beit",
    degree: "B.E. in Information Technology",
    school: "Everest Engineering College (Pokhara University)",
    location: "Lalitpur, Nepal",
    period: "2022 - Present (8th Semester)",
  },
  {
    id: "plus-two",
    degree: "Higher Secondary Education (+2 Science)",
    school: "Trinity International College",
    location: "Kathmandu, Nepal",
    period: "2020 - 2022",
  },
] as const;

export const softSkills = [
  "Problem Solving",
  "Technical Writing",
  "Team Collaboration",
  "Adaptability",
  "Growth Mindset",
] as const;
