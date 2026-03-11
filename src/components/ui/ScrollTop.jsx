import React, { useState, useEffect } from 'react';

export default function ScrollTop() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const h = () => setVis(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (!vis) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 900,
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: '#00d4ff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '700',
        fontFamily: 'var(--fm)',
        boxShadow: '0 4px 18px rgba(0,212,255,0.4)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
