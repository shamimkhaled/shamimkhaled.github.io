// src/components/sections/ContactSection.jsx
import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, Github, Linkedin, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ContactSection = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    // Email notification logic would go here
    alert('Message sent successfully! I\'ll get back to you within 24 hours.');
    setSubmitStatus(null);

    try {
      // Initialize EmailJS (you can also do this in your main app file)
      const emailjs = (await import('emailjs-com')).default;
      
      // EmailJS configuration
      const serviceID = 'service_0zajjqr';
      const templateID = 'template_17h7muw';
      const publicKey = 'KhzHXlrm1yBH8il8j';

      // Prepare template parameters matching your EmailJS template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        message: formData.message,
        to_email: 'i.amshamim94@gmail.com' // Your email
      };

      // Send email
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', budget: '', timeline: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "i.amshamim94@gmail.com",
      description: "I'll respond within 24 hours",
      link: "mailto:i.amshamim94@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "WhatsApp / Telegram", 
      value: "+880 1903526254",
      description: "Available Mon-Fri, 9AM-6PM",
      link: "tel:+8801903526254"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      description: "Available for remote work globally"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      value: "< 24 hours", 
      description: "Quick turnaround guaranteed"
    }
  ];

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            darkMode 
              ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
              : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
          }`}>
            <Send className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
          <h2 className={`text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            darkMode 
              ? 'from-white to-gray-300' 
              : 'from-gray-900 to-gray-600'
          }`}>
            Let's Start Something Great
          </h2>
          <p className={`text-xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to transform your ideas into reality? Let's discuss your project!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Let's Connect</h3>
              <p className={`leading-relaxed mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm always excited to work on new projects and help businesses leverage the power of AI and modern technology. 
                Let's discuss how we can bring your vision to life.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className={`p-6 rounded-2xl hover:shadow-lg transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className={`text-lg font-medium mb-1 block ${
                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                          } transition-colors`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className={`text-lg font-medium mb-1 ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>{info.value}</div>
                      )}
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Follow Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/shamimkhaled" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                    darkMode 
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:text-blue-400' 
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
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:text-blue-400' 
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
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:text-red-400' 
                      : 'bg-gray-100 text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:i.amshamim94@gmail.com"
                  className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                    darkMode 
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:text-blue-400' 
                      : 'bg-gray-100 text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-3xl shadow-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
              <h3 className={`text-2xl font-bold mb-8 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Send Me a Message</h3>
              
              {/* Success/Error Messages */}
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                  submitStatus === 'success' 
                    ? darkMode ? 'bg-green-900/30 border border-green-800 text-green-300' : 'bg-green-100 border border-green-200 text-green-800'
                    : darkMode ? 'bg-red-900/30 border border-red-800 text-red-300' : 'bg-red-100 border border-red-200 text-red-800'
                }`}>
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I'll get back to you within 24 hours.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span>Failed to send message. Please try again or contact me directly at i.amshamim94@gmail.com</span>
                    </>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      disabled={isSubmitting}
                      className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 placeholder-gray-500 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      disabled={isSubmitting}
                      className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 placeholder-gray-500 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 placeholder-gray-500 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50`}
                    placeholder="AI/ML Development Project"
                  />
                </div>

                {/* Budget & Timeline Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleFormChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50`}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="<$500">Less than $500</option>
                      <option value="$500-$2500">$500 - $2,500</option>
                      <option value="$2500-$5000">$2,500 - $5,000</option>
                      <option value="$5000-$10000">$5,000 - $10,000</option>
                      <option value="$10000+">$10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleFormChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50`}
                    >
                      <option value="">Select Timeline</option>
                      <option value="urgent">ASAP (Rush)</option>
                      <option value="1-2weeks">1-2 weeks</option>
                      <option value="1month">1 month</option>
                      <option value="2-3months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={6}
                    required
                    disabled={isSubmitting}
                    className={`w-full px-4 py-4 rounded-xl border transition-all duration-200 resize-none ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 placeholder-gray-500 focus:border-blue-500'
                    } focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50`}
                    placeholder="Tell me about your project requirements, goals, and any specific technologies you'd like to use..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className={`text-sm text-center ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  I'll respond to your message within 24 hours. For urgent inquiries, please call directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;