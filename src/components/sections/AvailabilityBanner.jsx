import React from 'react';
import { getDesignProfile } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';

export default function AvailabilityBanner() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);

  if (!designProfile.availability) return null;

  return (
    <div
      style={{
        borderTop: '1px solid var(--gb)',
        borderBottom: '1px solid var(--gb)',
        padding: '15px 24px',
        background: 'linear-gradient(135deg,rgba(0,212,255,0.04),rgba(57,255,20,0.04))',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--fm)',
              fontSize: '13px',
              color: '#39ff14',
              fontWeight: '600',
            }}
          >
            <span className="availability-pulse" />
            {designProfile.availText}
          </span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '13px', color: '#00d4ff', fontWeight: '600' }}>
            {designProfile.rate}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--txt2)' }}>🎁 {designProfile.consultation}</span>
        </div>
        <a href={`mailto:${designProfile.email}`} className="btn bc1" style={{ padding: '9px 20px', fontSize: '13px', textDecoration: 'none' }}>
          Book Free Call →
        </a>
      </div>
    </div>
  );
}
