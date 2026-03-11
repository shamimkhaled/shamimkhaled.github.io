import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolioData } from '../contexts/PortfolioContext';
import { getDesignProjects } from '../utils/designData';
import Reveal from '../components/ui/Reveal';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';

const PER_PAGE = 6;

export default function ProjectsPage() {
  const { projects } = usePortfolioData();
  const designProjects = getDesignProjects(projects);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [modalProject, setModalProject] = useState(null);

  const cats = ['All', ...new Set(designProjects.map((p) => p.category))];

  let filtered = designProjects
    .filter((p) => filter === 'All' || p.category === filter)
    .filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

  if (sort === 'featured') filtered = [...filtered].sort((a, b) => b.featured - a.featured);
  else if (sort === 'newest') filtered = [...filtered].sort((a, b) => b.year - a.year);
  else if (sort === 'oldest') filtered = [...filtered].sort((a, b) => a.year - b.year);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Helmet>
        <title>Projects - Shamim Khaled</title>
        <meta name="description" content="Portfolio projects - Python, Django, React, AI/ML" />
      </Helmet>

      <div style={{ background: 'var(--bg2)', padding: '56px 24px 36px', borderBottom: '1px solid var(--gb)' }}>
        <div className="container">
          <div className="lbl">Portfolio</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,62px)', fontWeight: '700', marginBottom: '7px' }}>All Projects</h1>
          <p style={{ color: 'var(--txt2)', fontSize: '14px', fontFamily: 'var(--fm)' }}>
            $ ls projects/ <span style={{ color: '#00d4ff' }}>{'// '}{designProjects.length} results</span>
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px', alignItems: 'center' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='grep -r "project"'
              style={{ flex: 1, minWidth: '170px', maxWidth: '270px', fontFamily: 'var(--fm)', fontSize: '12px' }}
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: 'auto', fontFamily: 'var(--fm)', fontSize: '12px' }}>
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className="btn"
                style={{
                  padding: '7px 13px',
                  fontSize: '11px',
                  fontFamily: 'var(--fm)',
                  background: filter === c ? '#00d4ff' : 'var(--glass)',
                  color: filter === c ? '#000' : 'var(--txt2)',
                  border: filter === c ? 'none' : '1px solid var(--gb)',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px', marginBottom: '40px' }}>
            {paginated.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProjectCard project={p} onDetails={setModalProject} />
              </Reveal>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn bg"
                style={{ padding: '9px 15px', fontFamily: 'var(--fm)', fontSize: '12px' }}
              >
                ← prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i + 1)}
                  className="btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    padding: 0,
                    justifyContent: 'center',
                    fontFamily: 'var(--fm)',
                    fontSize: '12px',
                    fontWeight: '700',
                    background: page === i + 1 ? '#00d4ff' : 'var(--glass)',
                    color: page === i + 1 ? '#000' : 'var(--txt2)',
                    border: page === i + 1 ? 'none' : '1px solid var(--gb)',
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn bg"
                style={{ padding: '9px 15px', fontFamily: 'var(--fm)', fontSize: '12px' }}
              >
                next →
              </button>
            </div>
          )}
        </div>
      </div>

      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
    </div>
  );
}
