import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, DollarSign, MessageCircle } from 'lucide-react';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import { fadeInUp, getTransition } from '../../utils/animations';

const AvailabilitySection = () => {
  const { freelanceSettings } = usePortfolioData();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  if (!freelanceSettings.available) return null;

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="availability" ref={ref} className="relative py-24">
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        transition={getTransition(0.6)}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="glass-card glass-card-hover rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                  {freelanceSettings.availabilityText}
                </h2>
              </div>

              <p className="text-gray-400 text-lg">{freelanceSettings.hirePitch}</p>

              <div className="flex flex-wrap gap-2">
                {freelanceSettings.preferredWorkTypes?.map((type) => (
                  <span
                    key={type}
                    className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  {freelanceSettings.hourlyRate}/hr
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  {freelanceSettings.responseTime}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  {freelanceSettings.timezone}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                {freelanceSettings.consultationOffer}
              </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[200px]">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {freelanceSettings.consultationCtaText}
              </button>
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-xl border border-indigo-500/50 hover:bg-indigo-500/10 text-indigo-400 font-semibold transition-colors"
              >
                {freelanceSettings.hireCtaText}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AvailabilitySection;
