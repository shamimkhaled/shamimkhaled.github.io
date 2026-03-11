import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Github, ExternalLink, Youtube } from 'lucide-react';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import { staggerContainer, staggerItem } from '../../utils/animations';

const ProjectsPreviewSection = () => {
  const { projects } = usePortfolioData();
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" ref={ref} className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="flex justify-between items-end mb-12">
            <motion.div variants={staggerItem}>
              <h2 className="font-display text-fluid-3xl font-bold gradient-text mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-400 text-fluid-base">
                A selection of my best work
              </p>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
              >
                View All
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featured.map((project) => (
              <motion.article
                key={project.id}
                variants={staggerItem}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-xs font-bold">
                    Featured
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-400 hover:text-indigo-400"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-400 hover:text-indigo-400"
                        aria-label="Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live</span>
                      </a>
                    )}
                    {project.youtubeUrl && (
                      <a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-400 hover:text-red-400"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-4 h-4" />
                        <span className="text-sm">YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsPreviewSection;
