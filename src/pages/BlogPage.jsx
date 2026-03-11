import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePortfolioData } from '../contexts/PortfolioContext';
import { getDesignProfile } from '../utils/designData';
import Reveal from '../components/ui/Reveal';

export default function BlogPage() {
  const { profile, freelanceSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  const load = () => {
    setLoading(true);
    setError(false);
    fetch(`https://dev.to/api/articles?username=${designProfile.devto}&per_page=20`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setPosts(d);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [designProfile.devto]);

  const allTags = [...new Set(posts.flatMap((p) => p.tag_list || []))].slice(0, 15);
  const filtered = posts
    .filter((p) => !search || (p.title || '').toLowerCase().includes(search.toLowerCase()))
    .filter((p) => !tag || (p.tag_list || []).includes(tag));

  return (
    <div style={{ paddingTop: '80px' }}>
      <Helmet>
        <title>Blog - Shamim Khaled</title>
        <meta name="description" content="Blog posts by Shamim Khaled on dev.to" />
      </Helmet>

      <div style={{ background: 'var(--bg2)', padding: '56px 24px 36px', borderBottom: '1px solid var(--gb)' }}>
        <div className="container">
          <div className="lbl">Writing</div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,62px)', fontWeight: '700', marginBottom: '7px' }}>Blog</h1>
          <p style={{ color: 'var(--txt2)', fontSize: '14px', fontFamily: 'var(--fm)' }}>
            Articles on Python, Django, ML, and engineering.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="grep posts..."
              style={{ maxWidth: '300px', marginBottom: '24px', fontFamily: 'var(--fm)', fontSize: '12px' }}
            />
          </div>
          {allTags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button
                type="button"
                onClick={() => setTag('')}
                className="btn"
                style={{
                  padding: '6px 14px',
                  background: !tag ? 'linear-gradient(135deg,var(--p),var(--p2))' : 'var(--glass)',
                  color: !tag ? '#fff' : 'var(--txt2)',
                  border: !tag ? 'none' : '1px solid var(--gb)',
                  fontSize: '12px',
                }}
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t === tag ? '' : t)}
                  className="btn"
                  style={{
                    padding: '6px 14px',
                    background: tag === t ? 'linear-gradient(135deg,var(--p),var(--p2))' : 'var(--glass)',
                    color: tag === t ? '#fff' : 'var(--txt2)',
                    border: tag === t ? 'none' : '1px solid var(--gb)',
                    fontSize: '12px',
                  }}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', padding: '56px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '11px' }}>📡</div>
              <p style={{ color: 'var(--txt2)', marginBottom: '14px', fontFamily: 'var(--fm)' }}>Connection failed</p>
              <button type="button" onClick={load} className="btn bo">
                retry()
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px' }}>
            {loading
              ? [1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="card"
                    style={{
                      height: '260px',
                      background: 'linear-gradient(90deg,var(--glass) 25%,rgba(255,255,255,0.07) 50%,var(--glass) 75%)',
                      backgroundSize: '200% auto',
                      animation: 'shimmer 1.5s infinite',
                    }}
                  />
                ))
              : filtered.map((post, i) => (
                  <Reveal key={post.id} delay={i * 0.04}>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        color: 'inherit',
                        overflow: 'hidden',
                      }}
                    >
                      {(post.cover_image || post.social_image) && (
                        <img
                          src={post.cover_image || post.social_image}
                          alt=""
                          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                          loading="lazy"
                        />
                      )}
                      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontFamily: 'var(--fm)', fontSize: '10px', color: 'var(--txt3)' }}>
                          {new Date(post.published_at).toLocaleDateString()} · {post.reading_time_minutes}min · ♥ {post.positive_reactions_count}
                        </div>
                        <h3 style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1.4', marginBottom: '10px', flex: 1 }}>{post.title}</h3>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          {(post.tag_list || []).slice(0, 3).map((t) => (
                            <span key={t} className="tag" style={{ fontSize: '10px' }}>
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </Reveal>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
