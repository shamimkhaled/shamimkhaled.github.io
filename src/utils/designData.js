/**
 * Normalizes portfolio context data into the design format.
 */

export function getDesignProfile(profile, freelanceSettings = {}) {
  const social = profile?.social || {};
  const devtoUrl = social.devto || '';
  const devtoUsername = devtoUrl ? devtoUrl.replace(/^https?:\/\/(www\.)?dev\.to\//, '').replace(/\/$/, '') : 'shamimkhaled';
  const heroTitles = profile?.heroTitles || ['Full Stack Developer', 'Python Expert', 'Django Specialist', 'React Developer', 'API Architect'];
  const availabilityText = freelanceSettings?.availabilityText || 'Open to Freelance & Remote Work';
  const hourlyRate = freelanceSettings?.hourlyRate || '$25/hr';
  const responseTime = freelanceSettings?.responseTime || 'Within 24 hours';
  const consultationText = freelanceSettings?.consultationOffer || 'First 30-min consultation is FREE';
  const workTypes = freelanceSettings?.preferredWorkTypes || ['Remote Work', 'Freelance', 'Contract', 'Full-time'];
  return {
    name: profile?.name || 'Shamim Khaled',
    title: profile?.title || 'Full Stack Developer',
    tagline: profile?.tagline || "I build fast, scalable web apps & APIs that solve real problems.",
    bio: profile?.bio || '',
    longBio: profile?.longBio || profile?.bio || '',
    email: profile?.email || '',
    location: profile?.location || 'Dhaka, Bangladesh',
    timezone: freelanceSettings?.timezone || 'UTC+6 (BST)',
    responseTime,
    response: responseTime,
    avatar: profile?.avatar || '',
    github: social?.github || profile?.github || 'https://github.com/shamimkhaled',
    linkedin: social?.linkedin || profile?.linkedin || 'https://linkedin.com/in/shamimkhaled',
    devto: devtoUsername,
    resume: profile?.resumeUrl || profile?.resume || '#',
    heroTitles,
    tagRoles: heroTitles,
    availability: freelanceSettings?.available ?? true,
    availabilityText,
    availText: availabilityText,
    hourlyRate,
    rate: hourlyRate,
    workTypes,
    consultationText,
    consultation: consultationText,
    hirePitch: freelanceSettings?.hirePitch || "Have a project in mind? Let's build something great together.",
  };
}

const SERVICE_COLORS = ['#00d4ff', '#39ff14', '#ff6b35', '#a855f7'];
export function getDesignServices(services) {
  const iconMap = { backend: '⚙️', frontend: '🎨', freelance: '🚀', 'ml-ai': '🧠', devops: '☁️', database: '🗄️' };
  return (services || []).map((s, i) => ({
    id: s.id,
    icon: typeof s.icon === 'string' && s.icon.length <= 2 ? s.icon : (iconMap[s.icon] || ['⚙️', '🎨', '🚀'][i % 3]),
    title: s.title,
    desc: s.description || s.desc || '',
    items: s.items || (s.description ? s.description.split(/[.;]+\s*/).filter(Boolean) : []),
    color: s.color || SERVICE_COLORS[i % SERVICE_COLORS.length],
    clr: s.color || SERVICE_COLORS[i % SERVICE_COLORS.length],
  }));
}

export function getDesignStats(stats) {
  return (stats || []).map((s) => {
    const value = s.value || s.val || '';
    const label = s.label || '';
    return { label, value, val: value };
  }).filter((s) => s.value);
}

const SKILL_ICONS = {
  Python: '🐍', Django: '🎸', 'Django REST Framework': '🔧', FastAPI: '⚡', Flask: '🌶️',
  React: '⚛️', JavaScript: '⚡', 'Tailwind CSS': '🎨', 'HTML/CSS': '📄',
  PostgreSQL: '🐘', MySQL: '🗄️', Redis: '⚡', MongoDB: '🍃',
  Docker: '🐳', Git: '📝', 'Digital Ocean': '🌊', Linux: '🐧', AWS: '☁️',
};
export function getDesignSkills(skills) {
  if (!skills || !Array.isArray(skills)) return [];
  const flat = [];
  let id = 1;
  skills.forEach((cat) => {
    const category = cat.category || 'Other';
    (cat.skills || []).forEach((sk) => {
      const name = typeof sk === 'string' ? sk : (sk.name || sk);
      const level = sk.level ?? 80;
      flat.push({
        id: sk.id || id++,
        name,
        category,
        cat: category,
        level,
        pct: level,
        icon: sk.icon || SKILL_ICONS[name] || '⚡',
      });
    });
  });
  return flat.length ? flat : [{ id: 1, name: 'Python', category: 'Backend', level: 90, icon: '🐍' }];
}

export function getDesignProjects(projects) {
  return (projects || []).map((p) => {
    const shortDesc = p.shortDesc || p.description || '';
    const longDesc = p.longDesc || p.description || '';
    const image = p.image || '';
    const year = typeof p.year === 'number' ? p.year : parseInt(p.year, 10) || new Date().getFullYear();
    const status = (p.status || 'completed').toLowerCase().replace(/\s+/g, '-');
    return {
      id: p.id,
      title: p.title,
      slug: p.slug || p.title?.toLowerCase().replace(/\s+/g, '-') || '',
      shortDesc,
      short: shortDesc,
      longDesc,
      long: longDesc,
      tags: p.tags || p.technologies || [],
      category: p.category || 'Backend',
      cat: p.category || 'Backend',
      github: p.github || '',
      live: p.live || p.liveUrl || '',
      image,
      img: image,
      featured: p.featured ?? false,
      year,
      status,
    };
  });
}

export function getDesignExperience(experience) {
  return (experience || []).map((exp) => {
    const [start, endRaw] = (exp.dateRange || '').split(/\s*-\s*/).map((s) => s?.trim() || '');
    const end = endRaw && !/present|current/i.test(endRaw) ? endRaw : '';
    const current = !!exp.current || /present|current/i.test(endRaw || '');
    const company = exp.company || '';
    const achievements = exp.achievements || [];
    const tech = exp.technologies || exp.tech || [];
    const color = exp.color || 'var(--c1)';
    return {
      id: exp.id,
      company,
      co: company,
      role: exp.role,
      type: exp.jobType || 'Full-time',
      from: exp.start || start || '',
      to: exp.end || end || '',
      start: exp.start || start || '',
      end: exp.end || end || '',
      current,
      loc: exp.location || 'Remote',
      location: exp.location || 'Remote',
      desc: exp.description || exp.desc || '',
      achievements,
      wins: achievements,
      tech,
      logo: exp.logo || (company || 'C')[0],
      color,
      clr: color,
    };
  });
}

export function getDesignEducation(education, certifications = []) {
  const degrees = (education || []).map((e) => ({
    id: e.id,
    institution: e.institution,
    shortName: e.shortName || (e.institution || 'I').substring(0, 1).toUpperCase(),
    degree: e.degree,
    year: e.year,
    grade: e.grade || 'Completed',
    desc: e.description || e.desc || '',
    logo: e.logo || (e.institution || 'I')[0],
    type: 'degree',
  }));
  const certs = (certifications || []).map((c) => ({
    id: c.id,
    institution: c.issuer || c.name,
    shortName: c.shortName || (c.issuer || c.name || 'C')[0],
    degree: c.name,
    year: c.year || '',
    grade: 'Completed',
    desc: '',
    logo: (c.issuer || c.name || 'C')[0],
    type: 'cert',
    url: c.credentialUrl || c.url || '',
  }));
  return [...degrees, ...certs];
}
