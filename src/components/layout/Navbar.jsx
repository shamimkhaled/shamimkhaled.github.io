import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import { getDesignProfile } from '../../utils/designData';
import { useTheme } from '../../contexts/ThemeContext';

const NAV_LINKS = [
  { label: 'About', hash: 'about' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Work', hash: 'projects-preview' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Contact', hash: 'contact' },
];

export default function Navbar() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navTo = (hash) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(8,8,15,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--fm)',
            fontWeight: '700',
            fontSize: '16px',
            color: 'var(--txt)',
            letterSpacing: '-1px',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: '#00d4ff' }}>{'>'}</span> <span style={{ color: '#00d4ff' }}>shamimkhaled</span>
          <span style={{ color: '#39ff14' }}>@</span>
          <span>portfolio</span>
          <span style={{ color: 'var(--txt3)', animation: 'blink 1.2s step-end infinite' }}>_</span>
        </Link>

        <div className="hide-mobile" style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
          {NAV_LINKS.map((l) => (
            <button key={l.hash} type="button" className="navlnk" onClick={() => navTo(l.hash)}>
              {l.label}
            </button>
          ))}
          <Link to="/projects" className="navlnk" style={{ textDecoration: 'none' }}>
            Projects
          </Link>
          <Link to="/blog" className="navlnk" style={{ textDecoration: 'none' }}>
            Blog
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              background: 'var(--glass)',
              border: '1px solid var(--gb)',
              borderRadius: '8px',
              padding: '7px 10px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
          <Link
            to="/"
            onClick={() => navTo('contact')}
            className="btn bc1 hide-mobile"
            style={{ padding: '8px 16px', fontSize: '12px', textDecoration: 'none' }}
          >
            Hire Me
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="hide-desktop"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--txt)',
              fontSize: '22px',
              cursor: 'pointer',
              padding: '4px',
              display: 'none',
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            background: 'rgba(8,8,15,0.97)',
            padding: '20px 24px',
            borderTop: '1px solid var(--gb)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {NAV_LINKS.map((l) => (
            <button key={l.hash} type="button" className="navlnk" style={{ textAlign: 'left', fontSize: '15px', padding: '8px 0' }} onClick={() => navTo(l.hash)}>
              {l.label}
            </button>
          ))}
          <Link to="/projects" className="navlnk" style={{ textAlign: 'left', fontSize: '15px', padding: '8px 0', textDecoration: 'none' }} onClick={() => setOpen(false)}>
            Projects
          </Link>
          <Link to="/blog" className="navlnk" style={{ textAlign: 'left', fontSize: '15px', padding: '8px 0', textDecoration: 'none' }} onClick={() => setOpen(false)}>
            Blog
          </Link>
          <a href={`mailto:${designProfile.email}`} className="btn bc1" style={{ justifyContent: 'center', textDecoration: 'none', marginTop: '8px' }} onClick={() => setOpen(false)}>
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        .hide-desktop { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </nav>
  );
}
