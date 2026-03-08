import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function MovieModal() {
  const { selectedMovie, closeModal, addToMyList, removeFromMyList, isInMyList } = useApp();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedMovie) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedMovie, closeModal]);

  if (!selectedMovie) return null;

  const inList = isInMyList(selectedMovie.id);

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-hero" style={{ background: selectedMovie.gradient }}>
          <div className="modal-hero-overlay">
            {selectedMovie.isOriginal && (
              <span className="original-badge">DREADFLIX ORIGINAL</span>
            )}
            <h2 className="modal-title">{selectedMovie.title}</h2>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            <span className="match-percent">{selectedMovie.matchPercent}% Match</span>
            <span>{selectedMovie.year}</span>
            <span className="rating-badge">{selectedMovie.rating}</span>
            <span>{selectedMovie.duration}</span>
          </div>
          <p className="modal-genre">{selectedMovie.genre}</p>
          <p className="modal-description">{selectedMovie.description}</p>

          <div className="modal-actions">
            <button className="play-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Play Now
            </button>
            <button
              className={`list-btn ${inList ? 'list-btn-active' : ''}`}
              onClick={() =>
                inList
                  ? removeFromMyList(selectedMovie.id)
                  : addToMyList(selectedMovie.id)
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {inList ? (
                  <>
                    <polyline points="20 6 9 17 4 12" />
                  </>
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </>
                )}
              </svg>
              {inList ? 'In My List' : 'My List'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
