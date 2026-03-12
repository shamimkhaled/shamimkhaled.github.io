import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import { getDesignProfile } from '../../utils/designData';
import { useTheme } from '../../contexts/ThemeContext';

const NAV_LINKS = [
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
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
      className="navbar-theme"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--gb)' : 'none',
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
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-toggle-icon" aria-hidden>
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
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
        <div className="navbar-mobile-menu" style={{ background: 'var(--nav-bg)' }}>
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
          <button
            type="button"
            onClick={() => { toggleTheme(); }}
            className="theme-toggle-btn theme-toggle-mobile"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ alignSelf: 'flex-start', marginTop: '8px' }}
          >
            <span className="theme-toggle-icon" aria-hidden>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</span>
          </button>
          <a href={`mailto:${designProfile.email}`} className="btn bc1" style={{ justifyContent: 'center', textDecoration: 'none', marginTop: '8px' }} onClick={() => setOpen(false)}>
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        .navbar-mobile-menu {
          padding: 20px 24px;
          border-top: 1px solid var(--gb);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
          padding: 8px 12px;
          background: var(--glass);
          border: 2px solid var(--gb);
          border-radius: 10px;
          cursor: pointer;
          font-size: 18px;
          color: var(--txt);
          transition: all 0.2s ease;
        }
        .theme-toggle-btn:hover, .theme-toggle-btn:focus-visible {
          border-color: var(--p);
          background: rgba(0, 212, 255, 0.08);
          color: var(--p);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.2);
          outline: none;
        }
        .theme-toggle-mobile { min-width: auto; font-size: 14px; gap: 6px; }
        .theme-toggle-icon { line-height: 1; }
        .hide-desktop { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hide-desktop { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </nav>
  );
}
