import { useState, useEffect, useCallback } from 'react';

export function useDebounceUpdate<T>(
  initialValue: T,
  onUpdate: (value: T) => void,
  delay: number = 100
) {
  const [localValue, setLocalValue] = useState<T>(initialValue);

  // Update local state when initialValue changes (from parent)
  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  // Debounced update to parent
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(localValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, onUpdate, delay]);

  return [localValue, setLocalValue] as const;
}

export default useDebounceUpdate;
