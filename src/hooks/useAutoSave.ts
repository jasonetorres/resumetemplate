import { useEffect, useRef } from 'react';
import { ResumeData, CoverLetterData } from '../types/resume';

const STORAGE_KEY = 'resumeData';

export const useAutoSave = (
  resumeData: ResumeData,
  coverLetterData: CoverLetterData,
  enabled: boolean = true
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Don't save if not enabled (still loading initial data)
    if (!enabled) {
      console.log('[AutoSave] Disabled, skipping save');
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const dataToSave = {
          resumeData,
          coverLetterData,
        };
        console.log('[AutoSave] Saving data...', dataToSave.resumeData.personalInfo.name);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        console.log('[AutoSave] Saved successfully');
      } catch (error) {
        console.error('[AutoSave] Error saving data:', error);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [resumeData, coverLetterData, enabled]);

  const loadData = async () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('[AutoSave] Loaded data:', parsed.resumeData.personalInfo.name);
        return parsed;
      }
      console.log('[AutoSave] No saved data found');
      return null;
    } catch (error) {
      console.error('[AutoSave] Error loading data:', error);
      return null;
    }
  };

  const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[AutoSave] Cleared saved data');
  };

  return { loadData, clearData };
};
