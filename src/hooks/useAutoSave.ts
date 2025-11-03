import { useEffect, useRef } from 'react';
import { ResumeData, CoverLetterData } from '../types/resume';

const STORAGE_KEY = 'resumeData';

export const useAutoSave = (
  resumeData: ResumeData,
  coverLetterData: CoverLetterData
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
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
      if (saved) {
        return JSON.parse(saved);
      }
      return null;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  };

  const saveData = async () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        resumeData,
        coverLetterData,
      }));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return { loadData, saveData };
};
