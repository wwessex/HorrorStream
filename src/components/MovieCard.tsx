import { Movie } from '../types';
import { useApp } from '../context/AppContext';

export default function MovieCard({ movie }: { movie: Movie }) {
  const { openModal } = useApp();

  return (
    <article
      className="movie-card"
      style={
        movie.coverImageUrl || movie.thumbnailUrl
          ? { backgroundImage: `url(${movie.thumbnailUrl || movie.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: movie.gradient }
      }
      onClick={() => openModal(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(movie);
        }
      }}
    >
      <div className="card-overlay">
        {movie.isOriginal && <span className="card-badge">ORIGINAL</span>}
        <h3 className="card-title">{movie.title}</h3>
      </div>
    </article>
  );
}
