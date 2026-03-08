import { useState } from 'react';

const STORAGE_KEY = 'trip-checklist-v1';

export function useChecklist() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setChecked(new Set());
  };

  return { checked, toggle, reset };
}
