import { useEffect, useRef } from 'react';
import { ResumeData, CoverLetterData } from '../types/resume';

const STORAGE_KEY = 'resumeData';

export const useAutoSave = (
  resumeData: ResumeData,
  coverLetterData: CoverLetterData
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    // Skip saving on initial load
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
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
  }, [resumeData, coverLetterData]);

  const loadData = async () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      console.log('Loading from localStorage:', saved);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Loaded data:', parsed);
        return parsed;
      }
      console.log('No saved data found');
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
      console.log('Saving to localStorage:', dataToSave);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      console.log('Saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return { loadData, saveData };
};
