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
import { usePortfolioData } from '../contexts/PortfolioContext';

const SECTION_MAP = {
  hero: HeroSection,
  availability: AvailabilityBanner,
  services: WhatIDoSection,
  about: AboutSection,
  skills: SkillsSection,
  projects: FeaturedProjectsSection,
  experience: ExperienceSection,
  education: EducationSection,
  hire: HireMeSection,
  blog: BlogSection,
  contact: ContactSection,
};

const HomePage = () => {
  const { profile, siteSettings, sectionConfig } = usePortfolioData();
  const order = sectionConfig?.order ?? Object.keys(SECTION_MAP);
  const hidden = new Set(sectionConfig?.hidden ?? []);

  const title = siteSettings?.siteTitle || `${profile?.name || 'Shamim Khaled'} - ML Engineer & Python Developer`;
  const description = siteSettings?.siteDescription || 'Machine Learning Engineer, Python Developer, and DevOps-focused engineer. Building scalable AI systems and production-ready applications.';
  const keywords = siteSettings?.siteKeywords || 'ML Engineer, Python, Django, DevOps, AI, Freelance Developer';

  const sectionsToRender = order.filter((id) => !hidden.has(id));

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <main>
        {sectionsToRender.map((id) => {
          const Section = SECTION_MAP[id];
          if (!Section) return null;
          return <Section key={id} />;
        })}
      </main>
    </>
  );
};

export default HomePage;
