import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getInitialData,
  STORAGE_KEY,
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
} from '../data/portfolioData';

const PortfolioContext = createContext(null);

export const usePortfolioData = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within PortfolioProvider');
  }
  return context;
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
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
      };
    }
  } catch (e) {
    console.warn('Failed to load portfolio data from localStorage:', e);
  }
  return getInitialData();
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save portfolio data to localStorage:', e);
  }
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const updateProfile = useCallback((updates) => {
    setData((prev) => ({ ...prev, profile: { ...prev.profile, ...updates } }));
  }, []);

  const updateStats = useCallback((stats) => {
    setData((prev) => ({ ...prev, stats }));
  }, []);

  const updateSkills = useCallback((skills) => {
    setData((prev) => ({ ...prev, skills }));
  }, []);

  const updateProjects = useCallback((projects) => {
    setData((prev) => ({ ...prev, projects }));
  }, []);

  const updateExperience = useCallback((experience) => {
    setData((prev) => ({ ...prev, experience }));
  }, []);

  const updateEducation = useCallback((education) => {
    setData((prev) => ({ ...prev, education }));
  }, []);

  const updateCertifications = useCallback((certifications) => {
    setData((prev) => ({ ...prev, certifications }));
  }, []);

  const updateFreelanceSettings = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      freelanceSettings: { ...prev.freelanceSettings, ...updates },
    }));
  }, []);

  const updateContactSettings = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      contactSettings: { ...prev.contactSettings, ...updates },
    }));
  }, []);

  const updateServices = useCallback((services) => {
    setData((prev) => ({ ...prev, services }));
  }, []);

  const updateAll = useCallback((newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, []);

  const value = {
    ...data,
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
    updateAll,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
