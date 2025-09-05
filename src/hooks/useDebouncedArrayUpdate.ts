import { useState, useEffect, useRef } from 'react';

export function useDebouncedArrayUpdate<T>(
  initialData: T[],
  onUpdate: (data: T[]) => void,
  delay: number = 300
) {
  const [localData, setLocalData] = useState<T[]>(initialData);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update local state when initialData changes from parent
  useEffect(() => {
    setLocalData(initialData);
  }, [initialData]);

  // Helper to update with debouncing
  const updateWithDebounce = (newData: T[]) => {
    setLocalData(newData);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onUpdate(newData);
    }, delay);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [localData, updateWithDebounce] as const;
}

export default useDebouncedArrayUpdate;
