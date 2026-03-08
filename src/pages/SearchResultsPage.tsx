import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { allMovies } from '../data';
import MovieCard from '../components/MovieCard';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = useSearch(query, allMovies);

  return (
    <div className="page-container">
      <h1 className="page-title">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>
      {query && results.length > 0 ? (
        <div className="movie-grid">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : query ? (
        <p className="empty-state">No results found for "{query}"</p>
      ) : (
        <p className="empty-state">Enter a search term to find movies.</p>
      )}
    </div>
  );
}
