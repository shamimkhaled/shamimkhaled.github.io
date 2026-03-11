import React from 'react';
import { getDesignProfile } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

export default function HireMeSection() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);

  return (
    <section className="section" id="hire" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div
          className="card"
          style={{
            padding: '52px 36px',
            textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(0,212,255,0.04),rgba(57,255,20,0.04))',
            borderColor: 'rgba(0,212,255,0.18)',
          }}
        >
          <Reveal>
            <div style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: '#00d4ff', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '3px' }}>
              {'// open_to_work()'}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="sec-title" style={{ marginBottom: '10px' }}>{designProfile.hirePitch}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ color: 'var(--txt2)', fontSize: '15px', maxWidth: '480px', margin: '0 auto 26px', lineHeight: '1.7' }}>
              {designProfile.rate} · {designProfile.consultation} · responds {designProfile.response}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ display: 'flex', gap: '11px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
              <a href={`mailto:${designProfile.email}`} className="btn bc1" style={{ fontSize: '14px', padding: '12px 26px', textDecoration: 'none' }}>
                📧 Schedule a Call
              </a>
              <a href={`mailto:${designProfile.email}`} className="btn bo" style={{ fontSize: '14px', padding: '12px 26px', textDecoration: 'none' }}>
                💼 Project Inquiry
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ display: 'flex', gap: '9px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {designProfile.workTypes.map((w) => (
                <span
                  key={w}
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '11px',
                    padding: '5px 13px',
                    borderRadius: '6px',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.18)',
                    color: '#00d4ff',
                  }}
                >
                  ✓ {w}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
