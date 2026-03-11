/**
 * Single source of truth for portfolio data.
 * Persisted to localStorage via usePortfolioData hook.
 */

export const defaultProfile = {
  name: 'Shamim Khaled',
  title: 'Python & Django Developer',
  tagline: 'Building scalable backends and intelligent systems that drive business value.',
  email: 'i.amshamim94@gmail.com',
  phone: '+880 1903526254',
  location: 'Dhaka, Bangladesh',
  avatar: '/assets/images/shamim.jpeg',
  resumeUrl: 'https://drive.google.com/file/d/1L9COYGeo4UQxHUz4aFFMZkSkqqqXV0Qq/view?usp=sharing',
  bio: `I'm a passionate Python Developer and AI/ML Engineer with 2+ years of experience building intelligent systems and solving complex real-world problems. My technical expertise spans across Machine Learning, Deep Learning, and Web Application Development. I specialize in building scalable AI solutions that drive business value and deliver measurable results. I'm committed to continuous learning and staying current with the latest technological advancements.`,
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
    title: 'Backend Development',
    description: 'Python, Django, REST APIs — robust, scalable server-side solutions.',
    icon: 'backend',
  },
  {
    id: '2',
    title: 'Frontend Development',
    description: 'React, Tailwind, responsive UI — clean, performant interfaces.',
    icon: 'frontend',
  },
  {
    id: '3',
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
      { name: 'Git', icon: '📝' },
      { name: 'Digital Ocean', icon: '🌊' },
      { name: 'Linux', icon: '🐧' },
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
    company: 'Serenus One',
    role: 'Software Engineer',
    dateRange: 'Sept 2024 - Jan 2025',
    jobType: 'Full-time',
    description: 'Developing robust Django REST API and FastAPI solutions with user authentication, Google/Discord login integration, payment systems, and TTS systems using Piper TTS and Coqui TTS. Fine-tuning OpenAI GPT-4o models for meditation script generation.',
    achievements: [
      'Built Django REST API with OAuth integration',
      'Implemented TTS systems with Piper and Coqui',
      'Fine-tuned GPT-4o for specialized content generation',
    ],
    technologies: ['Django', 'FastAPI', 'OpenAI', 'PostgreSQL'],
  },
  {
    id: '2',
    company: 'Enny Sports',
    role: 'Tech Lead - Backend (Python)',
    dateRange: '2024 - 2025',
    jobType: 'Full-time',
    description: 'Developed Django REST API backend for Flutter-based iOS and Android fitness application, currently live on App Store and Play Store.',
    achievements: [
      'Led backend architecture for fitness app',
      'Deployed to production on App Store and Play Store',
      'Integrated with Flutter mobile app',
    ],
    technologies: ['Django', 'REST API', 'PostgreSQL', 'Flutter'],
  },
  {
    id: '3',
    company: 'Rana Motors',
    role: 'Jr Software Engineer',
    dateRange: '2022 - 2023',
    jobType: 'Full-time',
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
  preferredWorkTypes: ['Remote Work', 'Freelance Projects', 'Contract Work', 'Full-time'],
  consultationOffer: 'First 30 min consultation is free',
  consultationCtaText: 'Book Free Consultation',
  responseTime: 'Usually responds within 24 hours',
  timezone: 'Bangladesh Standard Time, UTC+6',
  hirePitch: 'Have a project in mind? Let\'s talk. I\'m ready to help you build scalable backends, AI solutions, and automation tools for your business.',
  hireCtaText: 'Hire Me for Your Project',
};

export const STORAGE_KEY = 'shamim_portfolio_data';

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
});
