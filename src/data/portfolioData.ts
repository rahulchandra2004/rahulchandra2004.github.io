export interface ProjectItem {
  id: string;
  name: string;
  title: string;
  titleItalic?: string;
  titleSuffix?: string;
  category: "Robotics & Embedded" | "Computer Vision & Deep Learning" | "Data Analytics & Power BI" | "Time-Series & Forecasting";
  description: string;
  image: string;
  live?: string;
  liveLabel: string;
  repo: string;
  repo2?: string;
  tags: string[];
  status?: string;
  year?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  buttonText?: string;
}

export interface ShelfItem {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  sizeKb: number;
  deps: number;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  type: string;
  accent: string;
  description: string;
  tags: string[];
}

export interface HackathonItem {
  id: string;
  name: string;
  subtitle: string;
  organizers: string;
  period: string;
  type: string;
  status: string;
  accent: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  badge: string;
  highlight: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  accent: string;
  icon: string;
  details: string[];
}

export interface CertificationItem {
  name: string;
  org: string;
  accent: string;
  link?: string;
  badgeId?: string;
}

export const portfolioData = {
  name: "Rahul Chandra",
  fullName: "Rahul Chandra Padamuttam",
  wordmark: "RAHUL",
  role: {
    bold: "Software Engineer",
    light: "AI & Cloud Developer",
  },
  email: "rahulpc1981@gmail.com",
  phone: "+91 93902 44754",
  location: "MANIT / NIAMT, India",
  url: "https://rahulchandra.vercel.app",
  whatsapp: "919390244754",
  storeUrl: "https://github.com/rahulchandra2004",
  education: "B.Tech in Computer Engineering",
  socials: {
    github: "https://github.com/rahulchandra2004",
    linkedin: "https://www.linkedin.com/in/rahul-chandra-padamuttam-6b5888330",
    resume: "/resume.pdf",
    oracle: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=B6A1D0A5370B2EB9EB273914BCC136E13F9AB4858F128F572A303840CAFF7A60",
    gemini: "https://www.credential.net/4a181fdd-d149-4031-8ae5-31b253325631",
  },
  bioWords: [
    { text: "Hey," },
    { text: "I'm" },
    { text: "Rahul Chandra.", className: "font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" },
    { text: "Software" },
    { text: "Engineer" },
    { text: "and" },
    { text: "AI / Cloud Developer", className: "text-white font-medium" },
    { text: "pursuing" },
    { text: "Computer" },
    { text: "Engineering." },
    { text: "I" },
    { text: "develop" },
    { text: "low-latency" },
    { text: "systems," },
    { text: "autonomous" },
    { text: "robotics control,", className: "text-white font-medium" },
    { text: "and" },
    { text: "deep learning" },
    { text: "computer vision", className: "text-white font-medium" },
    { text: "pipelines." },
    { text: "Certified" },
    { text: "in" },
    { text: "Oracle Cloud Infrastructure", className: "text-white font-medium" },
    { text: "and" },
    { text: "Google Gemini AI,", className: "text-white font-medium" },
    { text: "I" },
    { text: "architect" },
    { text: "resilient," },
    { text: "scalable," },
    { text: "and" },
    { text: "production-grade" },
    { text: "software" },
    { text: "solutions." },
  ],
  stackRows: [
    {
      label: "Engineering & AI",
      items: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "OpenCV",
        "Deep Learning",
        "Generative AI",
        "Next.js",
        "React",
        "TypeScript",
        "C++",
        "FastAPI",
        "Tailwind CSS",
      ],
      copies: 2,
      duration: 55,
      reverse: false,
    },
    {
      label: "Cloud, Data & Robotics",
      items: [
        "Oracle Cloud (OCI)",
        "Google Cloud (GCP)",
        "Docker",
        "CI/CD Pipelines",
        "Power BI",
        "DAX",
        "Pandas",
        "PostgreSQL",
        "Embedded Systems",
        "Arduino",
        "Google Gemini API",
        "Git",
      ],
      copies: 2,
      duration: 50,
      reverse: true,
    },
  ],
  experiences: [
    {
      role: "Core Member",
      org: "Code/Forge, NIAMT Ranchi",
      period: "Jan 2026 - Present",
      type: "Community Lead",
      accent: "#c85635",
      description:
        "Core member of the Community of Robotics and Automation at NIAMT Ranchi. Driving hands-on robotics development, peer workshops, embedded systems hackathons, and collaborative research initiatives.",
      tags: ["Robotics", "Automation", "Community Lead", "Embedded C++", "NIAMT"],
    },
    {
      role: "Research Intern",
      org: "MANIT Bhopal (NIT Bhopal)",
      period: "Jun 2026 - Jul 2026",
      type: "Academic Research",
      accent: "#cfc9bc",
      description:
        "Selected for the prestigious Summer Internship Programme at MANIT Bhopal, spearheading the design and kinematic modeling of an autonomous 12 Degrees of Freedom bipedal humanoid robot using Finite State Machines and Central Pattern Generators.",
      tags: ["Robotics", "Bipedal Locomotion", "FSM", "CPG", "NIT Bhopal"],
    },
    {
      role: "Machine Learning Intern",
      org: "EISystems Technologies",
      period: "Feb 2026 - Apr 2026",
      type: "Industry Internship",
      accent: "#c85635",
      description:
        "Developed and benchmarked CNN, DNN, and RNN neural network architectures for digit recognition using the MNIST dataset, tuning hyperparameters and optimizing model weights for production inference pipelines.",
      tags: ["TensorFlow", "Keras", "CNN / RNN", "Computer Vision", "Model Tuning"],
    },
    {
      role: "Power BI Intern",
      org: "Microsoft Elevate AICTE Internship",
      period: "Feb 2026 - Mar 2026",
      type: "Industry Internship",
      accent: "#cfc9bc",
      description:
        "Engineered an interactive Quick Commerce Delivery & Customer Insights Dashboard analyzing thousands of orders, revenue metrics, and SLA delivery benchmarks for instant platforms like Swiggy Instamart and Blinkit.",
      tags: ["Power BI", "DAX", "Data Modeling", "Microsoft AICTE", "Business Analytics"],
    },
    {
      role: "Artificial Intelligence Intern",
      org: "Codec Technologies India",
      period: "Jan 2026",
      type: "Industry Internship",
      accent: "#c85635",
      description:
        "Developed weather predictive regression models and engineered a real-time speech-to-text pipeline using CMU Sphinx and Google Speech API for automated audio stream transcribing.",
      tags: ["AI", "Python", "Speech-to-Text", "Predictive Modeling", "Speech API"],
    },
    {
      role: "Python Programming Intern",
      org: "YBI Foundation",
      period: "Dec 2025 - Jan 2026",
      type: "Industry Internship",
      accent: "#cfc9bc",
      description:
        "Built a TensorFlow Artificial Neural Network (ANN) for temporal energy consumption forecasting, evaluating time-series patterns and deploying predictive loss functions.",
      tags: ["Python", "TensorFlow", "ANN", "Time-Series", "Energy Forecasting"],
    },
  ] as ExperienceItem[],
  hackathons: [
    {
      id: "01",
      name: "Agents of SigNoz",
      subtitle: "Observe Your AI Solutions",
      organizers: "WeMakeDevs × SigNoz",
      period: "Jul 2026",
      type: "Global Hackathon",
      status: "Participated",
      accent: "#c85635",
      description:
        "Engineered 'OmniSRE', a closed-loop AI observability and autonomous self-healing system. Leveraged OpenTelemetry and SigNoz to monitor multi-agent workflows, detect runtime telemetry regressions, and automatically trigger remediation actions.",
      tags: ["AI Agents", "SigNoz", "OpenTelemetry", "Observability", "WeMakeDevs", "Python"],
      links: [
        { label: "View Repository", href: "https://github.com/rahulchandra2004/omnisre-signoz-hackathon" },
        { label: "Read Article", href: "https://dev.to/rahulchandra2004/omnisre-closed-loop-ai-observability-and-autonomous-self-healing-1lf4" },
        { label: "Hackathon Page", href: "https://archive.wemakedevs.org/hackathons/signoz/" },
      ],
      badge: "Global Hackathon",
      highlight: true,
    },
    {
      id: "02",
      name: "UIDAI Data Hackathon 2026",
      subtitle: "Aadhaar Lifecycle Data Engineering",
      organizers: "Govt of India · UIDAI · NIC · data.gov.in",
      period: "2026",
      type: "National Challenge",
      status: "Participated",
      accent: "#cfc9bc",
      description:
        "Built an end-to-end data processing pipeline on nation-scale Aadhaar lifecycle datasets. Formulated statistical anomaly detection algorithms, engineered demographic consistency indicators, and constructed exploratory visualization dashboards.",
      tags: ["Python", "Pandas", "Anomaly Detection", "Data Engineering", "UIDAI", "Aadhaar"],
      links: [
        { label: "View Repository", href: "https://github.com/rahulchandra2004/UIDAI-Data-Hackathon-2026" },
        { label: "Challenge Page", href: "https://event.data.gov.in/challenge/uidai-data-hackathon-2026/" },
      ],
      badge: "Govt of India · National",
      highlight: false,
    },
  ] as HackathonItem[],
  services: [
    {
      id: "01",
      title: "FULL-STACK WEB DEVELOPMENT",
      description:
        "I build lightning-fast, production-ready web applications from intuitive interactive frontends down to resilient APIs and databases, using modern Next.js, React, TypeScript, and Tailwind CSS.",
      capabilities: [
        "Modern React 18 & Next.js App Router Architecture",
        "High-performance TypeScript & Node.js Backends",
        "Responsive, Accessible & Pixel-Perfect Tailwind UI",
        "RESTful APIs, PostgreSQL & Supabase Integration",
        "State Architecture & 60fps Micro-interactions",
      ],
      buttonText: "VIEW PROJECTS",
    },
    {
      id: "02",
      title: "AI, DEEP LEARNING & COMPUTER VISION",
      description:
        "Designing and benchmarking neural network architectures for classification, sentiment, perception, and forecasting, from CNNs and Vision Transformers (CvT) to temporal LSTM models.",
      capabilities: [
        "Convolutional Neural Networks & Compact Vision Transformers",
        "Real-Time Face & Emotion Classification (OpenCV, DeepFace)",
        "Time-Series Telemetry & Power Forecasting (LSTM / RNN)",
        "Model Training, Loss Optimization & Scikit-Learn Pipelines",
        "End-to-End Inference APIs with FastAPI & PyTorch",
      ],
    },
    {
      id: "03",
      title: "CLOUD INFRASTRUCTURE & ORACLE CLOUD (OCI)",
      description:
        "Certified Oracle Cloud Infrastructure Associate. Architecting scalable, fault-tolerant cloud environments, virtual cloud networks (VCN), serverless workloads, and automated CI/CD deployment pipelines.",
      capabilities: [
        "Oracle Cloud Infrastructure (OCI Certified Associate)",
        "Google Cloud Platform (GCP) & Cloud Services",
        "Docker Containerization & Image Orchestration",
        "GitHub Actions Automated CI/CD Release Workflows",
        "VCN Subnets, Security Rules & IAM Cloud Policies",
      ],
    },
    {
      id: "04",
      title: "ROBOTICS & EMBEDDED SYSTEMS",
      description:
        "Bridging algorithms and hardware. Designing dynamic locomotion controllers, kinematic models, and sensor telemetry networks for bipedal robotics and safety-critical IoT hardware.",
      capabilities: [
        "12 DOF Humanoid Robot Locomotion & Gait Generation",
        "Finite State Machines (FSM) & Central Pattern Generators (CPG)",
        "Sensor Fusion, GSM Communication & Telemetry",
        "Embedded C / C++ Firmware on Microcontrollers",
        "Real-Time Gas & Environmental Alert Systems",
      ],
    },
    {
      id: "05",
      title: "DATA SCIENCE & POWER BI ANALYTICS",
      description:
        "Microsoft Elevate AICTE certified. Transforming complex business and platform datasets into interactive executive dashboards, predictive data models, and automated analytical pipelines.",
      capabilities: [
        "Interactive Power BI Dashboard Engineering",
        "Advanced DAX Modeling, Metrics & Calculated Tables",
        "Quick Commerce (Swiggy / Blinkit) SLA & Revenue Analytics",
        "Exploratory Data Analysis with Pandas, NumPy & Seaborn",
        "Automated Data Cleaning & ETL Pipelines",
      ],
    },
    {
      id: "06",
      title: "GENERATIVE AI & LLM AGENT SYSTEMS",
      description:
        "Google Gemini Certified. Building context-aware autonomous agents, prompt engineering pipelines, multi-modal reasoning workflows, and Retrieval-Augmented Generation (RAG) tools.",
      capabilities: [
        "Google Gemini Pro & Flash Multi-modal Integration",
        "Tool Calling, Structured Output & Function Execution",
        "Retrieval-Augmented Generation (RAG) & Vector Stores",
        "Prompt Optimization & Automated Evaluation Benchmarks",
        "AI Chatbots & Semantic Search Interfaces",
      ],
    },
  ] as ServiceItem[],
  projectCategories: [
    "All",
    "Systems & DevSecOps",
    "Robotics & Embedded",
    "Data Analytics & Power BI",
    "Computer Vision & Deep Learning",
  ] as const,
  projects: [
    {
      id: "01",
      name: "Autonomous Radial Context Pipeline (ArcP)",
      title: "AUTONOMOUS RADIAL",
      titleItalic: "context pipeline",
      titleSuffix: "ARCP FIREWALL & ZERO-DISK DEVSECOPS",
      category: "Systems & DevSecOps",
      description:
        "A 60-FPS frameless polymorphic radial desktop firewall, Edge-AI PII sanitizer, and zero-disk DevSecOps pipeline with hardware-accelerated AST parsing, ephemeral verification, and sub-millisecond telemetry.",
      image: "/assets/ArcP.png",
      live: "https://github.com/rahulchandra2004/ArcP",
      liveLabel: "GitHub Repo (Ongoing)",
      repo: "https://github.com/rahulchandra2004/ArcP",
      tags: ["DevSecOps", "Zero-Disk", "Edge AI", "PII Sanitizer", "Desktop Firewall", "C++ / Rust", "60 FPS"],
      status: "Ongoing",
      badge: "Ongoing Flagship",
      year: "2026",
    },
    {
      id: "02",
      name: "12 DOF Humanoid Robot",
      title: "12 DOF HUMANOID",
      titleItalic: "robot",
      titleSuffix: "BIPEDAL LOCOMOTION",
      category: "Robotics & Embedded",
      description:
        "Active development of an autonomous 12 Degrees of Freedom bipedal humanoid robot. Engineered advanced gait generation algorithms utilizing Finite State Machines (FSM) and Central Pattern Generators (CPG) for stable, dynamic walking gaits and real-time posture correction.",
      image: "/assets/Robot.png",
      live: "https://github.com/rahulchandra2004",
      liveLabel: "GitHub Repo",
      repo: "https://github.com/rahulchandra2004",
      tags: ["Robotics", "FSM", "CPG", "Embedded C++", "Kinematics", "Bipedal"],
      status: "Active",
      year: "2026",
    },
    {
      id: "03",
      name: "Quick Commerce Analytics Dashboard",
      title: "QUICK COMMERCE",
      titleItalic: "analytics",
      titleSuffix: "POWER BI DASHBOARD",
      category: "Data Analytics & Power BI",
      description:
        "Comprehensive operational intelligence dashboard tracking multi-platform order volume, delivery SLA adherence, and gross merchandise value across instant delivery networks (Blinkit and Swiggy Instamart) built during the Microsoft AICTE Elevate initiative.",
      image: "/assets/Dashboard.jpeg",
      live: "https://github.com/rahulchandra2004/Quick-Commerce-Dashboard",
      liveLabel: "View Dashboard",
      repo: "https://github.com/rahulchandra2004/Quick-Commerce-Dashboard",
      tags: ["Power BI", "DAX", "Data Modeling", "Swiggy", "Blinkit", "Analytics"],
      status: "Completed",
      year: "2026",
    },
    {
      id: "04",
      name: "Gas Leakage Detection System",
      title: "GAS LEAKAGE",
      titleItalic: "detection",
      titleSuffix: "IOT ALERT SYSTEM",
      category: "Robotics & Embedded",
      description:
        "Real-time safety-critical environmental monitoring system engineered with C++, Arduino microcontroller, and GSM modules. Automatically executes instant SMS broadcasts and emergency audible alert triggers upon threshold gas concentration breach.",
      image: "/assets/Gas.jpeg",
      live: "https://github.com/rahulchandra2004/gas-leakage-detection-system",
      liveLabel: "View IoT System",
      repo: "https://github.com/rahulchandra2004/gas-leakage-detection-system",
      tags: ["C++", "Arduino", "GSM", "IoT", "Embedded Systems", "Sensors"],
      status: "Completed",
      year: "2025",
    },
    {
      id: "05",
      name: "MNIST Deep Learning Benchmark",
      title: "MNIST NEURAL",
      titleItalic: "benchmark",
      titleSuffix: "CNN / DNN / RNN",
      category: "Computer Vision & Deep Learning",
      description:
        "Exhaustive comparative deep learning study benchmarking Convolutional Neural Networks, Deep Neural Networks, and Recurrent architectures on the MNIST image corpus, evaluating convergence speed, validation accuracy, and floating-point inference latency.",
      image: "/assets/MNIST.jpeg",
      live: "https://github.com/rahulchandra2004/mnist-digit-recognition",
      liveLabel: "View Benchmark",
      repo: "https://github.com/rahulchandra2004/mnist-digit-recognition",
      tags: ["TensorFlow", "Keras", "CNN", "DNN", "RNN", "MNIST"],
      status: "Completed",
      year: "2025",
    },
  ] as ProjectItem[],
  educationList: [
    {
      degree: "B.Tech in Computer Engineering",
      institution: "National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi",
      period: "Jan 2024 - Apr 2028",
      accent: "#c85635",
      icon: "degree",
      details: ["Computer Engineering", "Robotics & Automation", "Deep Learning & Cloud Systems"],
    },
    {
      degree: "Higher Secondary Education",
      institution: "Central Academy Sr. Sec. School",
      period: "Jun 2020 - May 2023",
      accent: "#cfc9bc",
      icon: "school",
      details: ["Science Stream", "Mathematics & Physics", "Foundational Computing"],
    },
  ] as EducationItem[],
  certificationsList: [
    {
      name: "Oracle Cloud Infrastructure Certified Foundations Associate",
      org: "Oracle",
      accent: "#c85635",
      link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=B6A1D0A5370B2EB9EB273914BCC136E13F9AB4858F128F572A303840CAFF7A60",
      badgeId: "OCI-ASSOC",
    },
    {
      name: "Gemini Certified University Student",
      org: "Google for Education",
      accent: "#cfc9bc",
      link: "https://www.credential.net/4a181fdd-d149-4031-8ae5-31b253325631",
      badgeId: "GOOGLE-GEMINI",
    },
    {
      name: "Microsoft Elevate AICTE: Power BI, AI & ML, Azure",
      org: "Microsoft × AICTE",
      accent: "#c85635",
      badgeId: "MS-AICTE",
    },
    {
      name: "TCS iON Career Edge: Young Professional",
      org: "Tata Consultancy Services (TCS)",
      accent: "#cfc9bc",
      badgeId: "TCS-ION",
    },
    {
      name: "Cybersecurity Job Simulation",
      org: "Deloitte",
      accent: "#c85635",
      badgeId: "DELOITTE-SEC",
    },
    {
      name: "AI Fundamentals",
      org: "Cisco & IBM SkillsBuild",
      accent: "#cfc9bc",
      badgeId: "CISCO-IBM",
    },
    {
      name: "AI Upskilling Program",
      org: "Qualcomm Academy",
      accent: "#c85635",
      badgeId: "QUALCOMM-AI",
    },
    {
      name: "Data Science Certification",
      org: "HP LIFE",
      accent: "#cfc9bc",
      badgeId: "HP-LIFE",
    },
  ] as CertificationItem[],
  shelfItems: [
    {
      slug: "meniscus",
      name: "Meniscus",
      tagline: "liquid bottom navigation",
      category: "navigation",
      price: 12,
      sizeKb: 8.7,
      deps: 1,
    },
    {
      slug: "lucid",
      name: "Lucid",
      tagline: "liquid glass segmented bar",
      category: "navigation",
      price: 5,
      sizeKb: 8.0,
      deps: 0,
    },
    {
      slug: "sigil",
      name: "Sigil",
      tagline: "a code field that seals itself",
      category: "form",
      price: 10,
      sizeKb: 12.2,
      deps: 0,
    },
    {
      slug: "quarto",
      name: "Quarto",
      tagline: "four boxes that fold into one",
      category: "form",
      price: 10,
      sizeKb: 16.1,
      deps: 0,
    },
    {
      slug: "parachute",
      name: "Parachute",
      tagline: "animated download button",
      category: "animation",
      price: 5,
      sizeKb: 9.2,
      deps: 0,
    },
    {
      slug: "quench",
      name: "Quench",
      tagline: "submit button animation",
      category: "form",
      price: 5,
      sizeKb: 11.9,
      deps: 0,
    },
  ] as ShelfItem[],
};
