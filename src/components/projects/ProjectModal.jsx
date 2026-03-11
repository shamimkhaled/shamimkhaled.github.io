import React from 'react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose()} role="button" tabIndex={0}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <img
          src={project.image || project.img}
          alt=""
          style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '20px 20px 0 0' }}
        />
        <div style={{ padding: '28px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '12px',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '800' }}>{project.title}</h2>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--gb)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                color: 'var(--txt)',
                fontSize: '18px',
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p style={{ color: 'var(--txt2)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>{project.longDesc || project.long}</p>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
              Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(project.tags || []).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn bo" style={{ textDecoration: 'none' }}>
                ⌥ GitHub
              </a>
            )}
            {project.live ? (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn bc2" style={{ textDecoration: 'none' }}>
                🚀 Live Demo
              </a>
            ) : (
              <span className="btn bdis">No Demo</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
