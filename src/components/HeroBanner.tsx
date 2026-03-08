import { Movie } from '../types';
import { useApp } from '../context/AppContext';

export default function HeroBanner({ movie }: { movie: Movie }) {
  const { openModal } = useApp();

  const bgStyle = movie.bannerImageUrl || movie.coverImageUrl
    ? {
        background: `linear-gradient(to top, #000 0%, transparent 60%), url(${movie.bannerImageUrl || movie.coverImageUrl}) center/cover no-repeat`,
      }
    : { background: movie.gradient };

  return (
    <section className="hero" style={bgStyle}>
      <div className="hero-overlay">
        <div className="hero-content">
          {movie.isOriginal && (
            <span className="original-badge">DREADFLIX ORIGINAL</span>
          )}
          <h2 className="hero-title">{movie.title}</h2>
          <p className="hero-description">{movie.description}</p>
          <div className="hero-meta">
            <span className="match-percent">{movie.matchPercent}% Match</span>
            <span>{movie.year}</span>
            <span className="rating-badge">{movie.rating}</span>
            <span>{movie.duration}</span>
          </div>
          <div className="hero-actions">
            <button className="play-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Play Now
            </button>
            <button className="info-btn" onClick={() => openModal(movie)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
