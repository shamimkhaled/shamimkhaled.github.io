/**
 * Portfolio database service.
 * Uses Supabase for storage. Requires REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  getInitialData,
  defaultProfile,
  defaultServices,
  defaultStats,
  defaultSkills,
  defaultProjects,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
  defaultFreelanceSettings,
  defaultContactSettings,
  defaultSiteSettings,
  defaultSectionConfig,
} from '../data/portfolioData';
import { sanitizeString, sanitizeUrl, sanitizeArray } from '../utils/sanitize';

const PORTFOLIO_ROW_ID = 1;

function mergeWithDefaults(parsed) {
  if (!parsed) return getInitialData();
  return {
    profile: { ...defaultProfile, ...parsed.profile },
    services: parsed.services ?? defaultServices,
    stats: parsed.stats ?? defaultStats,
    skills: parsed.skills ?? defaultSkills,
    projects: parsed.projects ?? defaultProjects,
    experience: parsed.experience ?? defaultExperience,
    education: parsed.education ?? defaultEducation,
    certifications: parsed.certifications ?? defaultCertifications,
    freelanceSettings: { ...defaultFreelanceSettings, ...parsed.freelanceSettings },
    contactSettings: { ...defaultContactSettings, ...parsed.contactSettings },
    siteSettings: { ...defaultSiteSettings, ...parsed.siteSettings },
    sectionConfig: { ...defaultSectionConfig, ...parsed.sectionConfig },
  };
}

/** Fetch raw row from Supabase (for testing/verification) */
export async function fetchRawFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, source: 'none', reason: 'Supabase not configured' };
  }
  try {
    const { data: row, error } = await supabase
      .from('portfolio')
      .select('id, data, updated_at')
      .eq('id', PORTFOLIO_ROW_ID)
      .maybeSingle();

    if (error) {
      return { ok: false, source: 'supabase', error: error.message, code: error.code };
    }
    const hasData = row?.data && Object.keys(row.data).length > 0;
    return {
      ok: true,
      source: 'supabase',
      hasRow: !!row,
      hasData,
      keys: row?.data ? Object.keys(row.data) : [],
      updatedAt: row?.updated_at || null,
    };
  } catch (e) {
    return { ok: false, source: 'supabase', error: String(e) };
  }
}

/** Load portfolio data from Supabase */
export async function loadFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return getInitialData();

  try {
    const { data: row, error } = await supabase
      .from('portfolio')
      .select('data')
      .eq('id', PORTFOLIO_ROW_ID)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase] Load error:', error.message, error.code);
      return getInitialData();
    }

    const payload = row?.data;
    if (!payload || (typeof payload === 'object' && Object.keys(payload).length === 0)) {
      console.log('[Supabase] Load: table empty or no row, using defaults');
      return getInitialData();
    }
    console.log('[Supabase] Load: fetched from API. Keys:', Object.keys(payload));
    return mergeWithDefaults(payload);
  } catch (e) {
    console.warn('Supabase load failed:', e);
    return getInitialData();
  }
}

/** Save portfolio data to Supabase (requires authenticated session) */
export async function saveToSupabase(data) {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('[Supabase] Not configured — save skipped');
    return;
  }

  try {
    const { error } = await supabase
      .from('portfolio')
      .upsert(
        { id: PORTFOLIO_ROW_ID, data, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      );

    if (error) {
      console.warn('[Supabase] Save error:', error.message, error);
      throw error;
    }

    console.log('[Supabase] Save successful');
  } catch (e) {
    console.warn('Supabase save failed:', e);
    throw e;
  }
}

/** Sanitize projects before save */
export function sanitizeProjects(projects) {
  if (!Array.isArray(projects)) return [];
  return projects.slice(0, 100).map((p) => ({
    ...p,
    title: sanitizeString(p.title || '', 300),
    description: sanitizeString(p.description || '', 3000),
    shortDesc: sanitizeString(p.shortDesc || '', 500),
    longDesc: sanitizeString(p.longDesc || '', 5000),
    image: sanitizeUrl(p.image) || p.image,
    github: sanitizeUrl(p.github) || p.github,
    liveUrl: sanitizeUrl(p.liveUrl) || p.liveUrl,
    technologies: sanitizeArray(p.technologies || p.tags || [], 20),
  }));
}
