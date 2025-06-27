// src/components/layout/Footer.jsx
import React from 'react';
import { Sparkles, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer className={`py-16 ${
      darkMode 
        ? 'bg-gray-900 border-t border-gray-800' 
        : 'bg-gray-50 border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Shamim Khaled
              </div>
            </div>
            <p className={`mb-6 max-w-md ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              AI/ML Engineer & Data Scientist passionate about building intelligent systems and solving real-world challenges with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
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
                <Github className="w-5 h-5" />
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
                <Linkedin className="w-5 h-5" />
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
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="mailto:i.amshamim94@gmail.com"
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-blue-400' 
                    : 'bg-gray-100 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Quick Links</h4>
            <div className="space-y-3">
              {['About', 'Skills', 'Projects', 'Services'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-lg font-semibold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Services</h4>
            <div className="space-y-3">
              {['AI/ML Development', 'Web Development', 'Backend APIs', 'Data Science'].map((service) => (
                <div key={service} className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 Shamim Khaled. All rights reserved. Built with React and Tailwind CSS.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Made with ❤️ in Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
