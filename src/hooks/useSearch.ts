import { useState, useEffect } from 'react';
import { Movie } from '../types';

export function useSearch(query: string, movies: Movie[]): Movie[] {
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      setResults(
        movies.filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.genre.toLowerCase().includes(q)
        )
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [query, movies]);

  return results;
}
