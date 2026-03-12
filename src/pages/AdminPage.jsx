import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSave, HiPlus, HiTrash, HiUser, HiCode, HiFolder, HiBriefcase, HiAcademicCap, HiCurrencyDollar, HiMail, HiChartBar, HiCog, HiGlobe, HiViewGrid, HiDatabase, HiCheckCircle } from 'react-icons/hi';
import { usePortfolioData } from '../contexts/PortfolioContext';
import { Toaster, toast } from 'react-hot-toast';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { saveToSupabase, fetchRawFromSupabase } from '../services/portfolioDb';
import { getInitialData } from '../data/portfolioData';

// Trim env values - .env can have trailing newline/whitespace (used when Supabase not configured)
const ADMIN_USERNAME = (process.env.REACT_APP_ADMIN_USERNAME || 'admin').trim().toLowerCase();
const ADMIN_PASSWORD = (process.env.REACT_APP_ADMIN_PASSWORD || 'admin123').trim();
const SUPABASE_ADMIN_EMAIL = (process.env.REACT_APP_SUPABASE_ADMIN_EMAIL || '').trim();

const AdminPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(isSupabaseConfigured);
  const [email, setEmail] = useState(SUPABASE_ADMIN_EMAIL);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      const stored = sessionStorage.getItem('portfolio_admin_auth') === 'true';
      setAuthenticated(stored);
      setAuthChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setAuthChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });
    return () => subscription?.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSupabaseConfigured) {
      const trimmedEmail = (email || '').trim();
      const trimmedPassword = (password || '').trim();
      if (!trimmedEmail || !trimmedPassword) {
        toast.error('Email and password required.');
        return;
      }
      try {
        const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password: trimmedPassword });
        if (error) {
          toast.error(error.message || 'Invalid credentials.');
          return;
        }
        setAuthenticated(true);
      } catch (err) {
        toast.error('Login failed.');
      }
      return;
    }
    const trimmedUsername = (username || '').trim().toLowerCase();
    const trimmedPassword = (password || '').trim();
    if (trimmedUsername === ADMIN_USERNAME && trimmedPassword === ADMIN_PASSWORD) {
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      setAuthenticated(true);
    } else {
      toast.error('Invalid username or password.');
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      sessionStorage.removeItem('portfolio_admin_auth');
    }
    setAuthenticated(false);
  };

  if (authChecking) {
    return (
      <div className="admin-login-wrap">
        <Toaster position="top-center" />
        <div className="admin-login-card card">Checking authentication…</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="admin-login-wrap">
        <Toaster position="top-center" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-login-card card"
        >
          <div className="admin-login-header">
            <span className="admin-login-icon" aria-hidden>🔐</span>
            <h1 className="admin-login-title">Admin Login</h1>
            <p className="admin-login-hint">
              {isSupabaseConfigured
                ? 'Sign in with your Supabase admin account.'
                : 'Enter your credentials to manage the portfolio.'}
            </p>
          </div>
          <form onSubmit={handleLogin} className="admin-login-form">
            {isSupabaseConfigured ? (
              <>
                <label htmlFor="admin-email" className="admin-login-label">Email</label>
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-login-input"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  autoFocus
                />
              </>
            ) : (
              <>
                <label htmlFor="admin-username" className="admin-login-label">Username</label>
                <input
                  type="text"
                  id="admin-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="admin-login-input"
                  placeholder="Enter username"
                  autoComplete="username"
                  autoFocus
                />
              </>
            )}
            <label htmlFor="admin-password" className="admin-login-label">Password</label>
            <div className="admin-login-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-login-input"
                placeholder="Enter password"
                autoComplete="current-password"
                aria-describedby="admin-password-hint"
              />
              <button
                type="button"
                className="admin-login-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide' : 'Show'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {!isSupabaseConfigured && (
              <p id="admin-password-hint" className="admin-login-hint-inline">
                Default: <code>admin</code> / <code>admin123</code> (set REACT_APP_ADMIN_USERNAME &amp; REACT_APP_ADMIN_PASSWORD in .env)
              </p>
            )}
            <button type="submit" className="btn btn-primary admin-login-submit">
              Login
            </button>
          </form>
        </motion.div>
        <style>{`
          .admin-login-wrap {
            min-height: 100vh;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
            background: var(--bg);
          }
          .admin-login-card {
            width: 100%;
            max-width: 400px;
            padding: 32px 24px;
            border-radius: 20px;
          }
          .admin-login-header { text-align: center; margin-bottom: 28px; }
          .admin-login-icon { font-size: 48px; display: block; margin-bottom: 12px; }
          .admin-login-title { font-size: 22px; font-weight: 800; margin: 0 0 8px; color: var(--txt); }
          .admin-login-hint { font-size: 14px; color: var(--txt2); margin: 0; line-height: 1.5; }
          .admin-login-form { display: flex; flex-direction: column; gap: 16px; }
          .admin-login-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--txt2); }
          .admin-login-input-wrap { display: flex; gap: 8px; align-items: stretch; }
          .admin-login-input {
            flex: 1;
            min-width: 0;
            padding: 14px 16px;
            border-radius: 12px;
            border: 1px solid var(--gb);
            background: var(--glass);
            color: var(--txt);
            font-size: 16px;
            outline: none;
            transition: border-color 0.2s;
          }
          .admin-login-input:focus { border-color: var(--p); box-shadow: 0 0 0 3px rgba(0,212,255,0.12); }
          .admin-login-input::placeholder { color: var(--txt3); }
          .admin-login-toggle {
            flex-shrink: 0;
            width: 48px;
            padding: 0;
            border-radius: 12px;
            border: 1px solid var(--gb);
            background: var(--glass);
            color: var(--txt2);
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .admin-login-toggle:hover { border-color: var(--p); color: var(--txt); }
          .admin-login-hint-inline { font-size: 12px; color: var(--txt3); margin: -4px 0 0; }
          .admin-login-hint-inline code { background: rgba(0,212,255,0.15); padding: 2px 6px; border-radius: 4px; font-size: 11px; }
          .admin-login-submit { width: 100%; padding: 14px; font-size: 15px; justify-content: center; margin-top: 8px; }
          @media (max-width: 480px) {
            .admin-login-card { padding: 24px 20px; }
            .admin-login-title { font-size: 20px; }
          }
        `}</style>
      </div>
    );
  }

  const handleVerifyDb = async () => {
    setVerifying(true);
    try {
      const result = await fetchRawFromSupabase();
      console.log('[Verify DB]', result);
      if (result.source === 'none') {
        toast.error('Supabase not configured — set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY');
        return;
      }
      if (!result.ok) {
        toast.error(`DB error: ${result.error || 'Unknown'}`);
        return;
      }
      const msg = result.hasData
        ? `Database has data. Keys: ${result.keys.join(', ')}. Updated: ${result.updatedAt || '—'}`
        : 'Database row exists but data is empty. Use Seed Database to populate.';
      toast.success(msg, { duration: 6000 });
    } finally {
      setVerifying(false);
    }
  };

  const handleSeedDb = async () => {
    if (!isSupabaseConfigured) return;
    const confirmed = window.confirm(
      '⚠️ Seed Database will REPLACE all your current portfolio data with default values.\n\n' +
      'Any custom edits (profile, projects, experience, etc.) will be lost.\n\n' +
      'Only use this if the table is empty or you want to reset to defaults.\n\n' +
      'Continue?'
    );
    if (!confirmed) return;
    setSeeding(true);
    console.log('[Seed DB] Starting…');
    try {
      const initialData = getInitialData();
      console.log('[Seed DB] Pushing data to Supabase…', { profileName: initialData.profile?.name, projectsCount: initialData.projects?.length });
      await saveToSupabase(initialData);
      console.log('[Seed DB] ✅ Success! Database seeded with default portfolio data.');
      toast.success('Database seeded with default portfolio data!');
      window.location.reload();
    } catch (e) {
      console.error('[Seed DB] ❌ Failed:', e);
      toast.error('Seed failed. Check console.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="admin-dash-wrap">
      <Toaster position="top-center" />
      <div className="admin-dash-inner">
        <div className="admin-dash-header">
          <h1 className="admin-dash-title grad-text">Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {isSupabaseConfigured && (
              <>
                <button
                  type="button"
                  onClick={handleVerifyDb}
                  disabled={verifying}
                  className="admin-btn-ghost"
                  title="Check if data exists in Supabase"
                >
                  <HiCheckCircle style={{ width: 18, height: 18, marginRight: 6 }} />
                  {verifying ? 'Checking…' : 'Verify Database'}
                </button>
                <button
                  type="button"
                  onClick={handleSeedDb}
                  disabled={seeding}
                  className="admin-btn-ghost"
                  title="Replace ALL data with defaults — use only when table is empty"
                >
                  <HiDatabase style={{ width: 18, height: 18, marginRight: 6 }} />
                  {seeding ? 'Seeding…' : 'Seed Database'}
                </button>
              </>
            )}
            <button type="button" onClick={handleLogout} className="admin-btn-ghost">
              Logout
            </button>
          </div>
        </div>
        <AdminTabs saving={saving} setSaving={setSaving} />
      </div>
    </div>
  );
};

const TABS = [
  { id: 'profile', label: 'Profile', icon: HiUser },
  { id: 'site', label: 'Site Settings', icon: HiGlobe },
  { id: 'sections', label: 'Sections', icon: HiViewGrid },
  { id: 'services', label: 'Services', icon: HiCog },
  { id: 'stats', label: 'Stats', icon: HiChartBar },
  { id: 'skills', label: 'Skills', icon: HiCode },
  { id: 'projects', label: 'Projects', icon: HiFolder },
  { id: 'experience', label: 'Experience', icon: HiBriefcase },
  { id: 'education', label: 'Education', icon: HiAcademicCap },
  { id: 'freelance', label: 'Freelance Settings', icon: HiCurrencyDollar },
  { id: 'contact', label: 'Contact Settings', icon: HiMail },
];

const AdminTabs = ({ saving, setSaving }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const data = usePortfolioData();

  const handleSave = async (updater) => {
    setSaving(true);
    try {
      updater();
      await data.persistNow?.();
      toast.success('Saved successfully!');
    } catch (e) {
      toast.error('Failed to save');
      console.error('Save error:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-dash-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon style={{ width: 16, height: 16, flexShrink: 0 }} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <ProfileEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'site' && (
        <SiteSettingsEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'sections' && (
        <SectionConfigEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'services' && (
        <ServicesEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'stats' && (
        <StatsEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'skills' && (
        <SkillsEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'projects' && (
        <ProjectsEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'experience' && (
        <ExperienceEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'education' && (
        <EducationEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'freelance' && (
        <FreelanceEditor data={data} onSave={handleSave} saving={saving} />
      )}
      {activeTab === 'contact' && (
        <ContactSettingsEditor data={data} onSave={handleSave} saving={saving} />
      )}
    </div>
  );
};

const ProfileEditor = ({ data, onSave, saving }) => {
  const [form, setForm] = useState(data.profile || {});

  const handleImageUpload = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, [key]: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Profile</h2>
      <div className="admin-field">
        <label>Avatar</label>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {form.avatar && <img src={form.avatar} alt="Avatar" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />}
          <div style={{ flex: 1, minWidth: 200 }}>
            <input type="url" placeholder="Image URL" value={form.avatar?.startsWith('data:') ? '' : form.avatar || ''} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} className="admin-input" style={{ marginBottom: 8 }} />
            <label style={{ display: 'block' }}>
              <span className="admin-btn-primary" style={{ display: 'inline-block', padding: '8px 16px', cursor: 'pointer', fontSize: 13 }}>Upload file</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'avatar')} />
            </label>
          </div>
        </div>
      </div>
      <div className="admin-field"><label>Long Bio (About section)</label><textarea rows={4} value={form.longBio || form.bio || ''} onChange={(e) => setForm((f) => ({ ...f, longBio: e.target.value }))} className="admin-input" placeholder="Detailed bio for About section" style={{ resize: 'vertical' }} /></div>
      <div className="admin-field"><label>Hero Typewriter Titles (one per line)</label><textarea rows={4} value={(form.heroTitles || []).join('\n')} onChange={(e) => setForm((f) => ({ ...f, heroTitles: e.target.value.split('\n').filter(Boolean) }))} className="admin-input" placeholder="Full Stack Developer&#10;Python Expert&#10;Django Specialist" style={{ resize: 'vertical' }} /></div>
      {['name', 'title', 'tagline', 'email', 'phone', 'location', 'bio', 'resumeUrl'].map((key) => (
        <div key={key} className="admin-field">
          <label>{key}</label>
          <input type={key === 'email' ? 'email' : 'text'} value={form[key] || ''} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="admin-input" />
        </div>
      ))}
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateProfile(form))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const SiteSettingsEditor = ({ data, onSave, saving }) => {
  const ss = data.siteSettings || {};
  const [form, setForm] = useState({
    siteTitle: ss.siteTitle || '',
    siteDescription: ss.siteDescription || '',
    siteKeywords: ss.siteKeywords || '',
  });
  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">SEO & Site Settings</h2>
      <p style={{ color: 'var(--txt2)', fontSize: '14px', marginBottom: '20px' }}>
        These appear in page title, meta tags, and search results.
      </p>
      <div className="admin-field"><label>Site Title</label><input value={form.siteTitle} onChange={(e) => setForm((f) => ({ ...f, siteTitle: e.target.value }))} className="admin-input" placeholder="Shamim Khaled - ML Engineer & Python Developer" /></div>
      <div className="admin-field"><label>Meta Description</label><textarea rows={3} value={form.siteDescription} onChange={(e) => setForm((f) => ({ ...f, siteDescription: e.target.value }))} className="admin-input" placeholder="Brief description for search engines" style={{ resize: 'vertical' }} /></div>
      <div className="admin-field"><label>Meta Keywords (comma-separated)</label><input value={form.siteKeywords} onChange={(e) => setForm((f) => ({ ...f, siteKeywords: e.target.value }))} className="admin-input" placeholder="ML Engineer, Python, Django, DevOps" /></div>
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateSiteSettings(form))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const SECTION_IDS = ['hero', 'availability', 'services', 'about', 'skills', 'projects', 'experience', 'education', 'hire', 'blog', 'contact'];
const SectionConfigEditor = ({ data, onSave, saving }) => {
  const sc = data.sectionConfig || {};
  const [order, setOrder] = useState(sc.order ?? SECTION_IDS);
  const [hidden, setHidden] = useState(sc.hidden ?? []);
  const toggleHidden = (id) => {
    setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]));
  };
  const moveUp = (i) => {
    if (i <= 0) return;
    const next = [...order];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setOrder(next);
  };
  const moveDown = (i) => {
    if (i >= order.length - 1) return;
    const next = [...order];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setOrder(next);
  };
  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Section Order & Visibility</h2>
      <p style={{ color: 'var(--txt2)', fontSize: '14px', marginBottom: '20px' }}>
        Control which sections appear and their order on the homepage.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {order.map((id, i) => (
          <div key={id} className="admin-block" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => moveUp(i)} disabled={i === 0} className="admin-btn-ghost" style={{ padding: '6px 10px' }}>↑</button>
            <button type="button" onClick={() => moveDown(i)} disabled={i === order.length - 1} className="admin-btn-ghost" style={{ padding: '6px 10px' }}>↓</button>
            <span style={{ fontFamily: 'var(--fm)', fontWeight: '600', minWidth: '120px' }}>{id}</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, textTransform: 'none' }}>
              <input type="checkbox" checked={hidden.includes(id)} onChange={() => toggleHidden(id)} />
              Hide section
            </label>
          </div>
        ))}
      </div>
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateSectionConfig({ order, hidden }))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const ServicesEditor = ({ data, onSave, saving }) => {
  const [services, setServices] = useState(data.services || []);
  const update = (i, updates) => setServices((s) => s.map((x, j) => (j === i ? { ...x, ...updates } : x)));
  const add = () => setServices((s) => [...s, { id: Date.now().toString(), title: '', description: '', icon: 'backend' }]);
  const remove = (i) => setServices((s) => s.filter((_, j) => j !== i));
  return (
    <div className="admin-panel">
      <div className="admin-dash-header" style={{ marginBottom: 20 }}>
        <h2 className="admin-panel-title">Services (What I Do)</h2>
        <button type="button" onClick={add} className="admin-btn-primary"><HiPlus style={{ width: 16, height: 16, marginRight: 8 }} /> Add</button>
      </div>
      {services.map((svc, i) => (
        <div key={svc.id} className="admin-block">
          <div className="admin-row">
            <div className="admin-field"><label>Title</label><input value={svc.title || ''} onChange={(e) => update(i, { title: e.target.value })} className="admin-input" /></div>
            <div className="admin-field"><label>Icon</label><select value={svc.icon || 'backend'} onChange={(e) => update(i, { icon: e.target.value })} className="admin-input"><option value="ml-ai">🧠 AI/ML</option><option value="backend">⚙️ Backend</option><option value="frontend">🎨 Frontend</option><option value="devops">☁️ DevOps</option><option value="freelance">🚀 Freelance</option></select></div>
          </div>
          <div className="admin-field"><label>Description</label><textarea rows={2} value={svc.description || ''} onChange={(e) => update(i, { description: e.target.value })} className="admin-input" style={{ resize: 'vertical' }} /></div>
          <button type="button" onClick={() => remove(i)} className="admin-btn-danger"><HiTrash style={{ width: 14, height: 14, marginRight: 6, verticalAlign: 'middle' }} /> Remove</button>
        </div>
      ))}
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateServices(services))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const StatsEditor = ({ data, onSave, saving }) => {
  const [stats, setStats] = useState(data.stats || []);
  const update = (i, updates) => setStats((s) => s.map((x, j) => (j === i ? { ...x, ...updates } : x)));
  const add = () => setStats((s) => [...s, { label: 'New', value: '0+', key: `stat_${Date.now()}` }]);
  const remove = (i) => setStats((s) => s.filter((_, j) => j !== i));
  return (
    <div className="admin-panel">
      <div className="admin-dash-header" style={{ marginBottom: 20 }}>
        <h2 className="admin-panel-title">Stats (Hero section)</h2>
        <button type="button" onClick={add} className="admin-btn-primary"><HiPlus style={{ width: 16, height: 16, marginRight: 8 }} /> Add</button>
      </div>
      {stats.map((stat, i) => (
        <div key={stat.key || i} className="admin-block" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <input value={stat.value || ''} onChange={(e) => update(i, { value: e.target.value })} placeholder="2+" className="admin-input" style={{ width: 80, flexShrink: 0 }} />
          <input value={stat.label || ''} onChange={(e) => update(i, { label: e.target.value })} placeholder="Years Experience" className="admin-input" style={{ flex: 1, minWidth: 150 }} />
          <button type="button" onClick={() => remove(i)} className="admin-btn-danger"><HiTrash style={{ width: 16, height: 16 }} /></button>
        </div>
      ))}
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateStats(stats))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const FreelanceEditor = ({ data, onSave, saving }) => {
  const fs = data.freelanceSettings || {};
  const [form, setForm] = useState({
    available: fs.available ?? true,
    availabilityText: fs.availabilityText || 'Open to Work',
    hourlyRate: fs.hourlyRate || '$25/hr',
    preferredWorkTypes: fs.preferredWorkTypes || ['Remote', 'Hybrid', 'Full-time', 'Part-time', 'Contract', 'Freelance'],
    consultationOffer: fs.consultationOffer || 'First 30 min consultation is free',
    consultationCtaText: fs.consultationCtaText || 'Book Free Consultation',
    responseTime: fs.responseTime || 'Usually responds within 24 hours',
    timezone: fs.timezone || 'Bangladesh Standard Time, UTC+6',
    hirePitch: fs.hirePitch || "Have a project in mind? Let's talk.",
    hireCtaText: fs.hireCtaText || 'Hire Me for Your Project',
  });

  const workTypes = ['Remote', 'Hybrid', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

  const toggleWorkType = (type) => {
    setForm((f) => ({
      ...f,
      preferredWorkTypes: f.preferredWorkTypes.includes(type)
        ? f.preferredWorkTypes.filter((t) => t !== type)
        : [...f.preferredWorkTypes, type],
    }));
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title">Freelance Settings</h2>
      <div className="admin-field">
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textTransform: 'none' }}>
          <input type="checkbox" checked={form.available} onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))} style={{ width: 18, height: 18 }} />
          Available for work
        </label>
      </div>
      {['availabilityText', 'hourlyRate', 'consultationOffer', 'consultationCtaText', 'responseTime', 'timezone', 'hireCtaText'].map((key) => (
        <div key={key} className="admin-field">
          <label>{key}</label>
          <input type="text" value={form[key] || ''} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="admin-input" />
        </div>
      ))}
      <div className="admin-field">
        <label>hirePitch</label>
        <textarea value={form.hirePitch || ''} onChange={(e) => setForm((f) => ({ ...f, hirePitch: e.target.value }))} rows={3} className="admin-input" style={{ resize: 'vertical' }} />
      </div>
      <div className="admin-field">
        <label>Preferred work types</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {workTypes.map((type) => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10, background: 'var(--glass)', border: '1px solid var(--gb)', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.preferredWorkTypes.includes(type)} onChange={() => toggleWorkType(type)} />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateFreelanceSettings(form))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const ContactSettingsEditor = ({ data, onSave, saving }) => {
  const cs = data.contactSettings || {};
  const [form, setForm] = useState({
    formEnabled: cs.formEnabled ?? true,
    email: cs.email || '',
    autoReplyMessage: cs.autoReplyMessage || '',
    notificationsEnabled: cs.notificationsEnabled ?? true,
    heading: cs.heading || 'Get In Touch',
    subheading: cs.subheading || 'Ready to start your project?',
    availabilityMessage: cs.availabilityMessage || 'Open to freelance projects — Free 30-min consultation.',
  });

  return (
    <div className="admin-panel">
      <h2 className="admin-panel-title" style={{ margin: '0 0 20px' }}>Contact Settings</h2>
      <label className="admin-checkbox-row">
        <input type="checkbox" checked={form.formEnabled} onChange={(e) => setForm((f) => ({ ...f, formEnabled: e.target.checked }))} />
        Contact form enabled
      </label>
      <label className="admin-checkbox-row">
        <input type="checkbox" checked={form.notificationsEnabled} onChange={(e) => setForm((f) => ({ ...f, notificationsEnabled: e.target.checked }))} />
        Email notifications enabled
      </label>
      {['email', 'heading', 'subheading', 'availabilityMessage'].map((key) => (
        <div key={key} className="admin-field-group">
          <label>{key}</label>
          <input
            type={key === 'email' ? 'email' : 'text'}
            value={form[key] || ''}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="admin-input"
          />
        </div>
      ))}
      <div className="admin-field-group">
        <label>autoReplyMessage</label>
        <textarea value={form.autoReplyMessage || ''} onChange={(e) => setForm((f) => ({ ...f, autoReplyMessage: e.target.value }))} rows={3} className="admin-input" />
      </div>
      <div className="admin-actions"><button type="button" onClick={() => onSave(() => data.updateContactSettings(form))} disabled={saving} className="admin-btn-primary"><HiSave style={{ width: 16, height: 16, marginRight: 8 }} /> {saving ? 'Saving...' : 'Save'}</button></div>
    </div>
  );
};

const SkillsEditor = ({ data, onSave, saving }) => {
  const [skills, setSkills] = useState(data.skills || []);

  const addCategory = () => {
    setSkills((s) => [...s, { category: 'New Category', skills: [] }]);
  };

  const updateCategory = (i, updates) => {
    setSkills((s) => s.map((c, j) => (j === i ? { ...c, ...updates } : c)));
  };

  const addSkill = (catIndex) => {
    setSkills((s) =>
      s.map((c, j) =>
        j === catIndex ? { ...c, skills: [...(c.skills || []), { name: 'New Skill', level: 80, icon: '⚡' }] } : c
      )
    );
  };

  const updateSkill = (catIndex, skillIndex, updates) => {
    setSkills((s) =>
      s.map((c, j) =>
        j === catIndex
          ? {
              ...c,
              skills: c.skills.map((sk, k) => (k === skillIndex ? { ...sk, ...updates } : sk)),
            }
          : c
      )
    );
  };

  const removeSkill = (catIndex, skillIndex) => {
    setSkills((s) =>
      s.map((c, j) =>
        j === catIndex ? { ...c, skills: c.skills.filter((_, k) => k !== skillIndex) } : c
      )
    );
  };

  return (
    <div className="admin-panel">
      <div className="admin-header-row">
        <h2 className="admin-panel-title" style={{ margin: 0 }}>Skills</h2>
        <button onClick={addCategory} className="admin-add-btn">
          <HiPlus style={{ width: 16, height: 16 }} />
          Add Category
        </button>
      </div>
      {skills.map((cat, i) => (
        <div key={i} className="admin-item-card">
          <input
            value={cat.category}
            onChange={(e) => updateCategory(i, { category: e.target.value })}
            className="admin-input"
          />
          {cat.skills?.map((skill, j) => (
            <div key={j} className="admin-flex-row">
              <input
                value={skill.icon || ''}
                onChange={(e) => updateSkill(i, j, { icon: e.target.value })}
                className="admin-input admin-input-inline"
                placeholder="⚡"
                title="Emoji or icon"
              />
              <input
                value={skill.name}
                onChange={(e) => updateSkill(i, j, { name: e.target.value })}
                className="admin-input"
                style={{ flex: 1, minWidth: 120 }}
                placeholder="Skill name"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={skill.level ?? 80}
                onChange={(e) => updateSkill(i, j, { level: parseInt(e.target.value, 10) || 80 })}
                className="admin-input"
                placeholder="%"
                title="Proficiency %"
              />
              <button
                onClick={() => removeSkill(i, j)}
                className="admin-btn-danger"
                title="Remove skill"
              >
                <HiTrash style={{ width: 16, height: 16 }} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addSkill(i)}
            style={{ color: 'var(--p)', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            <HiPlus style={{ width: 16, height: 16 }} />
            Add skill
          </button>
        </div>
      ))}
      <div className="admin-actions">
        <button type="button" onClick={() => onSave(() => data.updateSkills(skills))} disabled={saving} className="admin-btn-primary">
          <HiSave style={{ width: 16, height: 16, marginRight: 8 }} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

const ProjectsEditor = ({ data, onSave, saving }) => {
  const [projects, setProjects] = useState(data.projects || []);

  const addProject = () => {
    setProjects((p) => [
      ...p,
      {
        id: Date.now().toString(),
        title: 'New Project',
        description: '',
        image: '',
        technologies: [],
        category: 'Backend',
        year: new Date().getFullYear().toString(),
        status: 'Completed',
        featured: false,
        github: '',
        liveUrl: '',
        youtubeUrl: '',
      },
    ]);
  };

  const updateProject = (i, updates) => {
    setProjects((p) => p.map((proj, j) => (j === i ? { ...proj, ...updates } : proj)));
  };

  const removeProject = (i) => {
    if (window.confirm('Delete this project?')) setProjects((p) => p.filter((_, j) => j !== i));
  };

  const handleProjectImageUpload = (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProject(i, { image: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header-row">
        <h2 className="admin-panel-title" style={{ margin: 0 }}>Projects</h2>
        <button onClick={addProject} className="admin-add-btn">
          <HiPlus style={{ width: 16, height: 16 }} />
          Add New Project
        </button>
      </div>
      {projects.map((proj, i) => (
        <div key={proj.id} className="admin-item-card">
          <div className="admin-field-group">
            <label>Image</label>
            <div className="admin-flex-start">
              {proj.image && <img src={proj.image} alt="Preview" className="admin-img-preview" />}
              <div style={{ flex: 1, minWidth: 200 }}>
                <input type="url" placeholder="Image URL" value={proj.image?.startsWith('data:') ? '' : proj.image || ''} onChange={(e) => updateProject(i, { image: e.target.value })} className="admin-input" style={{ marginBottom: 8 }} />
                <label style={{ display: 'block' }}><span className="admin-add-btn" style={{ display: 'inline-flex', padding: '8px 14px', fontSize: 12 }}>Upload</span><input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleProjectImageUpload(i, e)} /></label>
              </div>
            </div>
          </div>
          <div className="admin-grid-2">
            <div className="admin-field-group"><label>Short Description (card)</label><textarea rows={2} value={proj.shortDesc || proj.description || ''} onChange={(e) => updateProject(i, { shortDesc: e.target.value })} className="admin-input" placeholder="Brief summary for project card" /></div>
            <div className="admin-field-group"><label>Long Description (modal)</label><textarea rows={2} value={proj.longDesc || proj.description || ''} onChange={(e) => updateProject(i, { longDesc: e.target.value })} className="admin-input" placeholder="Full description for detail modal" /></div>
          </div>
          {['title', 'description', 'category', 'year', 'status', 'github', 'liveUrl', 'youtubeUrl'].map((key) => (
            <div key={key} className="admin-field-group">
              <label>{key}</label>
              <input
                type={key === 'github' || key === 'liveUrl' || key === 'youtubeUrl' ? 'url' : 'text'}
                value={proj[key] || ''}
                onChange={(e) => updateProject(i, { [key]: e.target.value })}
                className="admin-input"
              />
            </div>
          ))}
          <label className="admin-checkbox-row">
            <input
              type="checkbox"
              checked={proj.featured}
              onChange={(e) => updateProject(i, { featured: e.target.checked })}
            />
            Featured
          </label>
          <div className="admin-field-group">
            <label>technologies (comma separated)</label>
            <input
              type="text"
              value={(proj.technologies || []).join(', ')}
              onChange={(e) =>
                updateProject(i, {
                  technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                })
              }
              className="admin-input"
            />
          </div>
          <button type="button" onClick={() => removeProject(i)} className="admin-remove-btn">
            <HiTrash style={{ width: 16, height: 16 }} />
            Remove
          </button>
        </div>
      ))}
      <div className="admin-actions">
        <button type="button" onClick={() => onSave(() => data.updateProjects(projects))} disabled={saving} className="admin-btn-primary">
          <HiSave style={{ width: 16, height: 16, marginRight: 8 }} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

const ExperienceEditor = ({ data, onSave, saving }) => {
  const [exp, setExp] = useState(data.experience || []);

  const add = () => {
    setExp((e) => [
      ...e,
      {
        id: Date.now().toString(),
        company: '',
        role: '',
        dateRange: '',
        jobType: 'Full-time',
        location: 'Remote',
        description: '',
        achievements: [],
        technologies: [],
      },
    ]);
  };

  const update = (i, updates) => {
    setExp((e) => e.map((x, j) => (j === i ? { ...x, ...updates } : x)));
  };

  const remove = (i) => {
    setExp((e) => e.filter((_, j) => j !== i));
  };

  return (
    <div className="admin-panel">
      <div className="admin-header-row">
        <h2 className="admin-panel-title" style={{ margin: 0 }}>Experience</h2>
        <button onClick={add} className="admin-add-btn">
          <HiPlus style={{ width: 16, height: 16 }} />
          Add
        </button>
      </div>
      {exp.map((job, i) => (
        <div key={job.id} className="admin-item-card">
          {['company', 'role', 'dateRange', 'location', 'description'].map((key) => (
            <div key={key} className="admin-field-group">
              <label>{key}</label>
              <input
                type="text"
                value={job[key] || ''}
                onChange={(e) => update(i, { [key]: e.target.value })}
                className="admin-input"
                placeholder={key === 'location' ? 'e.g. Remote, Dhaka, Bangladesh' : ''}
              />
            </div>
          ))}
          <div className="admin-field-group">
            <label>jobType</label>
            <select
              value={job.jobType || 'Full-time'}
              onChange={(e) => update(i, { jobType: e.target.value })}
              className="admin-input"
            >
              {['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid', 'Freelance', 'Internship'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="admin-field-group">
            <label>achievements (one per line)</label>
            <textarea
              value={(job.achievements || []).join('\n')}
              onChange={(e) => update(i, { achievements: e.target.value.split('\n').filter(Boolean) })}
              rows={3}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>technologies (comma separated)</label>
            <input
              type="text"
              value={(job.technologies || []).join(', ')}
              onChange={(e) =>
                update(i, {
                  technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                })
              }
              className="admin-input"
            />
          </div>
          <button type="button" onClick={() => remove(i)} className="admin-remove-btn">
            <HiTrash style={{ width: 16, height: 16 }} />
            Remove
          </button>
        </div>
      ))}
      <div className="admin-actions">
        <button type="button" onClick={() => onSave(() => data.updateExperience(exp))} disabled={saving} className="admin-btn-primary">
          <HiSave style={{ width: 16, height: 16, marginRight: 8 }} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

const EducationEditor = ({ data, onSave, saving }) => {
  const [edu, setEdu] = useState(data.education || []);
  const [certs, setCerts] = useState(data.certifications || []);

  const addEdu = () => {
    setEdu((e) => [
      ...e,
      {
        id: Date.now().toString(),
        degree: '',
        institution: '',
        year: '',
        location: '',
        description: '',
      },
    ]);
  };

  const addCert = () => {
    setCerts((c) => [
      ...c,
      { id: Date.now().toString(), name: '', issuer: '', year: '', credentialUrl: '' },
    ]);
  };

  return (
    <div className="admin-panel">
      <div>
        <div className="admin-header-row">
          <h2 className="admin-panel-title" style={{ margin: 0 }}>Education</h2>
          <button onClick={addEdu} className="admin-add-btn">
            <HiPlus style={{ width: 16, height: 16 }} />
            Add
          </button>
        </div>
        {edu.map((e, i) => (
          <div key={e.id} className="admin-item-card">
            {['degree', 'institution', 'year', 'location', 'description'].map((key) => (
              <div key={key} className="admin-field-group">
                <label>{key}</label>
                <input
                  type="text"
                  value={e[key] || ''}
                  onChange={(ev) =>
                    setEdu((ed) => ed.map((x, j) => (j === i ? { ...x, [key]: ev.target.value } : x)))
                  }
                  className="admin-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEdu((ed) => ed.filter((_, j) => j !== i))}
              className="admin-remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <div className="admin-header-row">
          <h2 className="admin-panel-title" style={{ margin: 0 }}>Certifications</h2>
          <button onClick={addCert} className="admin-add-btn">
            <HiPlus style={{ width: 16, height: 16 }} />
            Add
          </button>
        </div>
        {certs.map((c, i) => (
          <div key={c.id} className="admin-item-card">
            {['name', 'issuer', 'year', 'credentialUrl'].map((key) => (
              <div key={key} className="admin-field-group">
                <label>{key}</label>
                <input
                  type="text"
                  value={c[key] || ''}
                  onChange={(ev) =>
                    setCerts((ce) => ce.map((x, j) => (j === i ? { ...x, [key]: ev.target.value } : x)))
                  }
                  className="admin-input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setCerts((ce) => ce.filter((_, j) => j !== i))}
              className="admin-remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="admin-actions">
        <button
          type="button"
          onClick={() =>
            onSave(() => {
              data.updateEducation(edu);
              data.updateCertifications(certs);
            })
          }
          disabled={saving}
          className="admin-btn-primary"
        >
          <HiSave style={{ width: 16, height: 16, marginRight: 8 }} />
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
