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
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveData();
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
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  };

  const saveData = async () => {
    try {
      const dataToSave = {
        resumeData,
        coverLetterData,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return { loadData, saveData };
};
