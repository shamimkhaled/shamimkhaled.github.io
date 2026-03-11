import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDesignProfile } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

export default function BlogSection() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${designProfile.devto}&per_page=3`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setPosts(d.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [designProfile.devto]);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="section" id="blog-preview" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <Reveal>
              <div className="lbl">Writing</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="sec-title">Latest Blog Posts</h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/blog" className="btn bc1" style={{ textDecoration: 'none' }}>
              Read All →
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="divider" />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' }}>
          {loading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    height: '220px',
                    background: 'linear-gradient(90deg,var(--glass) 25%,rgba(255,255,255,0.07) 50%,var(--glass) 75%)',
                    backgroundSize: '200% auto',
                    animation: 'shimmer 1.5s infinite',
                  }}
                />
              ))
            : posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.1}>
                  <a href={post.url} target="_blank" rel="noreferrer" className="card" style={{ display: 'block', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt=""
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '14px' }}
                        loading="lazy"
                      />
                    )}
                    <div style={{ fontSize: '12px', color: 'var(--txt3)', marginBottom: '6px' }}>
                      {new Date(post.published_at).toLocaleDateString()} · {post.reading_time_minutes} min read
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.4', marginBottom: '10px' }}>{post.title}</h3>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {(post.tag_list || []).slice(0, 3).map((t) => (
                        <span key={t} className="tag" style={{ fontSize: '11px' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
