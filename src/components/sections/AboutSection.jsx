import React from 'react';
import { getDesignProfile } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

export default function AboutSection() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);

  return (
    <section className="section" id="about" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '60px' }}>
          <Reveal dir="left">
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  aspectRatio: '1',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg,#00d4ff,#39ff14)',
                  padding: '3px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--bg3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '80px',
                  }}
                >
                  {designProfile.avatar ? (
                    <img
                      src={designProfile.avatar}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  ) : (
                    designProfile.name[0]
                  )}
                </div>
              </div>
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: 0,
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
              >
                📍 {designProfile.location}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sec-label">About Me</div>
            <h2 className="sec-title">
              Turning ideas into
              <br />
              <span className="grad-text">working software</span>
            </h2>
            <div className="divider" />
            <p style={{ color: 'var(--txt2)', fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
              {designProfile.longBio || designProfile.bio}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {[
                { icon: '📧', label: 'Email', val: designProfile.email },
                { icon: '🕐', label: 'Timezone', val: designProfile.timezone },
                { icon: '⚡', label: 'Response', val: designProfile.responseTime },
              ].map((f) => (
                <div key={f.label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span>{f.icon}</span>
                  <span style={{ color: 'var(--txt3)', fontSize: '13px', width: '70px' }}>{f.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{f.val}</span>
                </div>
              ))}
              {designProfile.availability && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span className="availability-pulse" />
                  <span style={{ color: 'var(--s)', fontSize: '14px', fontWeight: '600' }}>Available for new projects</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {designProfile.workTypes.map((w) => (
                <span
                  key={w}
                  style={{
                    padding: '5px 14px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.18)',
                    color: '#00d4ff',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
