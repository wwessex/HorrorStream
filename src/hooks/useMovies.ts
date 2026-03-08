import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types';
import {
  fetchPublishedMovies,
  fetchFeaturedMovie,
  fetchMoviesByCategory,
} from '../lib/movieService';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublishedMovies()
      .then(setMovies)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading, error };
}

export function useFeaturedMovie() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedMovie()
      .then(setMovie)
      .catch(() => setMovie(null))
      .finally(() => setLoading(false));
  }, []);

  return { movie, loading };
}

export function useMoviesByCategory(key: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key) return;
    setLoading(true);
    fetchMoviesByCategory(key)
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [key]);

  return { movies, loading };
}

export function useAllPublishedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchPublishedMovies()
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { movies, loading, refresh };
}
