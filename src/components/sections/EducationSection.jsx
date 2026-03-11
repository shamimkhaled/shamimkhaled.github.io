import React from 'react';
import { getDesignEducation } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

const CERT_COLORS = ['#00d4ff', '#39ff14', '#ff6b35', '#a855f7'];

export default function EducationSection() {
  const { education, certifications } = usePortfolioData();
  const designEdu = getDesignEducation(education, certifications);
  const degrees = designEdu.filter((e) => e.type === 'degree');
  const certs = designEdu.filter((e) => e.type === 'cert');

  return (
    <section className="section" id="education">
      <div className="container">
        <Reveal>
          <div className="lbl">Background</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="sec-title" style={{ marginBottom: '36px' }}>Education</h2>
        </Reveal>
        {degrees.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.07}>
            <div className="card" style={{ padding: '22px', marginBottom: '14px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  minWidth: '46px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg,#00d4ff,#39ff14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '15px',
                  fontFamily: 'var(--fm)',
                }}
              >
                {e.logo}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '7px', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700' }}>{e.degree}</h3>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--txt3)' }}>{e.year}</span>
                </div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: '#00d4ff', marginBottom: '5px' }}>{e.institution}</div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(57,255,20,0.09)',
                    border: '1px solid rgba(57,255,20,0.22)',
                    color: '#39ff14',
                    fontFamily: 'var(--fm)',
                    marginBottom: '7px',
                  }}
                >
                  {e.grade}
                </span>
                {e.desc && <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.6' }}>{e.desc}</p>}
              </div>
            </div>
          </Reveal>
        ))}
        {certs.length > 0 && (
          <>
            <Reveal>
              <div
                style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '11px',
                  color: 'var(--txt3)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '14px',
                  marginTop: '28px',
                }}
              >
                # certifications
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '11px' }}>
              {certs.map((c, ci) => (
                <Reveal key={c.id} delay={ci * 0.06}>
                  <div
                    className="card"
                    style={{
                      padding: '14px 16px',
                      display: 'flex',
                      gap: '11px',
                      alignItems: 'center',
                      borderLeft: `2px solid ${CERT_COLORS[ci % CERT_COLORS.length]}`,
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '7px',
                        background: `${CERT_COLORS[ci % CERT_COLORS.length]}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '12px',
                        fontFamily: 'var(--fm)',
                        color: CERT_COLORS[ci % CERT_COLORS.length],
                        flexShrink: 0,
                      }}
                    >
                      {c.logo}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.degree}</div>
                      <div style={{ fontSize: '10px', color: 'var(--txt3)', fontFamily: 'var(--fm)' }}>{c.shortName || c.institution?.slice(0, 2)} · {c.year}</div>
                    </div>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noreferrer" style={{ color: '#00d4ff', fontSize: '13px', marginLeft: 'auto', textDecoration: 'none' }}>
                        ↗
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
