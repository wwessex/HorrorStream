import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { allMovies, genres } from '../data';
import MovieCard from '../components/MovieCard';

export default function BrowsePage() {
  const { genre: urlGenre } = useParams<{ genre?: string }>();
  const [selectedGenre, setSelectedGenre] = useState(
    urlGenre
      ? genres.find((g) => g.toLowerCase().replace(/\s+/g, '-') === urlGenre) || 'All'
      : 'All'
  );

  const filtered =
    selectedGenre === 'All'
      ? allMovies
      : allMovies.filter((m) =>
          m.genre.toLowerCase().includes(selectedGenre.toLowerCase())
        );

  return (
    <div className="page-container">
      <h1 className="page-title">Browse</h1>
      <div className="genre-filters">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${selectedGenre === genre ? 'genre-btn-active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="movie-grid">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No movies found for this genre.</p>
      )}
    </div>
  );
}
