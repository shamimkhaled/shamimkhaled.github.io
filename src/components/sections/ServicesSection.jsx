// src/components/sections/ServicesSection.jsx
import React from 'react';
import { DollarSign, Brain, Globe, Code, BarChart3, CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ServicesSection = ({ scrollToSection }) => {
  const { darkMode } = useTheme();

  const services = [
    {
      title: "AI/ML Development",
      description: "Custom machine learning models, neural networks, and AI solutions tailored to solve your specific business challenges with cutting-edge technology.",
      hourlyRate: "$35/hr",
      projectRate: "Starting at $2,500",
      features: [
        "Custom Model Development",
        "Deep Learning Solutions", 
        "Computer Vision Systems",
        "NLP Applications",
        "Model Deployment & Optimization",
        "Performance Monitoring"
      ],
      icon: <Brain className="w-10 h-10" />,
      color: "from-blue-500 to-cyan-500",
      popular: true
    },
    {
      title: "Web Application Development",
      description: "Full-stack web applications using modern technologies like React, Django, and cloud platforms for scalable and robust solutions.",
      hourlyRate: "$30/hr",
      projectRate: "Starting at $2,000",
      features: [
        "Frontend Development (React, Vue.js)",
        "Backend APIs (Django, FastAPI)",
        "Database Design & Optimization",
        "Cloud Deployment (AWS, Docker)",
        "Real-time Features",
        "Mobile-Responsive Design"
      ],
      icon: <Globe className="w-10 h-10" />,
      color: "from-green-500 to-emerald-500",
      popular: false
    },
    {
      title: "Backend Development",
      description: "Robust backend systems, APIs, and microservices architecture with focus on performance, scalability, and security.",
      hourlyRate: "$25/hr", 
      projectRate: "Starting at $1,500",
      features: [
        "REST API Development",
        "Database Architecture",
        "Authentication Systems",
        "Microservices Design",
        "Performance Optimization",
        "Security Implementation"
      ],
      icon: <Code className="w-10 h-10" />,
      color: "from-purple-500 to-pink-500",
      popular: false
    },
    {
      title: "Data Science Consulting",
      description: "Comprehensive data analysis, visualization, and insights to drive informed business decisions and strategic planning.",
      hourlyRate: "$20/hr",
      projectRate: "Starting at $1,200",
      features: [
        "Data Analysis & Mining",
        "Statistical Modeling",
        "Business Intelligence",
        "Data Visualization",
        "Predictive Analytics",
        "Reporting & Dashboards"
      ],
      icon: <BarChart3 className="w-10 h-10" />,
      color: "from-orange-500 to-red-500",
      popular: false
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            darkMode 
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
          }`}>
            <DollarSign className="w-4 h-4 mr-2" />
            Services & Pricing
          </div>
          <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-white to-gray-300' 
              : 'from-gray-900 to-gray-600'
          }`}>
            Professional Services
          </h2>
          <p className={`text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive solutions to accelerate your business with AI and modern technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`relative p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            } ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
              
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Service Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{service.title}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`text-lg font-semibold ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>{service.hourlyRate}</span>
                    <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{service.projectRate}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className={`mb-8 leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                    service.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : darkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full px-6 py-3 border-2 rounded-2xl font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400' 
                      : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  Discuss Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className={`inline-block p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Why Choose My Services?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Fast Delivery</h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Quick turnaround with quality guaranteed</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Latest Technology</h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Cutting-edge tools and frameworks</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Scalable Solutions</h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Built for growth and performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;