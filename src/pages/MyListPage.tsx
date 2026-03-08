import { useApp } from '../context/AppContext';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';

export default function MyListPage() {
  const { myList } = useApp();
  const { movies, loading } = useMovies();
  const savedMovies = movies.filter((m) => myList.includes(m.id));

  return (
    <div className="page-container">
      <h1 className="page-title">My List</h1>
      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : savedMovies.length > 0 ? (
        <div className="movie-grid">
          {savedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-title">Your list is empty</p>
          <p className="empty-state-subtitle">
            Browse movies and add them to your list to watch later.
          </p>
        </div>
      )}
    </div>
  );
}
