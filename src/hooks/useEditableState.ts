import { useState, useEffect, useCallback, useRef } from 'react';

export function useEditableState<T>(
  initialValue: T,
  onUpdate: (value: T) => void
) {
  const [localValue, setLocalValue] = useState<T>(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const hasChangesRef = useRef(false);

  // Only sync from parent when we're not editing
  useEffect(() => {
    if (!isEditing) {
      setLocalValue(initialValue);
      hasChangesRef.current = false;
    }
  }, [initialValue, isEditing]);

  const updateLocalValue = useCallback((newValue: T) => {
    setLocalValue(newValue);
    setIsEditing(true);
    hasChangesRef.current = true;
  }, []);

  const saveChanges = useCallback(() => {
    if (hasChangesRef.current) {
      onUpdate(localValue);
    }
    setIsEditing(false);
    hasChangesRef.current = false;
  }, [localValue, onUpdate]);

  const discardChanges = useCallback(() => {
    setLocalValue(initialValue);
    setIsEditing(false);
    hasChangesRef.current = false;
  }, [initialValue]);

  const immediateUpdate = useCallback((newValue: T) => {
    setLocalValue(newValue);
    onUpdate(newValue);
    setIsEditing(false);
    hasChangesRef.current = false;
  }, [onUpdate]);

  return {
    value: localValue,
    updateLocalValue,
    saveChanges,
    discardChanges,
    immediateUpdate,
    isEditing,
    hasChanges: hasChangesRef.current
  };
}

export default useEditableState;
