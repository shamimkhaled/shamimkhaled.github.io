// src/components/sections/TestimonialsSection.jsx
import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const TestimonialsSection = () => {
  const { darkMode } = useTheme();

  const testimonials = [
    // {
    //   name: "Sarah Johnson",
    //   role: "CTO, TechInnovate",
    //   company: "TechInnovate Solutions",
    //   content: "Shamim delivered an exceptional AI solution that exceeded our expectations. His expertise in machine learning and attention to detail made all the difference. The crop disease detection model achieved 96% accuracy!",
    //   rating: 5,
    //   image: "/api/placeholder/80/80",
    //   project: "AI/ML Development"
    // },
    // {
    //   name: "Michael Chen",
    //   role: "Product Manager, DataFlow",
    //   company: "DataFlow Analytics", 
    //   content: "Working with Shamim was a pleasure. He understood our requirements perfectly and delivered a robust backend system on time. The API performance improved by 40% after optimization.",
    //   rating: 5,
    //   image: "/api/placeholder/80/80",
    //   project: "Backend Development"
    // },
    // {
    //   // name: "Alif",
    //   // role: "",
    //   // company: "University",
    //   content: "The crop disease prediction model Shamim built for us has been incredibly accurate and valuable for our university capstone project. Highly recommended!",
    //   rating: 5,
    //   image: "/api/placeholder/80/80",
    //   project: "Transfer Learning Model Development - Capstone Project"
    // },
    {
      name: "An Aorus",
      role: "Youtuber",
      company: "Youtuber",
      content: "Amazing Work Bro I can't Believe I found your video as your subscribers are not enough to become in search result thanks, I just want to know that how I can search, save, update, and delete specific record in CSV file but you resolved one section if you can help me related to other please do Love from Pakistan..!",
      rating: 5,
      image: "/assets/testimonials/an-aorus.jpg",
      project: "CSV File Data Manipulation"
    },
    {
      name: "Alex Guemez",
      role: "Consultor de Marketing",
      company: "Abagados en Merida",
      content: "I liked his willingness to help me even when the server was too slow. Thank you so much for your help and I definitively will contact you again if I need more help. Thanks!",
      rating: 5,
      image: "/assets/testimonials/alexguemez.png",
      project: "Captcha Solver: Bypass reCAPTCHA with Python"
    },
    // {
    //   name: "Alif",
    //   role: "Student",
    //   company: "NSU",
    //   content: "Shamim's backend architecture design was brilliant. The scalable solution he built handles our growing user base seamlessly. Professional, reliable, and technically excellent.",
    //   rating: 5,
    //   image: "/api/placeholder/80/80",
    //   project: "Transfer Learning Model Development"
    // }
  ];

  return (
    <section id="testimonials" className={`py-24 ${
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
            <MessageCircle className="w-4 h-4 mr-2" />
            Client Testimonials
          </div>
          <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-white to-gray-300' 
              : 'from-gray-900 to-gray-600'
          }`}>
            What Clients Say
          </h2>
          <p className={`text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Real feedback from satisfied clients across various industries
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className={`mb-6 italic leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                "{testimonial.content}"
              </p>

              {/* Project Type */}
              <div className="mb-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  darkMode 
                    ? 'bg-blue-900/50 text-blue-200' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {testimonial.project}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{testimonial.name}</div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{testimonial.role}</div>
                  <div className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">2+</div>
            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
