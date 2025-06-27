 // src/components/sections/SkillsSection.jsx
import React from 'react';
import { Cpu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SkillsSection = () => {
  const { darkMode } = useTheme();

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 95, icon: "🐍" },
        { name: "JavaScript", level: 85, icon: "⚡" },
        { name: "SQL", level: 90, icon: "🗄️" },
        { name: "R", level: 75, icon: "📊" }
      ]
    },
    {
      title: "AI/ML Frameworks",
      skills: [
        { name: "TensorFlow", level: 90, icon: "🧠" },
        { name: "PyTorch", level: 88, icon: "🔥" },
        { name: "Scikit-learn", level: 92, icon: "🔬" },
        { name: "OpenCV", level: 85, icon: "👁️" }
      ]
    },
    {
      title: "Web Technologies",
      skills: [
        { name: "Django", level: 90, icon: "🎸" },
        { name: "FastAPI", level: 85, icon: "⚡" },
        { name: "React", level: 80, icon: "⚛️" },
        { name: "Node.js", level: 75, icon: "🟢" }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Docker", level: 85, icon: "🐳" },
        { name: "AWS", level: 80, icon: "☁️" },
        { name: "Git", level: 95, icon: "📝" },
        { name: "MongoDB", level: 85, icon: "🍃" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            darkMode 
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
          }`}>
            <Cpu className="w-4 h-4 mr-2" />
            Technical Skills
          </div>
          <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-white to-gray-300' 
              : 'from-gray-900 to-gray-600'
          }`}>
            Technology Stack
          </h2>
          <p className={`text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Proficient in cutting-edge technologies and frameworks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className={`font-semibold ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{skill.name}</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <div className={`w-full h-3 rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
