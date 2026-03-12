import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDesignProfile } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';

export default function Footer() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);
  const navigate = useNavigate();

  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ borderTop: '1px solid var(--gb)', padding: '38px 24px 22px', background: 'var(--bg2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '36px', marginBottom: '28px' }}>
          <div>
            <div style={{ fontFamily: 'var(--fm)', fontWeight: '700', fontSize: '14px', marginBottom: '9px' }}>
              <span style={{ color: '#00d4ff' }}>&gt;</span> <span style={{ color: '#00d4ff' }}>shamim</span>
              <span style={{ color: '#39ff14' }}>@</span>
              <span>portfolio</span>
            </div>
            <p style={{ color: 'var(--txt2)', fontSize: '13px', lineHeight: '1.7', maxWidth: '250px', marginBottom: '14px' }}>
              {designProfile.tagline}
            </p>
            {designProfile.availability && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--fm)', fontSize: '11px', color: '#39ff14' }}>
                <span className="availability-pulse" />
                {designProfile.rate} · Available
              </div>
            )}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--txt3)', marginBottom: '12px' }}>
              # navigate
            </div>
            {['about', 'services', 'skills', 'experience', 'education', 'contact'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  color: 'var(--txt2)',
                  fontFamily: 'var(--fm)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginBottom: '7px',
                  textAlign: 'left',
                  transition: 'color 0.2s',
                  padding: '2px 0',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--txt2)')}
              >
                ./{id}
              </button>
            ))}
            <Link
              to="/projects"
              onClick={() => navigate('/projects')}
              style={{
                display: 'block',
                background: 'none',
                border: 'none',
                color: 'var(--txt2)',
                fontFamily: 'var(--fm)',
                fontSize: '12px',
                cursor: 'pointer',
                marginBottom: '7px',
                textAlign: 'left',
                transition: 'color 0.2s',
                padding: '2px 0',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--txt2)')}
            >
              ./projects
            </Link>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--txt3)', marginBottom: '12px' }}>
              # links
            </div>
            {[
              ['GitHub', designProfile.github],
              ['LinkedIn', designProfile.linkedin],
              ['dev.to', `https://dev.to/${designProfile.devto}`],
              ['Email', `mailto:${designProfile.email}`],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  display: 'block',
                  color: 'var(--txt2)',
                  fontFamily: 'var(--fm)',
                  fontSize: '12px',
                  textDecoration: 'none',
                  marginBottom: '7px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--txt2)')}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--gb)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '9px' }}>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--txt3)' }}>
            © {new Date().getFullYear()} {designProfile.name}
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['Python', 'Django', 'React'].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'var(--glass)',
                  border: '1px solid var(--gb)',
                  color: 'var(--txt3)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
