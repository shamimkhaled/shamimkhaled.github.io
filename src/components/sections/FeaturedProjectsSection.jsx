import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDesignProjects } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';
import ProjectCard from '../projects/ProjectCard';
import ProjectModal from '../projects/ProjectModal';

export default function FeaturedProjectsSection() {
  const { projects } = usePortfolioData();
  const designProjects = getDesignProjects(projects);
  const featured = designProjects.filter((p) => p.featured).slice(0, 3);
  const [modalProject, setModalProject] = useState(null);

  return (
    <section className="section" id="projects-preview">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
          <div>
            <Reveal>
              <div className="lbl">Portfolio</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="sec-title">Featured Work</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link to="/projects" className="btn bo" style={{ fontFamily: 'var(--fm)', fontSize: '12px', textDecoration: 'none' }}>
              ls -la projects/ →
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div
            style={{
              width: '44px',
              height: '2px',
              background: 'linear-gradient(90deg,#00d4ff,#39ff14)',
              marginBottom: '36px',
              borderRadius: '2px',
            }}
          />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))', gap: '18px' }}>
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} onDetails={setModalProject} />
            </Reveal>
          ))}
        </div>
      </div>
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </section>
  );
}
