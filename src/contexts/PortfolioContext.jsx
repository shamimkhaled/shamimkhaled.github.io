import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getInitialData } from '../data/portfolioData';
import { loadFromSupabase, saveToSupabase, sanitizeProjects } from '../services/portfolioDb';
import { isSupabaseConfigured } from '../lib/supabase';

const PortfolioContext = createContext(null);

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(getInitialData());
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const userHasEdited = useRef(false);
  const dataRef = useRef(data);
  dataRef.current = data;

  // Load data on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      try {
        const loaded = await loadFromSupabase();
        if (!cancelled) setData(loaded);
      } catch (e) {
        console.warn('Load failed:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Persist when admin has edited (debounced) — backup for rapid edits
  useEffect(() => {
    if (!userHasEdited.current || loading) return;
    const t = setTimeout(() => {
      saveToSupabase(dataRef.current);
      userHasEdited.current = false;
    }, 500);
    return () => clearTimeout(t);
  }, [data, loading]);

  /** Persist immediately (used when Admin clicks Save). Waits for React to commit state. */
  const persistNow = useCallback(() => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await saveToSupabase(dataRef.current);
          userHasEdited.current = false;
          resolve();
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }, []);

  const markEdited = useCallback(() => {
    userHasEdited.current = true;
  }, []);

  const updateProfile = useCallback((updates) => {
    markEdited();
    setData((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  }, [markEdited]);

  const updateStats = useCallback((stats) => {
    markEdited();
    setData((prev) => ({ ...prev, stats }));
  }, [markEdited]);

  const updateSkills = useCallback((skills) => {
    markEdited();
    setData((prev) => ({ ...prev, skills }));
  }, [markEdited]);

  const updateProjects = useCallback((projects) => {
    if (!Array.isArray(projects)) return;
    markEdited();
    const safe = sanitizeProjects(projects);
    setData((prev) => ({ ...prev, projects: safe }));
  }, [markEdited]);

  const updateExperience = useCallback((experience) => {
    markEdited();
    setData((prev) => ({ ...prev, experience }));
  }, [markEdited]);

  const updateEducation = useCallback((education) => {
    markEdited();
    setData((prev) => ({ ...prev, education }));
  }, [markEdited]);

  const updateCertifications = useCallback((certifications) => {
    markEdited();
    setData((prev) => ({ ...prev, certifications }));
  }, [markEdited]);

  const updateFreelanceSettings = useCallback((updates) => {
    markEdited();
    setData((prev) => ({
      ...prev,
      freelanceSettings: { ...prev.freelanceSettings, ...updates },
    }));
  }, [markEdited]);

  const updateContactSettings = useCallback((updates) => {
    markEdited();
    setData((prev) => ({
      ...prev,
      contactSettings: { ...prev.contactSettings, ...updates },
    }));
  }, [markEdited]);

  const updateServices = useCallback((services) => {
    markEdited();
    setData((prev) => ({ ...prev, services }));
  }, [markEdited]);

  const updateSiteSettings = useCallback((updates) => {
    markEdited();
    setData((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...updates },
    }));
  }, [markEdited]);

  const updateSectionConfig = useCallback((updates) => {
    markEdited();
    setData((prev) => ({
      ...prev,
      sectionConfig: { ...prev.sectionConfig, ...updates },
    }));
  }, [markEdited]);

  const updateAll = useCallback((newData) => {
    markEdited();
    setData((prev) => ({ ...prev, ...newData }));
  }, [markEdited]);

  const value = {
    ...data,
    loading,
    persistNow,
    updateProfile,
    updateStats,
    updateSkills,
    updateProjects,
    updateExperience,
    updateEducation,
    updateCertifications,
    updateFreelanceSettings,
    updateContactSettings,
    updateServices,
    updateSiteSettings,
    updateSectionConfig,
    updateAll,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
