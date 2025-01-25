import { useState, useCallback, useEffect } from 'react';

export const useNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(() => {
    const stored = localStorage.getItem('nav-pinned');
    return stored === 'true';
  });

  // Initialize isOpen based on pinned state
  useEffect(() => {
    if (isPinned) {
      setIsOpen(true);
    }
  }, []);

  const togglePin = useCallback(() => {
    setIsPinned(prev => {
      const newValue = !prev;
      localStorage.setItem('nav-pinned', String(newValue));
      if (!newValue) {
        setIsOpen(false);
      }
      return newValue;
    });
  }, []);

  const handleOpen = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  return {
    isOpen,
    isPinned,
    handleOpen,
    togglePin
  };
};