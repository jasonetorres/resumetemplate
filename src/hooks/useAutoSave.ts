import { useEffect, useRef } from 'react';
import { supabase, getUserId } from '../lib/supabase';
import { ResumeData, CoverLetterData } from '../types/resume';

export const useAutoSave = (
  resumeData: ResumeData,
  coverLetterData: CoverLetterData
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const documentIdRef = useRef<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

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
      const userId = getUserId();
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading data:', error);
        return null;
      }

      if (data) {
        documentIdRef.current = data.id;
        return {
          resumeData: data.resume_data as ResumeData,
          coverLetterData: data.cover_letter_data as CoverLetterData,
        };
      }

      return null;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  };

  const saveData = async () => {
    try {
      const userId = getUserId();

      if (documentIdRef.current) {
        const { error } = await supabase
          .from('user_documents')
          .update({
            resume_data: resumeData,
            cover_letter_data: coverLetterData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', documentIdRef.current);

        if (error) {
          console.error('Error updating data:', error);
        }
      } else {
        const { data, error } = await supabase
          .from('user_documents')
          .insert({
            user_id: userId,
            resume_data: resumeData,
            cover_letter_data: coverLetterData,
          })
          .select()
          .single();

        if (error) {
          console.error('Error inserting data:', error);
        } else if (data) {
          documentIdRef.current = data.id;
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return { loadData, saveData };
};
