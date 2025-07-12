// src/components/sections/ProjectsSection.jsx
import React, { useState } from 'react';
import { 
  Rocket, Github, ExternalLink, ArrowRight, ChevronLeft, 
  ChevronRight, Eye, Smartphone, Globe, Code, BarChart3 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ProjectsSection = () => {
  const { darkMode } = useTheme();

  const projects = [
    {
      title: "Ecommerz Backend API with Django Rest Framework",
      description: "Developed a comprehensive backend API for an e-commerce platform using Django Rest Framework, featuring authentication, product management, cart functionality, and order handling with advanced security measures.",
      technologies: ["Django", "DRF", "PostgreSQL", "JWT", "Redis", "Celery"],
      github: "https://github.com/shamimkhaled/ecommerz-backend-api",
      liveUrl: null,
      image: "/assets/projects/proj_0.png",
      featured: true,
      category: "Backend"
    },
    {
      title: "Crop Disease Prediction AI Web App",
      description: "Built an intelligent web application for crop disease prediction using Transfer Learning models like InceptionV3 and MobileNetV2, achieving 94% accuracy in disease detection.",
      technologies: ["Django", "TensorFlow", "InceptionV3", "MobileNetV2", "OpenCV"],
      github: "https://github.com/shamimkhaled/crop-disease-image-classification-web-app",
      liveUrl: "https://youtu.be/2RAJUHiOKLc",
      image: "/assets/projects/proj_5.png",
      featured: true,
      category: "AI/ML"
    },
    {
      title: "LLM Q&A Chatbot with OpenAI",
      description: "Created an advanced chatbot capable of analyzing PDF documents using OpenAI's language models and VectorDB for efficient data extraction and conversational AI capabilities.",
      technologies: ["OpenAI", "Langchain", "VectorDB", "Streamlit", "FAISS"],
      github: "https://github.com/shamimkhaled/LLM-QnA-Chatbot-App",
      liveUrl: "https://youtu.be/l1udKyDJUSI",
      image: "/assets/projects/proj_000.png",
      featured: true,
      category: "AI/ML"
    },
    {
      title: "Enny Sports Mobile Application",
      description: "Developing the Django REST API for Flutter-based iOS and Android fitness app. Enny Sports unites sports enthusiasts, connecting individuals interested in various sports and fitness activities. Users can find certified personal trainers and participate in courses.",
      technologies: ["Django", "REST API", "Flutter", "PostgreSQL", "iOS", "Android", "Digital Ocean"],
      github: null,
      liveUrl: "https://play.google.com/store/apps/details?id=com.ennysports.app&hl=en&pli=1",
      image: "/assets/projects/enny-sports.jpeg",
      featured: true,
      category: "Web App"
    },
    {
      title: "Vashelah - Spices Item Delivery System",
      description: "Discover culinary masterpieces crafted by world-class chefs and delivered fresh to your doorstep. Handpicked selections from culinary experts, featuring the finest ingredients and innovative flavors.",
      technologies: ["Next JS", "Django", "REST API", "PostgreSQL", "Stripe", "Tailwind CSS", "Digital Ocean"],
      github: null,
      liveUrl: "https://www.vashelah.com/",
      image: "/assets/projects/vashelah.png",
      featured: true,
      category: "Web App"
    },
    {
      title: "TechKreativ React App Template",
      description: "TechKreativ React App Template is modern hybrid architecture combining traditional web technologies with React components for enhanced interactivity and user experience.",
      technologies: ["React", "Tailwind CSS", "CSS3", "Responsive Design"],
      github: null,
      liveUrl: "https://techkreativ-react-app.vercel.app/",
      image: "/assets/projects/techkreativ.png",
      featured: false,
      category: "Web App"
    },
    {
      title: "TechXen React App Template",
      description: "Professional React app template designed for companies and organizations, featuring modern UI components, responsive design, and clean architecture for business websites.",
      technologies: ["React", "CSS3", "JavaScript", "Bootstrap", "Responsive Design"],
      github: null,
      liveUrl: "https://techxen-react-app-template.vercel.app/",
      image: "/assets/projects/techxen.png",
      featured: false,
      category: "Web App"
    },
    {
      title: "Stock Market Analysis & Prediction",
      description: "Implemented multiple machine learning models including ARIMA, LSTM, Prophet, and GRU for stock market price prediction with real-time data integration.",
      technologies: ["Python", "LSTM", "ARIMA", "Prophet", "GRU", "Pandas"],
      github: "https://github.com/shamimkhaled/Machine-Learning",
      liveUrl: null,
      image: "/assets/projects/proj_6.png",
      featured: false,
      category: "AI/ML"
    },
    {
      title: "Book Recommender System",
      description: "Built an intelligent book recommendation system using collaborative filtering with KNN, LightFM, and Cosine Similarity algorithms, deployed as a Streamlit application.",
      technologies: ["Python", "KNN", "LightFM", "Streamlit", "Scikit-learn"],
      github: "https://github.com/shamimkhaled/books-recommender-system-streamlit-application",
      liveUrl: "https://youtu.be/QnThEjQNvYQ",
      image: "/assets/projects/proj_8.png",
      featured: false,
      category: "AI/ML"
    },
    {
      title: "Gemini Pro ATS Resume Analyzer",
      description: "A Streamlit application that leverages Google's Gemini Pro Vision model to analyze resumes against job descriptions. Acts as an AI-powered Application Tracking System (ATS) offering tailored feedback, skill improvement suggestions, and match percentage evaluation.",
      technologies: ["Google Gemini Pro", "Streamlit", "Langchain", "PDF", "AI Evaluation"],
      github: "https://github.com/shamimkhaled/GeminiProAIModel-ATS-Resume-Expert",
      liveUrl: "https://youtu.be/gCj_4OlbTU8",
      image: "/assets/projects/proj_10.png",
      featured: true,
      category: "AI/ML"
    },

    {
      title: "Data Extraction with LLM",
      description: "A Streamlit application designed to extract structured data from URLs using Langchain and the OpenAI API. Users can input a URL, and the app scrapes content and generates clean JSON-formatted data using an LLM.",
      technologies: ["OpenAI", "Langchain", "Streamlit", "Web Scraping", "JSON"],
      github: "https://github.com/shamimkhaled/llm-with-web-scraping",
      liveUrl: null,
      image: "/assets/projects/proj_11.png",
      featured: false,
      category: "AI/ML"
    },



    {
      title: "Emotion Speech Recognition with LSTM",
      description: "Developed an LSTM-based deep learning model for recognizing emotions in speech using advanced NLP techniques and audio signal processing.",
      technologies: ["Python", "LSTM", "NLP", "Librosa", "TensorFlow"],
      github: "https://github.com/shamimkhaled/emotion-speech-recognition-with-audioclassification-",
      liveUrl: null,
      image: "/assets/projects/proj_9.png",
      featured: false,
      category: "AI/ML"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const categories = [
    { id: 'All', label: 'All Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'AI/ML', label: 'AI/ML', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'Backend', label: 'Backend', icon: <Code className="w-4 h-4" /> },
    { id: 'Web App', label: 'Web App', icon: <Globe className="w-4 h-4" /> },
    { id: 'Other', label: 'Other', icon: <Rocket className="w-4 h-4" /> }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to projects section
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'AI/ML': return <BarChart3 className="w-3 h-3" />;
      case 'Backend': return <Code className="w-3 h-3" />;
      case 'Web App': return <Globe className="w-3 h-3" />;
      default: return <Rocket className="w-3 h-3" />;
    }
  };

  return (
    <section id="projects" className={`py-24 ${
      darkMode ? 'bg-gray-800/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            darkMode 
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
          }`}>
            <Rocket className="w-4 h-4 mr-2" />
            My Projects
          </div>
          <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-white to-gray-300' 
              : 'from-gray-900 to-gray-600'
          }`}>
            Featured Work
          </h2>
          <p className={`text-xl mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Showcasing my best work in AI, ML, web development, and more
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : darkMode
                      ? 'bg-gray-600 text-gray-400'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.id === 'All' ? projects.length : projects.filter(p => p.category === category.id).length}
                </span>
              </button>
            ))}
          </div>

          {/* Results info */}
          <div className={`text-sm mb-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProjects.map((project, index) => (
            <div key={`${project.title}-${index}`} className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 text-sm leading-relaxed line-clamp-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        darkMode 
                          ? 'bg-blue-900/50 text-blue-200' 
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      darkMode 
                        ? 'bg-gray-600 text-gray-400' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-1 transition-colors group ${
                          darkMode 
                            ? 'text-blue-400 hover:text-blue-300' 
                            : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-medium">Code</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-1 transition-colors group ${
                          darkMode 
                            ? 'text-green-400 hover:text-green-300' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Live</span>
                        <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                      </a>
                    )}
                  </div>
                  {project.category === 'Web App' && project.liveUrl && (
                    <Smartphone className={`w-5 h-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages
                  ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center">
          <a 
            href="https://github.com/shamimkhaled?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white' 
                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
            }`}
          >
            <Github className="w-5 h-5 mr-2" />
            Explore All Projects on GitHub
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;