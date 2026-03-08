import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useSearch } from '../hooks/useSearch';
import { useMovies } from '../hooks/useMovies';
import MovieCard from './MovieCard';

export default function SearchOverlay() {
  const { isSearchOpen, searchQuery, setSearchQuery, closeSearch } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const { movies } = useMovies();
  const results = useSearch(searchQuery, movies);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-bar">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search titles, genres, descriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-close" onClick={closeSearch} aria-label="Close search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      {searchQuery.trim() && (
        <div className="search-results">
          {results.length > 0 ? (
            <div className="movie-grid">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="empty-state">No results found for "{searchQuery}"</p>
          )}
        </div>
      )}
    </div>
  );
}
