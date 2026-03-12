/**
 * Single source of truth for portfolio data.
 * Persisted to Supabase via PortfolioContext.
 */

export const defaultProfile = {
  name: 'Shamim Khaled',
  title: 'Machine Learning Engineer & Python Developer',
  tagline: 'Building scalable AI systems, backends, and DevOps pipelines that drive business value.',
  email: 'i.amshamim94@gmail.com',
  phone: '+880 1903526254',
  location: 'Dhaka, Bangladesh',
  avatar: '/assets/images/shamim.jpeg',
  resumeUrl: 'https://drive.google.com/file/d/1L9COYGeo4UQxHUz4aFFMZkSkqqqXV0Qq/view?usp=sharing',
  bio: `I'm a Machine Learning Engineer and Python Developer with 2+ years of experience building intelligent systems and production-ready pipelines. My expertise spans ML/AI, backend development, and DevOps. I specialize in scalable AI solutions, REST APIs, and deployment automation that drive measurable business value.`,
  social: {
    github: 'https://github.com/shamimkhaled',
    linkedin: 'https://www.linkedin.com/in/shamim-khaled/',
    youtube: 'https://www.youtube.com/@spikegrowth',
    devto: 'https://dev.to/shamimkhaled',
    twitter: 'https://twitter.com/shamimkhaled',
    telegram: 'https://t.me/shamimkhaled',
    whatsapp: 'https://wa.me/8801903526254',
  },
};

export const defaultServices = [
  {
    id: '1',
    title: 'AI/ML Engineering',
    description: 'LLM apps, RAG, fine-tuning, model deployment — production-ready AI solutions.',
    icon: 'ml-ai',
  },
  {
    id: '2',
    title: 'Backend & APIs',
    description: 'Python, Django, FastAPI, REST APIs — robust, scalable server-side solutions.',
    icon: 'backend',
  },
  {
    id: '3',
    title: 'DevOps & Infrastructure',
    description: 'Docker, CI/CD, cloud deployment — reliable, automated pipelines.',
    icon: 'devops',
  },
  {
    id: '4',
    title: 'Freelance & Remote Work',
    description: 'Available for projects — hourly and fixed price. Free consultation.',
    icon: 'freelance',
  },
];

export const defaultStats = [
  { label: 'Years Experience', value: '2+', key: 'years' },
  { label: 'Projects', value: '15+', key: 'projects' },
  { label: 'Repos', value: '20+', key: 'repos' },
  { label: 'Technologies', value: '12+', key: 'technologies' },
];

export const defaultSkills = [
  {
    category: 'Backend',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'Django', icon: '🎸' },
      { name: 'Django REST Framework', icon: '🔧' },
      { name: 'FastAPI', icon: '⚡' },
      { name: 'Flask', icon: '🌶️' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'HTML/CSS', icon: '📄' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MySQL', icon: '🗄️' },
      { name: 'Redis', icon: '⚡' },
      { name: 'MongoDB', icon: '🍃' },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '☸️' },
      { name: 'Git', icon: '📝' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'Linux', icon: '🐧' },
      { name: 'AWS', icon: '☁️' },
    ],
  },
  {
    category: 'ML/AI',
    skills: [
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'Scikit-learn', icon: '📊' },
    ],
  },
];

export const defaultProjects = [
  {
    id: '1',
    title: 'Ecommerz Backend API with Django Rest Framework',
    description: 'Comprehensive backend API for e-commerce platform with authentication, product management, cart, and order handling.',
    image: '/assets/projects/proj_0.png',
    technologies: ['Django', 'DRF', 'PostgreSQL', 'JWT', 'Redis', 'Celery'],
    category: 'Backend',
    year: '2024',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/shamimkhaled/ecommerz-backend-api',
    liveUrl: 'https://ecommerz-backend-api-v1.vercel.app/',
    youtubeUrl: null,
  },
  {
    id: '2',
    title: 'Crop Disease Prediction AI Web App',
    description: 'AI-powered web app for crop disease prediction using Transfer Learning (InceptionV3, MobileNetV2) with 94% accuracy.',
    image: '/assets/projects/proj_5.png',
    technologies: ['Django', 'TensorFlow', 'InceptionV3', 'MobileNetV2', 'OpenCV'],
    category: 'Full Stack',
    year: '2024',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/shamimkhaled/crop-disease-image-classification-web-app',
    liveUrl: 'https://youtu.be/2RAJUHiOKLc',
    youtubeUrl: 'https://youtu.be/2RAJUHiOKLc',
  },
  {
    id: '3',
    title: 'AI-Powered Q&A Web App with Django, React & LangChain',
    description: 'Full-stack AI Q&A app with document upload and RAG using OpenAI GPT-4, LangChain, ChromaDB.',
    image: '/assets/projects/proj_099.png',
    technologies: ['Django REST Framework', 'React', 'Tailwind CSS', 'LangChain', 'OpenAI GPT-4', 'ChromaDB', 'PostgreSQL', 'Docker'],
    category: 'Full Stack',
    year: '2024',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/shamimkhaled/qna-ai-web-app',
    liveUrl: 'https://youtu.be/wtT7K_BTgLI',
    youtubeUrl: 'https://youtu.be/wtT7K_BTgLI',
  },
  {
    id: '4',
    title: 'LLM Q&A Chatbot with OpenAI',
    description: 'Advanced chatbot for PDF analysis using OpenAI, Langchain, VectorDB, and FAISS.',
    image: '/assets/projects/proj_000.png',
    technologies: ['OpenAI', 'Langchain', 'VectorDB', 'Streamlit', 'FAISS'],
    category: 'Python',
    year: '2024',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/shamimkhaled/LLM-QnA-Chatbot-App',
    liveUrl: 'https://youtu.be/l1udKyDJUSI',
    youtubeUrl: 'https://youtu.be/l1udKyDJUSI',
  },
  {
    id: '5',
    title: 'Enny Sports Mobile Application',
    description: 'Django REST API for Flutter-based iOS and Android fitness app. Live on App Store and Play Store.',
    image: '/assets/projects/enny-sports.jpeg',
    technologies: ['Django', 'REST API', 'Flutter', 'PostgreSQL', 'iOS', 'Android', 'Digital Ocean'],
    category: 'Backend',
    year: '2024',
    status: 'Live',
    featured: true,
    github: null,
    liveUrl: 'https://play.google.com/store/apps/details?id=com.ennysports.app&hl=en&pli=1',
    youtubeUrl: null,
  },
  {
    id: '6',
    title: 'Vashelah - Spices Item Delivery System',
    description: 'E-commerce platform for culinary products with Next.js, Django, Stripe integration.',
    image: '/assets/projects/vashelah.png',
    technologies: ['Next JS', 'Django', 'REST API', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Digital Ocean'],
    category: 'Full Stack',
    year: '2024',
    status: 'Live',
    featured: true,
    github: null,
    liveUrl: 'https://www.vashelah.com/',
    youtubeUrl: null,
  },
  {
    id: '7',
    title: 'TechKreativ React App Template',
    description: 'Modern hybrid architecture combining traditional web technologies with React components.',
    image: '/assets/projects/techkreativ.png',
    technologies: ['React', 'Tailwind CSS', 'CSS3', 'Responsive Design'],
    category: 'Frontend',
    year: '2024',
    status: 'Completed',
    featured: false,
    github: null,
    liveUrl: 'https://techkreativ-react-app.vercel.app/',
    youtubeUrl: null,
  },
  {
    id: '8',
    title: 'Stock Market Analysis & Prediction',
    description: 'ML models including ARIMA, LSTM, Prophet, and GRU for stock price prediction.',
    image: '/assets/projects/proj_6.png',
    technologies: ['Python', 'LSTM', 'ARIMA', 'Prophet', 'GRU', 'Pandas'],
    category: 'Python',
    year: '2023',
    status: 'Completed',
    featured: false,
    github: 'https://github.com/shamimkhaled/Machine-Learning',
    liveUrl: null,
    youtubeUrl: null,
  },
  {
    id: '9',
    title: 'Gemini Pro ATS Resume Analyzer',
    description: 'Streamlit app using Google Gemini Pro Vision to analyze resumes against job descriptions.',
    image: '/assets/projects/proj_10.png',
    technologies: ['Google Gemini Pro', 'Streamlit', 'Langchain', 'PDF', 'AI Evaluation'],
    category: 'Python',
    year: '2024',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/shamimkhaled/GeminiProAIModel-ATS-Resume-Expert',
    liveUrl: 'https://youtu.be/gCj_4OlbTU8',
    youtubeUrl: 'https://youtu.be/gCj_4OlbTU8',
  },
];

export const defaultExperience = [
  {
    id: '1',
    company: 'Alawaf Technologies LTD',
    role: 'Software Engineer (AI/ML)',
    dateRange: 'Aug 2025 – Present',
    jobType: 'Full-time',
    location: 'Remote',
    description: 'I am a full-stack developer and team lead who developed an ISP Sales Dashboard for KTL ISP companies using Django REST API, PostgreSQL, and React (TypeScript), deployed on virtual machines. I also contributed to an HRMS application built with the MERN stack, focusing on VM deployment and infrastructure setup. Additionally, I worked with rConfig v6, an open-source Laravel-based network configuration management platform for automated network device backup. Alongside these projects, I developed ChainSight AI, an AI-powered virtual contract analyzer built with Django REST API, OpenAI models, PostgreSQL, ChromaDB, and DigitalOcean.',
    achievements: [
      'Led full-stack development of an ISP Sales & KTL Metrics Dashboard using Django REST API, PostgreSQL, and React (TypeScript).',
      'Deployed web applications on VM infrastructure and managed server configuration and production environments.',
      'Contributed to HRMS development using the MERN stack with focus on deployment and backend integration.',
      'Implemented automated network device configuration backups using rConfig v6 (Laravel).',
      'Built ChainSight AI, an AI-powered contract analysis system using Django REST API, OpenAI models, PostgreSQL, and ChromaDB.',
    ],
    technologies: ['Django REST API', 'PostgreSQL', 'React', 'TypeScript', 'MERN', 'OpenAI', 'ChromaDB', 'DigitalOcean', 'Laravel', 'rConfig'],
  },
  {
    id: '2',
    company: 'Serenus One',
    role: 'Software Engineer',
    dateRange: 'Sept 2024 – Jan 2025',
    jobType: 'Full-time',
    location: 'Remote',
    description: 'Developing robust Django REST API and FastAPI solutions with user authentication, Google/Discord login integration, payment systems, and TTS systems using Piper TTS and Coqui TTS. Fine-tuning OpenAI GPT-4o models for meditation script generation.',
    achievements: [
      'Built Django REST API with OAuth integration',
      'Implemented TTS systems with Piper and Coqui',
      'Fine-tuned GPT-4o for specialized content generation',
    ],
    technologies: ['Django', 'FastAPI', 'OpenAI', 'PostgreSQL'],
  },
  {
    id: '3',
    company: 'Enny Sports',
    role: 'Tech Lead - Backend (Python)',
    dateRange: 'Sept 2024 – May 2025',
    jobType: 'Full-time',
    location: 'Remote',
    description: 'Developed Django REST API backend for Flutter-based iOS and Android fitness application, currently live on App Store and Play Store.',
    achievements: [
      'Led backend architecture for fitness app',
      'Deployed to production on App Store and Play Store',
      'Integrated with Flutter mobile app',
    ],
    technologies: ['Django', 'REST API', 'PostgreSQL', 'Flutter'],
  },
  {
    id: '4',
    company: 'Rana Motors',
    role: 'Jr Software Engineer',
    dateRange: 'July 2022 – August 2024',
    jobType: 'Full-time',
    location: 'Remote',
    description: 'Designed and developed comprehensive Inventory Management System using Django.',
    achievements: [
      'Built full inventory management system',
      'Managed scalable database design',
    ],
    technologies: ['Django', 'PostgreSQL', 'JavaScript'],
  },
];

export const defaultEducation = [
  {
    id: '1',
    degree: 'BSc in Computer Science and Engineering',
    institution: 'North South University',
    year: '2018 - 2022',
    location: 'Dhaka, Bangladesh',
    description: 'Comprehensive study in software engineering, algorithms, and data structures.',
  },
];

export const defaultCertifications = [
  {
    id: '1',
    name: 'Machine Learning Specialization',
    issuer: 'Coursera',
    year: '2023',
    credentialUrl: null,
  },
];

export const defaultSiteSettings = {
  siteTitle: 'Shamim Khaled - ML Engineer & Python Developer',
  siteDescription: 'Machine Learning Engineer, Python Developer, and DevOps-focused engineer from Dhaka, Bangladesh. Building scalable AI systems and production-ready applications.',
  siteKeywords: 'Shamim Khaled, ML Engineer, Machine Learning, Python Developer, Django, DevOps, AI, Freelance Developer, Bangladesh',
};

export const defaultSectionConfig = {
  order: [
    'hero',
    'availability',
    'services',
    'about',
    'skills',
    'projects',
    'experience',
    'education',
    'hire',
    'blog',
    'contact',
  ],
  hidden: [],
};

export const defaultContactSettings = {
  formEnabled: true,
  email: 'i.amshamim94@gmail.com',
  autoReplyMessage: 'Thanks for reaching out! I\'ll respond within 24 hours.',
  notificationsEnabled: true,
  heading: 'Get In Touch',
  subheading: 'Ready to start your project? Send me a message.',
  availabilityMessage: 'Open to freelance projects — Free 30-min consultation.',
};

export const defaultFreelanceSettings = {
  available: true,
  availabilityText: 'Open to Work',
  hourlyRate: '$25/hr',
  preferredWorkTypes: ['Remote', 'Hybrid', 'Full-time', 'Part-time', 'Contract', 'Freelance'],
  consultationOffer: 'First 30 min consultation is free',
  consultationCtaText: 'Book Free Consultation',
  responseTime: 'Usually responds within 24 hours',
  timezone: 'Bangladesh Standard Time, UTC+6',
  hirePitch: 'Have a project in mind? Let\'s talk. I\'m ready to help you build scalable backends, AI solutions, and automation tools for your business.',
  hireCtaText: 'Hire Me for Your Project',
};

export const getInitialData = () => ({
  profile: defaultProfile,
  services: defaultServices,
  stats: defaultStats,
  skills: defaultSkills,
  projects: defaultProjects,
  experience: defaultExperience,
  education: defaultEducation,
  certifications: defaultCertifications,
  freelanceSettings: defaultFreelanceSettings,
  contactSettings: defaultContactSettings,
  siteSettings: defaultSiteSettings,
  sectionConfig: defaultSectionConfig,
});
