// src/components/sections/AboutSection.jsx
import React from 'react';
import { Users, Award, Code, Coffee, Brain, Database, BookOpen, ExternalLink, Building, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const AboutSection = () => {
  const { darkMode } = useTheme();

  const achievements = [
    { icon: <Award className="w-8 h-8" />, number: "12+", label: "Achievements", color: "text-yellow-500" },
    { icon: <Code className="w-8 h-8" />, number: "50+", label: "Projects", color: "text-green-500" },
    { icon: <Users className="w-8 h-8" />, number: "20+", label: "Happy Clients", color: "text-blue-500" },
    { icon: <Coffee className="w-8 h-8" />, number: "1000+", label: "Coffee Cups", color: "text-purple-500" }
  ];

  const expertise = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning & AI",
      description: "Deep Learning, Neural Networks, NLP, Computer Vision, Langchain, Vector DB, HuggingFace, OpenAI Models",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Backend Development",
      description: "Django, FastAPI, REST APIs, Database Design, Authentication Systems, Payment Integration",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "Inventory Management Systems, Mobile App APIs, Scalable Web Applications",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const workExperience = [
    {
      company: "Serenus One",
      role: "Software Engineer",
      // period: "2024 Sept - Jan 2025",
      description: "Developing robust Django REST API and FastAPI solutions with user authentication, Google/Discord login integration, payment systems, and TTS systems using Piper TTS and Coqui TTS. Fine-tuning OpenAI GPT-4o models for meditation script generation.",
      icon: <Building className="w-5 h-5" />
    },
    {
      company: "Enny Sports",
      role: "Backend API Developer",
      // period: "2024 - 2025",
      description: "Developed Django REST API backend for Flutter-based iOS and Android fitness application, currently live on App Store and Play Store, connecting sports enthusiasts and personal trainers.",
      icon: <Building className="w-5 h-5" />
    },
    {
      company: "Rana Motors",
      role: "Python Developer",
      // period: "2022 - 2023",
      description: "Designed and developed a comprehensive Inventory Management System using Django, strengthening expertise in building robust web applications and managing scalable databases.",
      icon: <Building className="w-5 h-5" />
    }
  ];

  return (
    <section id="about" className={`py-24 ${
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
            <Users className="w-4 h-4 mr-2" />
            About Me
          </div>
          <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-white to-gray-300' 
              : 'from-gray-900 to-gray-600'
          }`}>
            Crafting Digital Excellence
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I'm a passionate Python Developer and AI/ML Engineer with 2+ years of experience building intelligent systems and solving complex real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>My Journey</h3>
              <div className={`space-y-4 leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                  <p>
                  I am a <strong>Python Developer and AI/ML Engineer</strong> with over <strong>2 years of experience</strong> in building complex AI/ML, and web applications. Skilled at writing clear, concise code that is easy to maintain and troubleshoot. .
                </p>
                <p>
                  My technical expertise spans across <strong>Machine Learning</strong>, <strong>Deep Learning</strong>, and <strong> Web Application Development</strong>. I specialize in building <strong>scalable AI solutions</strong> that drive business value and deliver measurable results.
                </p>
                <p>
                  I'm committed to <strong>continuous learning</strong> and staying current with the latest technological advancements to deliver cutting-edge solutions that make a real difference.
                </p>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Professional Experience</h3>
              
              <div className="space-y-4">
                {workExperience.map((work, index) => (
                  <div key={index} className={`p-6 rounded-xl border-l-4 border-blue-500 ${
                    darkMode ? 'bg-gray-700/50' : 'bg-white shadow-md'
                  }`}>
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        {work.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className={`text-lg font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>{work.company}</h4>
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            darkMode 
                              ? 'bg-blue-900/30 text-blue-300' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {work.period}
                          </span>
                        </div>
                        <p className={`text-sm font-medium mb-2 ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {work.role}
                        </p>
                        <p className={`text-sm leading-relaxed ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
        

            {/* Education & Location */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-center space-x-4 mb-4">
                <Award className="w-6 h-6 text-blue-600" />
                <h4 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Education</h4>
              </div>
              <p className={`mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <strong>BSc in Computer Science and Engineering</strong><br />
                North South University, Bangladesh 
                {/* (2018-2022) */}
              </p>
              
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>

            <a 
              href="https://drive.google.com/file/d/1L9COYGeo4UQxHUz4aFFMZkSkqqqXV0Qq/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Download CV
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Expertise Cards */}
          <div className="space-y-6">
            <h3 className={`text-3xl font-bold mb-8 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Core Expertise</h3>
            {expertise.map((item, index) => (
              <div key={index} className={`group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-3 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{item.title}</h4>
                    <p className={`leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Key Technologies */}
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-white shadow-lg'
              }`}>
              <h4 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Key Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Python', 'Django', 'REST APIs', 'Deep Learning', 'TensorFlow', 'Keras', 'Langchain', 'Vector DB', 'Open AI Model', 'HuggingFace', 'MySQL',
                  'PostgreSQL', 'Docker', 'Git', 'JavaScript',
                ].map((tech, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      darkMode 
                        ? 'bg-blue-900/50 text-blue-200' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>


            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <div className={`${achievement.color} mx-auto mb-3 flex justify-center items-center`}>
                    {achievement.icon}
                  </div>
                  <div className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{achievement.number}</div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{achievement.label}</div>
                </div>
              ))}
            </div>





          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;