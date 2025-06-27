// src/components/sections/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Github, Linkedin, Mail, Youtube, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const HeroSection = ({ scrollToSection }) => {
  const { darkMode } = useTheme();
  const [typewriterText, setTypewriterText] = useState('');
  const texts = ['Python Developer', 'AI/ML Engineer', 'Backend Developer', 'Software Engineer'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
    const currentText = texts[currentTextIndex];
    
    if (typewriterText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypewriterText('');
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
    }
    
    return () => clearTimeout(timeout);
  }, [typewriterText, currentTextIndex]);

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Effects */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}></div>
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                darkMode 
                  ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                  : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
              }`}>
                <Sparkles className="w-4 h-4 mr-2" />
                Available for New Projects
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className={`block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hello, I'm
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Shamim Khaled
                </span>
              </h1>
              
              <div className="h-16">
                <h2 className={`text-2xl lg:text-4xl font-semibold ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {typewriterText}
                  <span className="animate-pulse text-blue-600">|</span>
                </h2>
              </div>
              
              <p className={`text-xl max-w-xl leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Passionate about building intelligent systems, solving real-world challenges, and delivering data-driven solutions that transform businesses.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">15+</div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Achievements</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                View My Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 border-2 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  darkMode 
                    ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white' 
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Let's Talk
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a 
                href="https://github.com/shamimkhaled" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-blue-400' 
                    : 'bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/shamim-khaled/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-blue-400' 
                    : 'bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/@spikegrowth" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-red-400' 
                    : 'bg-gray-100 text-gray-600 hover:text-red-600'
                }`}
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a 
                href="mailto:i.amshamim94@gmail.com"
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-blue-400' 
                    : 'bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-96 h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl rotate-6 animate-pulse"></div>
                <div className={`absolute inset-2 rounded-3xl ${
                  darkMode ? 'bg-gray-900' : 'bg-white'
                }`}></div>
                <img 
                  src="/assets/images/shamim.jpeg" 
                  alt="Shamim Khaled" 
                  className="absolute inset-4 w-88 h-88 rounded-2xl object-cover"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg animate-bounce">
                Python Developer
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg animate-bounce delay-1000">
                Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;