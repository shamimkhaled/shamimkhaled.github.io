// src/components/sections/ServicesSection.jsx
import React, { useState } from 'react';
import { 
  DollarSign, Brain, Globe, Code, CheckCircle, 
  Clock, Zap, TrendingUp, MessageSquare, Users, Star 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ServicesSection = ({ scrollToSection }) => {
  const { darkMode } = useTheme();
  const [pricingType, setPricingType] = useState('hourly'); // 'hourly' or 'project'

  const services = [
    {
      id: 'aiml',
      title: "AI/ML Development",
      description: "Custom machine learning models, neural networks, and AI solutions tailored to solve your specific business challenges with cutting-edge technology.",
      hourlyRate: 35,
      projectRate: 2000,
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
      popular: false,
      hasProjectRate: true
    },
    {
      id: 'webapp',
      title: "Web Application Development",
      description: "Full-stack web applications using modern technologies like React, Django, and cloud platforms for scalable and robust solutions.",
      hourlyRate: 30,
      projectRate: 2000,
      features: [
        "Frontend Development (React JS)",
        "Backend APIs (Django, FastAPI)",
        "Database Design & Optimization",
        "Cloud Deployment (Digital Ocean, Docker)",
        "Real-time Features",
        "Mobile-Responsive Design"
      ],
      icon: <Globe className="w-10 h-10" />,
      color: "from-green-500 to-emerald-500",
      popular: false,
      hasProjectRate: true
    },
    {
      id: 'backend',
      title: "Backend Development",
      description: "Robust backend systems, APIs, and microservices architecture with focus on performance, scalability, and security.",
      hourlyRate: 25,
      projectRate: 1000,
      features: [
        "REST API Development",
        "Database Architecture",
        "Authentication Systems",
        // "Microservices Design",
        "Performance Optimization",
        "Security Implementation"
      ],
      icon: <Code className="w-10 h-10" />,
      color: "from-purple-500 to-pink-500",
      popular: true,
      hasProjectRate: true
    },
    {
      id: 'consulting',
      title: "Software/Project Consulting",
      description: "Expert consultation for software architecture, project planning, technology decisions, and strategic technical guidance for your business.",
      hourlyRate: 20,
      projectRate: null,
      features: [
        "Technical Architecture Review",
        "Technology Stack Consultation",
        "Project Planning & Strategy",
        "Code Review & Best Practices",
        "Performance Optimization Advice",
        "Team Training & Mentoring"
      ],
      icon: <MessageSquare className="w-10 h-10" />,
      color: "from-orange-500 to-red-500",
      popular: false,
      hasProjectRate: false,
      hourlyOnly: true
    }
  ];

  const formatPrice = (service) => {
    if (service.hourlyOnly) {
      return `$${service.hourlyRate}/hr`;
    }
    
    if (pricingType === 'hourly') {
      return `$${service.hourlyRate}/hr`;
    } else {
      return `Starting at $${service.projectRate.toLocaleString()}`;
    }
  };

  const getPriceSubtext = (service) => {
    if (service.hourlyOnly) {
      return "Consultation only";
    }
    
    if (pricingType === 'hourly') {
      return "Per hour rate";
    } else {
      return "Fixed project pricing";
    }
  };

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
          <p className={`text-xl mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive solutions to accelerate your business with AI and modern technology
          </p>

          {/* Pricing Toggle */}
          <div className={`inline-flex items-center p-1 rounded-2xl shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <button
              onClick={() => setPricingType('hourly')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                pricingType === 'hourly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Hourly Rate
            </button>
            <button
              onClick={() => setPricingType('project')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                pricingType === 'project'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Star className="w-4 h-4 inline mr-2" />
              Project Based
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className={`relative p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
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

              {/* Hourly Only Badge */}
              {service.hourlyOnly && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    Hourly Only
                  </div>
                </div>
              )}

              {/* Service Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg flex-shrink-0`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{service.title}</h3>
                  
                  {/* Price Display */}
                  <div className="mb-3">
                    <div className={`text-3xl font-bold ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {formatPrice(service)}
                    </div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {getPriceSubtext(service)}
                    </div>
                  </div>

                  {/* Pricing Info for Project-based when available */}
                  {!service.hourlyOnly && pricingType === 'project' && (
                    <div className={`text-xs px-3 py-1 rounded-full inline-block mb-2 ${
                      darkMode 
                        ? 'bg-green-900/30 text-green-300 border border-green-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Also available at ${service.hourlyRate}/hr
                    </div>
                  )}

                  {/* Hourly rate info for hourly pricing */}
                  {!service.hourlyOnly && pricingType === 'hourly' && service.hasProjectRate && (
                    <div className={`text-xs px-3 py-1 rounded-full inline-block mb-2 ${
                      darkMode 
                        ? 'bg-purple-900/30 text-purple-300 border border-purple-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      Project rates available
                    </div>
                  )}
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
                <h4 className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>What's included:</h4>
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Details for Project-based */}
              {!service.hourlyOnly && pricingType === 'project' && (
                <div className={`p-4 rounded-xl mb-6 ${
                  darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className="flex items-center justify-between text-sm">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Minimum project size:
                    </span>
                    <span className={`font-semibold ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      ${service.projectRate.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Hourly alternative:
                    </span>
                    <span className={`font-semibold ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      ${service.hourlyRate}/hr
                    </span>
                  </div>
                </div>
              )}

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
                  {service.hourlyOnly ? 'Book Consultation' : 'Get Started'}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full px-6 py-3 border-2 rounded-2xl font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400' 
                      : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  Discuss Requirements
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Comparison Table */}
        <div className="mt-20">
          <h3 className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Quick Pricing Overview
          </h3>
          
          <div className={`overflow-hidden rounded-2xl shadow-xl ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Service
                    </th>
                    <th className={`px-6 py-4 text-center font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Hourly Rate
                    </th>
                    <th className={`px-6 py-4 text-center font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Project Starting
                    </th>
                    <th className={`px-6 py-4 text-center font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service.id} className={`border-t ${
                      darkMode ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <td className={`px-6 py-4 font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${service.color} text-white`}>
                            {React.cloneElement(service.icon, { className: "w-4 h-4" })}
                          </div>
                          <span>{service.title}</span>
                          {service.popular && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-center font-bold ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        ${service.hourlyRate}/hr
                      </td>
                      <td className={`px-6 py-4 text-center font-bold ${
                        service.hourlyOnly 
                          ? darkMode ? 'text-gray-500' : 'text-gray-400'
                          : darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {service.hourlyOnly ? 'N/A' : `$${service.projectRate.toLocaleString()}`}
                      </td>
                      <td className={`px-6 py-4 text-center text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {service.hourlyOnly 
                          ? 'Short consultations' 
                          : index === 0 ? 'Complex AI projects'
                          : index === 1 ? 'Full applications'
                          : index === 2 ? 'API development'
                          : 'Quick advice'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Not sure which option is right for you?
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Let's discuss your project requirements and find the perfect pricing model for your needs.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Users className="w-5 h-5 inline mr-2" />
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;