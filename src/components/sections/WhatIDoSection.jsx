import React from 'react';
import { getDesignServices } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

export default function WhatIDoSection() {
  const { services } = usePortfolioData();
  const designServices = getDesignServices(services);

  const defaultItems = {
    'ai/ml': ['LLM & RAG applications', 'Fine-tuning & model deployment', 'LangChain, OpenAI, HuggingFace', 'Vector DBs & embeddings'],
    backend: ['REST APIs & microservices', 'Django, FastAPI, Flask', 'Database design', 'Performance optimization'],
    frontend: ['React & modern UI', 'Responsive design', 'State management', 'Component architecture'],
    devops: ['Docker & Kubernetes', 'CI/CD pipelines', 'Cloud deployment', 'Infrastructure as code'],
    freelance: ['Hourly & fixed projects', 'Remote collaboration', 'Agile workflows', 'Clear communication'],
  };

  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <div className="lbl">Services</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="sec-title" style={{ marginBottom: '8px' }}>What I Build</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p style={{ color: 'var(--txt2)', marginBottom: '44px', maxWidth: '500px', fontSize: '16px', lineHeight: '1.7' }}>
            From AI/ML solutions to backend APIs and full-stack applications — scalable, maintainable, and production-ready.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '15px' }}>
          {designServices.map((s, i) => {
            const key = s.title?.toLowerCase().includes('ai') || s.title?.toLowerCase().includes('ml') ? 'ai/ml' : s.title?.toLowerCase().includes('backend') ? 'backend' : s.title?.toLowerCase().includes('devops') ? 'devops' : s.title?.toLowerCase().includes('front') ? 'frontend' : 'freelance';
            const items = s.items?.length ? s.items : (defaultItems[key] || defaultItems.backend);
            return (
              <Reveal key={s.id} delay={i * 0.07}>
                <div className="card" style={{ padding: '22px', borderTop: `2px solid ${s.color || s.clr}` }}>
                  <div style={{ fontSize: '26px', marginBottom: '11px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>{s.title}</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0, margin: 0 }}>
                    {items.map((it, j) => (
                      <li key={j} style={{ fontSize: '12px', color: 'var(--txt2)', display: 'flex', gap: '7px' }}>
                        <span style={{ color: s.color || s.clr, fontFamily: 'var(--fm)', flexShrink: 0 }}>›</span>
                        {typeof it === 'string' ? it : it}
                      </li>
                    ))}
                    {items.length === 0 && s.desc && (
                      <li style={{ fontSize: '13px', color: 'var(--txt2)', lineHeight: 1.6 }}>{s.desc}</li>
                    )}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
