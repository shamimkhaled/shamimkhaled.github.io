import React from 'react';

const CAT_COLORS = { 'ML/AI': '#00d4ff', Database: '#ff6b35', DevOps: '#a855f7', Backend: '#39ff14', 'Full Stack': '#00d4ff', Python: '#39ff14', Frontend: '#a855f7' };

export default function ProjectCard({ project, onDetails }) {
  const clr = CAT_COLORS[project.category || project.cat] || '#00d4ff';
  const img = project.image || project.img;
  const short = project.shortDesc || project.short || '';
  const tags = project.tags || [];

  return (
    <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '170px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        {img && (
          <img
            src={img}
            alt={project.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
        )}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
          {project.featured && (
            <span
              style={{
                padding: '3px 9px',
                borderRadius: '5px',
                fontSize: '10px',
                fontWeight: '700',
                fontFamily: 'var(--fm)',
                background: 'rgba(0,212,255,0.85)',
                color: '#000',
              }}
            >
              FEATURED
            </span>
          )}
          <span
            style={{
              padding: '3px 9px',
              borderRadius: '5px',
              fontSize: '10px',
              fontWeight: '700',
              fontFamily: 'var(--fm)',
              background: project.status === 'active' || project.status === 'live' ? 'rgba(57,255,20,0.85)' : 'rgba(255,255,255,0.18)',
              color: project.status === 'active' || project.status === 'live' ? '#000' : 'var(--txt2)',
            }}
          >
            {project.status === 'active' || project.status === 'live' ? '● LIVE' : '✓ DONE'}
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
          <span
            style={{
              padding: '3px 9px',
              borderRadius: '5px',
              fontSize: '10px',
              fontWeight: '700',
              fontFamily: 'var(--fm)',
              background: `${clr}22`,
              border: `1px solid ${clr}55`,
              color: clr,
            }}
          >
            {project.category || project.cat}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.75)',
            padding: '3px 8px',
            borderRadius: '5px',
            fontFamily: 'var(--fm)',
            fontSize: '10px',
            color: 'var(--txt3)',
          }}
        >
          {project.year}
        </div>
      </div>
      <div style={{ padding: '17px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.3' }}>{project.title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.65', flex: 1 }}>{short}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {tags.slice(0, 4).map((t) => (
            <span key={t} className="tag" style={{ fontSize: '10px' }}>
              {t}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="tag" style={{ fontSize: '10px' }}>
              +{tags.length - 4}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn bo"
              style={{ justifyContent: 'center', padding: '10px', fontSize: '12px', fontFamily: 'var(--fm)', textDecoration: 'none' }}
            >
              ⌥ View Source on GitHub
            </a>
          ) : (
            <span className="btn bdis" style={{ justifyContent: 'center', padding: '10px', fontSize: '12px' }}>
              Private Repository
            </span>
          )}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="btn bc2"
              style={{ justifyContent: 'center', padding: '10px', fontSize: '12px', fontFamily: 'var(--fm)', textDecoration: 'none' }}
            >
              🚀 Live Demo ↗
            </a>
          ) : (
            <span className="btn bdis" style={{ justifyContent: 'center', padding: '10px', fontSize: '12px' }}>
              No Live Demo
            </span>
          )}
          <button
            type="button"
            onClick={() => onDetails(project)}
            className="btn bg"
            style={{ justifyContent: 'center', padding: '8px', fontSize: '11px', fontFamily: 'var(--fm)' }}
          >
            case_study() →
          </button>
        </div>
      </div>
    </div>
  );
}
