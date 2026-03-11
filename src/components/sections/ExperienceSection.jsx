import React from 'react';
import { getDesignExperience } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

export default function ExperienceSection() {
  const { experience } = usePortfolioData();
  const designExp = getDesignExperience(experience);

  return (
    <section className="section" id="experience" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal>
          <div className="lbl">Career</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="sec-title" style={{ marginBottom: '44px' }}>Work Experience</h2>
        </Reveal>
        <div className="timeline-line" style={{ position: 'relative', paddingLeft: '48px' }}>
          {designExp.map((job, i) => {
            const color = job.color || job.clr || 'var(--c1)';
            const wins = job.achievements || job.wins || [];
            const tech = job.tech || [];
            return (
              <Reveal key={job.id} delay={i * 0.09} dir="left">
                <div style={{ position: 'relative', marginBottom: '26px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-40px',
                      top: 4,
                      width: '29px',
                      height: '29px',
                      borderRadius: '7px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '700',
                      fontFamily: 'var(--fm)',
                      border: `1px solid ${color}`,
                      background: 'var(--bg2)',
                      color,
                    }}
                  >
                    {job.logo}
                  </div>
                  <div className="card" style={{ padding: '22px', borderLeft: `2px solid ${color}44`, marginLeft: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '9px', marginBottom: '7px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '2px' }}>{job.role}</h3>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: '12px', color, fontWeight: '600' }}>
                          {job.company || job.co}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--fm)',
                            fontSize: '11px',
                            padding: '3px 11px',
                            borderRadius: '5px',
                            background: `${color}18`,
                            color,
                          }}
                        >
                          {job.from || job.start} – {job.current ? 'Present' : job.to || job.end}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--fm)',
                            fontSize: '10px',
                            color: 'var(--txt3)',
                            padding: '2px 9px',
                            background: 'var(--glass)',
                            borderRadius: '4px',
                          }}
                        >
                          {job.type} · {job.location || job.loc}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: '1.7', marginBottom: '11px' }}>{job.desc}</p>
                    {wins.length > 0 && (
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px', padding: 0 }}>
                        {wins.map((w, wi) => (
                          <li key={wi} style={{ fontSize: '12px', color: 'var(--txt2)', display: 'flex', gap: '7px' }}>
                            <span style={{ color, fontFamily: 'var(--fm)', flexShrink: 0 }}>▸</span>
                            {w}
                          </li>
                        ))}
                      </ul>
                    )}
                    {tech.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {tech.map((t) => (
                          <span key={t} className="tag" style={{ fontSize: '10px' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
