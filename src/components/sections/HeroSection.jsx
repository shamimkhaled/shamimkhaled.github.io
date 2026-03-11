import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Github, Linkedin, Youtube, Mail, MapPin, ChevronDown, FileDown } from 'lucide-react';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import { staggerContainer, staggerItem } from '../../utils/animations';

const JOB_TITLES = [
  'Full Stack Developer',
  'ML Engineer',
  'Python Developer',
  'Django Developer',
  'Software Engineer',
  'API Architect',
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const { profile } = usePortfolioData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const current = JOB_TITLES[titleIndex];
    if (typewriterText.length < current.length) {
      const t = setTimeout(() => setTypewriterText(current.slice(0, typewriterText.length + 1)), 80);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTypewriterText('');
      setTitleIndex((i) => (i + 1) % JOB_TITLES.length);
    }, 2500);
    return () => clearTimeout(t);
  }, [typewriterText, titleIndex]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: profile.social?.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.social?.linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: profile.social?.youtube, label: 'YouTube' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ];

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={staggerItem} className="space-y-6">
              <motion.div
                variants={staggerItem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm text-gray-300">Available for new projects</span>
              </motion.div>

              <motion.h1 variants={staggerItem} className="font-display text-fluid-4xl font-bold leading-tight">
                <span className="block text-gray-300">Hello, I'm</span>
                <span className="block gradient-text">{profile.name}</span>
              </motion.h1>

              <motion.div variants={staggerItem} className="h-14">
                <h2 className="text-fluid-xl font-semibold text-gray-400">
                  {typewriterText}
                  <span className="cursor-blink text-indigo-400">|</span>
                </h2>
              </motion.div>

              <motion.p variants={staggerItem} className="text-fluid-base text-gray-400 max-w-xl leading-relaxed">
                {profile.tagline}
              </motion.p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                Hire Me
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/projects')}
                className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                View Projects
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <FileDown className="w-5 h-5" />
                Download Resume
              </a>
            </motion.div>

            {/* Social */}
            <motion.div variants={staggerItem} className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>

            {/* Location badge */}
            <motion.div variants={staggerItem} className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            variants={staggerItem}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 p-1"
              >
                <div className="w-full h-full rounded-3xl bg-[#090912]" />
              </motion.div>
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full bg-white/5 border border-white/10"
            aria-hidden
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
