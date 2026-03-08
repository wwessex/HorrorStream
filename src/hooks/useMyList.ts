import { useState, useCallback, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

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

export function useMyList(user: User | null) {
  const [myList, setMyList] = useState<string[]>(user ? [] : loadList);

  // Fetch list from Supabase when user is authenticated
  useEffect(() => {
    if (!user) {
      setMyList(loadList());
      return;
    }

    supabase
      .from('user_lists')
      .select('movie_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setMyList(data.map((row) => row.movie_id));
        }
      });
  }, [user]);

  const addToMyList = useCallback(
    async (id: string) => {
      setMyList((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        if (!user) saveList(next);
        return next;
      });

      if (user) {
        await supabase
          .from('user_lists')
          .upsert({ user_id: user.id, movie_id: id });
      }
    },
    [user]
  );

  const removeFromMyList = useCallback(
    async (id: string) => {
      setMyList((prev) => {
        const next = prev.filter((x) => x !== id);
        if (!user) saveList(next);
        return next;
      });

      if (user) {
        await supabase
          .from('user_lists')
          .delete()
          .eq('user_id', user.id)
          .eq('movie_id', id);
      }
    },
    [user]
  );

  const isInMyList = useCallback(
    (id: string) => myList.includes(id),
    [myList]
  );

  return { myList, addToMyList, removeFromMyList, isInMyList };
}
