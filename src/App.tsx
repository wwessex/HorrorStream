import { featuredMovie, movies } from './data';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">DREADFLIX</h1>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <section className="hero" style={{ background: featuredMovie.gradient }}>
        <div className="hero-overlay">
          <div className="hero-content">
            {featuredMovie.isOriginal && (
              <span className="original-badge">DREADFLIX ORIGINAL</span>
            )}
            <h2 className="hero-title">{featuredMovie.title}</h2>
            <p className="hero-description">{featuredMovie.description}</p>
            <div className="hero-meta">
              <span className="match-percent">{featuredMovie.matchPercent}% Match</span>
              <span>{featuredMovie.year}</span>
              <span className="rating-badge">{featuredMovie.rating}</span>
              <span>{featuredMovie.duration}</span>
            </div>
            <div className="hero-actions">
              <button className="play-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Play Now
              </button>
              <button className="info-btn">
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

      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="trending-row">
          {movies.map((movie) => (
            <article className="movie-card" key={movie.title} style={{ background: movie.gradient }}>
              <div className="card-overlay">
                {movie.isOriginal && <span className="card-badge">ORIGINAL</span>}
                <h3 className="card-title">{movie.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
