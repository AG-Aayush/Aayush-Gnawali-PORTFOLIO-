/**
 * Central content store.
 *
 * Every section of the site (and the on-site chat assistant's knowledge base)
 * reads from this file. Keeping content and presentation separate means the
 * copy can be updated without touching component code, and the chat widget
 * can quote the exact same facts shown on the page — no drift, no invention.
 */

export const personal = {
  name: "Aayush Gnawali",
  firstName: "Aayush",
  role: "DevOps / DevSecOps, Backend Engineer & AI/ML",
  location: "Kathmandu, Nepal",
  tagline:
    "I build reliable backend systems and the automation that keeps them running.",
  email: "aayushgnawali45@gmail.com",
  github: "https://github.com/AG-Aayush",
  linkedin: "https://linkedin.com/in/aayushgnawali",
  medium: "https://articalgeek.medium.com/",
  instagram: "https://www.instagram.com/ayushgnawali/",
  profilePicture: "/Aayush.jpeg",
  profilePictureDark: "/Aayush-profile.jpeg",
  resumeFile: "/Aayush_Resume.pdf",
  availability: "open_to_work",
  focusAreas: ["Backend Development", "DevOps", "DevSecOps", "AI/ML"],
} as const;

export const about = {
  story: [
    "I'm a final-year B.E. Information Technology student at Everest Engineering College, and most of what I know about backend engineering I've learned by building things that had to actually stay up — an API that handles real authentication, a monitoring dashboard that has to reflect real state, a system that's supposed to notice when something breaks.",
    "That instinct is what pulled me toward DevOps and infrastructure. Writing an endpoint is one part of the job; making sure it deploys cleanly, recovers from failure, and can be reasoned about at 2am is the part I find genuinely interesting. I like the discipline of it — Linux fundamentals, containerization, CI/CD, version control — the unglamorous layer that everything else depends on.",
    "In parallel, I've been building toward AI/ML: training models, deploying them behind real interfaces, and thinking about how machine learning systems get operated, not just built. I care about the same things in both worlds — reliability, observability, and systems that fail predictably instead of silently.",
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
    summary:
      "Hands-on introduction to production DevOps practices — Linux, containerization, and CI/CD concepts in a live engineering environment.",
    points: [
      "Applied Linux fundamentals and Bash scripting to support day-to-day system and development workflows.",
      "Built and ran containerized services using Docker and Docker Compose, working with YAML-based configuration.",
      "Learned and applied CI/CD concepts and server fundamentals alongside a professional DevOps team.",
      "Used Git for version control across development and infrastructure tasks.",
    ],
    stack: ["Linux", "Bash", "Docker", "Docker Compose", "YAML", "Git", "CI/CD"],
  },
  {
    id: "e-digital-nepal",
    role: "Backend & QA Intern",
    org: "E-Digital Nepal",
    period: "2026",
    summary:
      "Backend contributions to a production ERP system, paired with QA responsibilities on the same release cycle.",
    points: [
      "Developed a production module using FastAPI as part of a live ERP system.",
      "Contributed to backend API development alongside the production development team.",
      "Performed QA testing to validate functionality and support reliable releases.",
      "Collaborated with developers during implementation and testing cycles to identify and resolve issues.",
    ],
    stack: ["FastAPI", "Python", "REST APIs", "QA Testing", "ERP"],
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
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "fastapi-notes",
    name: "Secure FastAPI Notes CRUD API",
    pitch: "A production-style REST API with real authentication, not a toy CRUD demo.",
    description:
      "A RESTful API built with FastAPI and PostgreSQL, using asynchronous database operations end to end. Implements JWT-based authentication, bcrypt password hashing, and owner-based authorization so users can only access their own resources. Backend modules are structured with Pydantic validation and Async SQLAlchemy for scalable request handling.",
    challenge:
      "Getting authorization right was harder than authentication — making sure every CRUD endpoint checked resource ownership, not just a valid token, without duplicating that logic across routes.",
    learned:
      "How to structure async SQLAlchemy sessions and dependency injection in FastAPI so security checks stay centralized and testable instead of scattered through the codebase.",
    stack: ["FastAPI", "PostgreSQL", "Async SQLAlchemy", "JWT", "Pydantic", "bcrypt"],
    github: "https://github.com/AG-Aayush/fastAPI-CRUD-project",
    demo: "https://fastapi-crud-project-1-9fr9.onrender.com/docs",
    featured: true,
  },
  {
    id: "self-healing",
    name: "Rule-Based Self-Healing Web Automation System",
    pitch: "Automation that notices when a web UI changes and recovers on its own.",
    description:
      "A Python automation framework built on Selenium that uses heuristic scoring to recover automatically when a web element locator breaks — a common failure point in browser automation when a UI changes. Includes backend monitoring and recovery workflows for handling dynamic UI changes, plus a Streamlit dashboard for tracking healing confidence scores and runtime metrics.",
    challenge:
      "Deciding how confident the system should be before it 'heals' automatically versus flagging for a human — too aggressive and it silently masks real breakage, too conservative and it defeats the point.",
    learned:
      "How to design rule-based recovery logic with a confidence threshold rather than a binary pass/fail, and how much observability (the metrics dashboard) matters for trusting an automated recovery system.",
    stack: ["Python", "Selenium", "Streamlit", "Automation", "Monitoring"],
    github: "https://github.com/AG-Aayush",
    featured: true,
  },
  {
    id: "house-price",
    name: "House Price Prediction Deployment",
    pitch: "A regression model taken from notebook to a live, interactive tool.",
    description:
      "A machine learning application built with Scikit-learn and deployed with Streamlit. Covers data preprocessing, feature engineering, and a real-time inference pipeline, with visualizations for monitoring model performance rather than just outputting a single prediction number.",
    challenge:
      "Feature engineering that generalized well — early versions overfit to patterns in the training data that didn't hold up on new inputs.",
    learned:
      "The gap between a model that scores well in a notebook and one that behaves sensibly in a live interface with real user input.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Pandas", "NumPy"],
    demo: "https://house-price-prediction-california-6w6gf3ztnnqx76rybzdd8v.streamlit.app/",
    featured: true,
  },
  {
    id: "pomodoro-3d",
    name: "3D Pomodoro Website",
    pitch: "A productivity timer rebuilt as an interactive 3D interface.",
    description:
      "A JavaScript Pomodoro application built with Three.js, with interactive timer state management driving mesh rendering and rotational mechanics. Frontend logic, state, and deployment are all handled with vanilla JavaScript and GitHub Pages.",
    challenge:
      "Keeping 3D rendering performant in-browser while the timer state updates continuously — asset and lighting choices had a real, visible cost.",
    learned:
      "Practical performance tuning for real-time 3D in the browser: what's cheap to animate and what isn't.",
    stack: ["JavaScript", "Three.js", "GitHub Pages"],
    demo: "https://ag-aayush.github.io/pomodoro-3d/",
    featured: false,
  },
  {
    id: "iot-monitoring",
    name: "IoT Infrastructure Automation",
    pitch: "Arduino-based hardware monitoring with a real-time web dashboard.",
    description:
      "An Arduino-based automation system with real-time sensor integration for automated light and water tank monitoring. Includes a custom web interface for real-time data visualization, voice control, and hardware control.",
    challenge:
      "Keeping sensor readings and hardware state synchronized with the web dashboard in real time without flooding the interface with noisy updates.",
    learned:
      "How physical/hardware constraints (sensor noise, latency) shape software design decisions in a way pure web development doesn't.",
    stack: ["Arduino", "IoT", "Sensors", "Web Dashboard"],
    featured: false,
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
    skills: ["Render", "Streamlit Cloud", "GitHub Pages", "Deployment Fundamentals"],
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
    date: "2024",
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
    period: "2022 — Present (8th Semester)",
  },
  {
    id: "plus-two",
    degree: "Higher Secondary Education (+2 Science)",
    school: "Trinity International College",
    location: "Kathmandu, Nepal",
    period: "2020 — 2022",
    note: "GPA: 3.20",
  },
] as const;

export const softSkills = [
  "Problem Solving",
  "Technical Writing",
  "Team Collaboration",
  "Adaptability",
  "Growth Mindset",
] as const;
