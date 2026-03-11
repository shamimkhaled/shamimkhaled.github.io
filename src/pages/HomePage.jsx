import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/hero/HeroSection';
import WhatIDoSection from '../components/sections/WhatIDoSection';
import AvailabilityBanner from '../components/sections/AvailabilityBanner';
import AboutSection from '../components/sections/AboutSection';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import HireMeSection from '../components/sections/HireMeSection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => (
  <>
    <Helmet>
      <title>Shamim Khaled - Full Stack Python/Django Developer | Freelance</title>
      <meta name="description" content="Shamim Khaled - Full Stack Developer, Python Expert, Django Specialist from Dhaka, Bangladesh. Hire for freelance and remote work." />
    </Helmet>
    <main>
      <HeroSection />
      <AvailabilityBanner />
      <WhatIDoSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <HireMeSection />
      <BlogSection />
      <ContactSection />
    </main>
  </>
);

export default HomePage;
