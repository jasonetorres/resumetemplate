import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ResumeData, CoverLetterData } from '../types/resume';

export const useDocumentPersistence = (
  resumeData: ResumeData,
  coverLetterData: CoverLetterData,
  userId: string | null
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (!userId) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const { error } = await supabase
          .from('user_documents')
          .upsert({
            user_id: userId,
            resume_data: resumeData,
            cover_letter_data: coverLetterData,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id'
          });

        if (error) throw error;
        setLastSaved(new Date());
      } catch (error) {
        console.error('Error saving:', error);
      } finally {
        setIsSaving(false);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [resumeData, coverLetterData, userId]);

  const loadDocument = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error loading:', error);
      return null;
    }
  };

  const createNewDocument = async () => {
    try {
      const newUserId = Math.random().toString(36).substring(2, 10);

      const { error } = await supabase
        .from('user_documents')
        .insert({
          user_id: newUserId,
          resume_data: resumeData,
          cover_letter_data: coverLetterData,
        });

      if (error) throw error;
      return newUserId;
    } catch (error) {
      console.error('Error creating document:', error);
      return null;
    }
  };

  return { isSaving, lastSaved, loadDocument, createNewDocument };
};
