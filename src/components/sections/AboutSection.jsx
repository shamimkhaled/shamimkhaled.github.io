// src/components/sections/AboutSection.jsx
import React from 'react';
import { Users, Award, Code, Coffee, Brain, Database, BookOpen, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const AboutSection = () => {
  const { darkMode } = useTheme();

  const achievements = [
    { icon: <Award className="w-8 h-8" />, number: "15+", label: "Achievements", color: "text-yellow-500" },
    { icon: <Code className="w-8 h-8" />, number: "50+", label: "Projects", color: "text-green-500" },
    { icon: <Users className="w-8 h-8" />, number: "20+", label: "Happy Clients", color: "text-blue-500" },
    { icon: <Coffee className="w-8 h-8" />, number: "1000+", label: "Coffee Cups", color: "text-purple-500" }
  ];

  const expertise = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning & AI",
      description: "Deep Learning, Neural Networks, NLP, Computer Vision, Predictive Modeling",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Backend Development",
      description: "Django, FastAPI, REST APIs, Database Design, Microservices",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Science",
      description: "Data Analysis, Visualization, Statistical Modeling, Business Intelligence",
      color: "from-purple-500 to-pink-500"
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
            I'm a passionate AI/ML Engineer and Data Scientist with 2+ years of experience building intelligent systems and solving complex real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                  I graduated with a BSc in Computer Science and Engineering from North South University, Bangladesh (2018-2022). Since then, I've been dedicated to developing and implementing machine learning and deep learning models.
                </p>
                <p>
                  My expertise spans across various domains including natural language processing, computer vision, and web development. I specialize in building scalable AI solutions that drive business value and solve real-world challenges.
                </p>
                <p>
                  I believe in continuous learning and staying updated with the latest technological advancements to deliver cutting-edge solutions.
                </p>
              </div>
            </div>
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center text-center">
              {achievements.map((achievement, index) => (
                <div key={index} className={`text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <div className={`${achievement.color} mx-auto mb-3 justify-center flex items-center rounded-full shadow-lg`}>
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

            <a 
              href="https://drive.google.com/file/d/1MqXGYYIyA-VpeARUwq77lTufxe1k7udh/view?usp=sharing"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;