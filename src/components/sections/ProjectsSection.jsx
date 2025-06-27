// src/components/sections/ProjectsSection.jsx
import React, { useState } from 'react';
import { Rocket, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ProjectsSection = () => {
  const { darkMode } = useTheme();

  const projects = [
    {
      title: "Ecommerz Backend API with Django Rest Framework",
      description: "Developed a comprehensive backend API for an e-commerce platform using Django Rest Framework, featuring authentication, product management, cart functionality, and order handling with advanced security measures.",
      technologies: ["Django", "DRF", "PostgreSQL", "JWT", "Redis", "Celery"],
      github: "https://github.com/shamimkhaled/ecommerz-backend-api",
      image: "/assets/projects/proj_0.png",
      featured: true,
      category: "Backend"
    },
    {
      title: "Crop Disease Prediction AI Web App",
      description: "Built an intelligent web application for crop disease prediction using Transfer Learning models like InceptionV3 and MobileNetV2, achieving 94% accuracy in disease detection.",
      technologies: ["Django", "TensorFlow", "InceptionV3", "MobileNetV2", "OpenCV"],
      github: "https://github.com/shamimkhaled/crop-disease-image-classification-web-app",
      image: "/assets/projects/proj_4.png",
      featured: true,
      category: "AI/ML"
    },
    {
      title: "LLM Q&A Chatbot with OpenAI",
      description: "Created an advanced chatbot capable of analyzing PDF documents using OpenAI's language models and VectorDB for efficient data extraction and conversational AI capabilities.",
      technologies: ["OpenAI", "Langchain", "VectorDB", "Streamlit", "FAISS"],
      github: "https://github.com/shamimkhaled/LLM-QnA-Chatbot-App",
      image: "/assets/projects/proj_000.png",
      featured: true,
      category: "AI/ML"
    },
    {
      title: "Stock Market Analysis & Prediction",
      description: "Implemented multiple machine learning models including ARIMA, LSTM, Prophet, and GRU for stock market price prediction with real-time data integration.",
      technologies: ["Python", "LSTM", "ARIMA", "Prophet", "GRU", "Pandas"],
      github: "https://github.com/shamimkhaled/Machine-Learning",
      image: "/assets/projects/proj_2.png",
      featured: false,
      category: "Data Science"
    },
    {
      title: "Book Recommender System",
      description: "Built an intelligent book recommendation system using collaborative filtering with KNN, LightFM, and Cosine Similarity algorithms, deployed as a Streamlit application.",
      technologies: ["Python", "KNN", "LightFM", "Streamlit", "Scikit-learn"],
      github: "https://github.com/shamimkhaled/books-recommender-system-streamlit-application",
      image: "/assets/projects/proj_00.png",
      featured: false,
      category: "AI/ML"
    },
    {
      title: "Emotion Speech Recognition with LSTM",
      description: "Developed an LSTM-based deep learning model for recognizing emotions in speech using advanced NLP techniques and audio signal processing.",
      technologies: ["Python", "LSTM", "NLP", "Librosa", "TensorFlow"],
      github: "https://github.com/shamimkhaled/emotion-speech-recognition-with-audioclassification-",
      image: "/assets/projects/proj_0.png",
      featured: false,
      category: "AI/ML"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'AI/ML', 'Backend', 'Data Science'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
            Showcasing my best work in AI, ML, and web development
          </p>

          {/* Category Filter */}
          <div className="flex justify-center space-x-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
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
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
                  {project.category}
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
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 transition-colors group ${
                      darkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">View Code</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <ExternalLink className={`w-5 h-5 transition-colors cursor-pointer ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-300' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
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