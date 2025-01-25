import { useState, useEffect, useCallback } from 'react';
import { Application, Component } from '../types';

type StarredItem = {
  id: string;
  type: 'application' | 'component';
  name: string;
};

// Create a custom event for star updates
const STAR_UPDATE_EVENT = 'star-update';
const starUpdateEvent = new Event(STAR_UPDATE_EVENT);

export const useStarred = () => {
  const [starredItems, setStarredItems] = useState<StarredItem[]>(() => {
    const stored = localStorage.getItem('starred-items');
    return stored ? JSON.parse(stored) : [];
  });

  // Listen for star updates from other components
  useEffect(() => {
    const handleStarUpdate = () => {
      const stored = localStorage.getItem('starred-items');
      if (stored) {
        setStarredItems(JSON.parse(stored));
      }
    };

    window.addEventListener(STAR_UPDATE_EVENT, handleStarUpdate);
    return () => window.removeEventListener(STAR_UPDATE_EVENT, handleStarUpdate);
  }, []);

  const updateStarredItems = useCallback((items: StarredItem[]) => {
    localStorage.setItem('starred-items', JSON.stringify(items));
    setStarredItems(items);
    window.dispatchEvent(starUpdateEvent);
  }, []);

  const toggleStar = useCallback((item: Application | Component, type: 'application' | 'component') => {
    const newItems = [...starredItems];
    const existingIndex = newItems.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      newItems.splice(existingIndex, 1);
    } else {
      newItems.push({ id: item.id, type, name: item.name });
    }
    
    updateStarredItems(newItems);
  }, [starredItems, updateStarredItems]);

  const isStarred = useCallback((id: string) => {
    return starredItems.some(item => item.id === id);
  }, [starredItems]);

  return { starredItems, toggleStar, isStarred, updateStarredItems };
};