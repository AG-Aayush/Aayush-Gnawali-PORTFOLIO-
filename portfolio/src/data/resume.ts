
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
    summary:
      "Hands-on introduction to production DevOps practices Linux, containerization, and CI/CD concepts in a live engineering environment.",
    points: [
      "Applied Linux fundamentals and Bash scripting to support day-to-day system and development workflows.",
      "Built and ran containerized services using Docker and Docker Compose, working with YAML-based configuration.",
      "Gained practical exposure to AWS core services (EC2) for deploying and managing infrastructure.",
      "Learned and applied CI/CD concepts and server fundamentals alongside a professional DevOps team.",
      "Used Git for version control across development and infrastructure tasks.",
    ],
    stack: ["Linux", "Bash", "Docker", "Docker Compose", "YAML", "Git", "CI/CD", "AWS"],
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
  images?: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "Digital-Desktop Watch",
    name: "Digital Desktop Watch",
    pitch: "A modern digital desktop watch for your desktop that will be with you when ever you turn on your computer.",
    description: "A desktop watch application built with PyQt6, featuring time display.",
    challenge: "Integrating real-time clock updates with a responsive UI.",
    learned: "How to build desktop applications with PyQt6, handle real-time updates, and implement custom features.",
    stack: ["Python", "PyQt6", " Custom Widgets", "Time Display", "Alarms"],
    github: "https://github.com/AG-Aayush/Desktop-Digital-Clock.git",
    images: ["/projects/project_images/Digital-clock.png"],
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
    // demo: "",
    //images: [],
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
