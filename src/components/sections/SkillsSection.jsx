import React, { useState } from 'react';
import { getDesignSkills } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';

const CAT_COLORS = { 'ML/AI': '#00d4ff', Backend: '#39ff14', Database: '#ff6b35', DevOps: '#a855f7', Frontend: '#00d4ff' };
const getColor = (cat) => CAT_COLORS[cat] || '#00d4ff';

export default function SkillsSection() {
  const { skills } = usePortfolioData();
  const designSkills = getDesignSkills(skills);
  const [filter, setFilter] = useState('All');
  const [ref, vis] = useInView(0.2);
  const cats = ['All', ...new Set(designSkills.map((s) => s.category || s.cat))];
  const visibleCats = cats.filter((c) => c !== 'All' && (filter === 'All' || filter === c));

  return (
    <section className="section" id="skills" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <Reveal>
          <div className="lbl">Stack</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="sec-title" style={{ marginBottom: '28px' }}>Skills & Expertise</h2>
        </Reveal>
        <div ref={ref} style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '11px',
                fontFamily: 'var(--fm)',
                background: filter === c ? '#00d4ff' : 'var(--glass)',
                color: filter === c ? '#000' : 'var(--txt2)',
                border: filter === c ? 'none' : '1px solid var(--gb)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '15px' }}>
          {visibleCats.map((cat, ci) => (
            <Reveal key={cat} delay={ci * 0.06}>
              <div className="card" style={{ padding: '18px', borderLeft: `2px solid ${getColor(cat)}` }}>
                <div
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: getColor(cat),
                    marginBottom: '12px',
                  }}
                >
                  {cat}
                </div>
                {designSkills
                  .filter((s) => (s.category || s.cat) === cat)
                  .map((sk, i) => (
                    <div key={sk.id} className="skillrow">
                      <span style={{ fontFamily: 'var(--fm)', fontSize: '12px', width: '108px', flexShrink: 0, color: 'var(--txt2)' }}>
                        {sk.icon} {sk.name}
                      </span>
                      <div style={{ flex: 1, height: '3px', background: 'var(--glass)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            borderRadius: '3px',
                            background: `linear-gradient(90deg,${getColor(cat)},#39ff14)`,
                            width: vis ? `${sk.level || sk.pct || 80}%` : '0%',
                            transition: `width 1.2s ease ${i * 0.07}s`,
                          }}
                        />
                      </div>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--txt3)', width: '30px', textAlign: 'right' }}>
                        {sk.level || sk.pct || 80}%
                      </span>
                    </div>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
