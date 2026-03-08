import { Movie } from '../types';
import MovieCard from './MovieCard';

export default function ContentRow({ title, movies }: { title: string; movies: Movie[] }) {
  if (movies.length === 0) return null;

  return (
    <section className="trending-section">
      <h2 className="section-title">{title}</h2>
      <div className="trending-row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
