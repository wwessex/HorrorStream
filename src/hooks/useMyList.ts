import { useState, useCallback } from 'react';

const STORAGE_KEY = 'dreadflix-my-list';

function loadList(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveList(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useMyList() {
  const [myList, setMyList] = useState<string[]>(loadList);

  const addToMyList = useCallback((id: string) => {
    setMyList((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveList(next);
      return next;
    });
  }, []);

  const removeFromMyList = useCallback((id: string) => {
    setMyList((prev) => {
      const next = prev.filter((x) => x !== id);
      saveList(next);
      return next;
    });
  }, []);

  const isInMyList = useCallback(
    (id: string) => myList.includes(id),
    [myList]
  );

  return { myList, addToMyList, removeFromMyList, isInMyList };
}
