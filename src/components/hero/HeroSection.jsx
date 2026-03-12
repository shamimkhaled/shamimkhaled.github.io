import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import { getDesignProfile, getDesignStats } from '../../utils/designData';
import { useTypewriter } from '../../hooks/useTypewriter';
import HeroCanvas from './HeroCanvas';
import Reveal from '../ui/Reveal';

const CODE_LINES = [
  
  '$ source venv/bin/activate',
  '  >> (venv) activated ✓',
  '$ pip install django',
  '  >> django 5.0 installed ✓',
  '$ python manage.py migrate',
  '  >> migrations applied ✓',
  '$ python manage.py runserver',
  '  >> Running at http://127.0.0.1:8000/ ✓',
  '$ pip install fastapi',
  '  >> fastapi installed ✓',
  '$ uvicorn main:app --reload',
  '  >> Uvicorn running on http://127.0.0.1:8000 ✓',
  '$ docker compose up -d',
  '  >> container started successfully ✓',
  '$ git pull origin main',
  '  >> Already up to date ✓',
  '$ git merge feature-branch',
  '  >> merge complete ✓',
  '$ python train.py --epochs 20',
  '  >> loss: 0.0412  acc: 97.3% ✓',
  '$ kubectl apply -f deploy.yaml',
  '  >> pods: 3/3 running ✓',
  '$ pytest tests/ -v',
  '  >> 148 passed, 0 failed ✓',
  '$ git push origin main',
  '  >> deployed successfully ✓',
];

export default function HeroSection() {
  const navigate = useNavigate();
  const { profile, stats, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);
  const designStats = getDesignStats(stats);
  const typed = useTypewriter(designProfile.heroTitles);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLineIdx((i) => (i + 1) % CODE_LINES.length), 1700);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 24px 60px',
      }}
    >
      <HeroCanvas />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
          opacity: 0.025,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '1px',
            background: '#00d4ff',
            animation: 'scanline 7s linear infinite',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          <div>
            {designProfile.availability && (
              <Reveal>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '6px 15px',
                    borderRadius: '8px',
                    background: 'rgba(57,255,20,0.08)',
                    border: '1px solid rgba(57,255,20,0.22)',
                    marginBottom: '22px',
                    fontFamily: 'var(--fm)',
                    fontSize: '12px',
                    color: '#39ff14',
                  }}
                >
                  <span className="availability-pulse" /> {designProfile.availText} · {designProfile.rate}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1
                style={{
                  fontSize: 'clamp(40px,6vw,78px)',
                  fontWeight: '700',
                  letterSpacing: '-1px',
                  marginBottom: '4px',
                  lineHeight: '1.0',
                }}
              >
                {designProfile.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div
                style={{
                  height: '36px',
                  marginBottom: '18px',
                  fontFamily: 'var(--fm)',
                  fontSize: 'clamp(13px,2vw,19px)',
                  fontWeight: '600',
                  color: '#00d4ff',
                }}
              >
                <span style={{ color: 'var(--txt3)' }}>&gt;&gt; </span>
                {typed}
                <span
                  style={{
                    animation: 'blink 1s step-end infinite',
                    borderRight: '2px solid #00d4ff',
                    marginLeft: '2px',
                  }}
                >
                  &nbsp;
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--txt2)',
                  lineHeight: '1.75',
                  maxWidth: '500px',
                  marginBottom: '30px',
                }}
              >
                {designProfile.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ display: 'flex', gap: '11px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <a href={`mailto:${designProfile.email}`} className="btn bc1" style={{ fontSize: '14px', padding: '12px 24px', textDecoration: 'none' }}>
                  Hire Me ↗
                </a>
                <button
                  onClick={() => navigate('/projects')}
                  className="btn bo"
                  style={{ fontSize: '14px', padding: '12px 24px' }}
                >
                  View Work
                </button>
                <a href={designProfile.resume} className="btn bg" style={{ fontSize: '14px', padding: '12px 24px', textDecoration: 'none' }}>
                  Resume ↓
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
                {designStats.slice(0, 4).map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: '700', color: '#00d4ff', lineHeight: '1' }}>
                      {s.value || s.val}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--txt3)',
                        fontFamily: 'var(--fm)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginTop: '2px',
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.28} dir="right">
            <div
              className="term hide-mobile"
              style={{
                animation: 'float 4s ease-in-out infinite',
                minWidth: 320,
              }}
            >
              <div className="tbar">
                <div className="td" style={{ background: '#ff5f57' }} />
                <div className="td" style={{ background: '#ffbd2e' }} />
                <div className="td" style={{ background: '#28c840' }} />
                <span style={{ marginLeft: '8px', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--txt3)' }}>
                  portfolio · bash
                </span>
              </div>
              <div style={{ padding: '18px', fontFamily: 'var(--fm)', fontSize: '12.5px', minHeight: '190px' }}>
                {CODE_LINES.slice(0, lineIdx + 1).map((l, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: '5px',
                      opacity: i < lineIdx ? 0.5 : 1,
                      color: l.startsWith('$') ? '#39ff14' : l.includes('✓') ? '#39ff14' : 'var(--txt2)',
                    }}
                  >
                    {l}
                  </div>
                ))}
                <span style={{ color: '#00d4ff', animation: 'blink 1s step-end infinite' }}>█</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        className="hero-scroll-hint"
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--txt3)',
          fontFamily: 'var(--fm)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          animation: 'float 2s ease-in-out infinite',
        }}
      >
        scroll ↓
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .term.hide-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          #hero { padding: 90px 16px 50px !important; }
        }
      `}</style>
    </section>
  );
}
