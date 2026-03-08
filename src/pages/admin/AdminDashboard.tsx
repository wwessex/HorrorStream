import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import StatusBadge, { getMovieStatus } from '../../components/admin/StatusBadge';
import { Movie } from '../../types';
import { fetchAllMovies, deleteMovie, toggleMovieVisibility } from '../../lib/movieService';

type StatusFilter = 'all' | 'published' | 'hidden' | 'expired' | 'scheduled' | 'coming-soon';

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchAllMovies();
      setMovies(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMovies(); }, [loadMovies]);

  const handleToggleVisibility = async (movie: Movie) => {
    try {
      await toggleMovieVisibility(movie.id, movie.isPublished);
      await loadMovies();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update visibility');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMovie(id);
      setDeleteConfirm(null);
      await loadMovies();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete movie');
    }
  };

  const filteredMovies = movies.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    const status = getMovieStatus(m);
    switch (statusFilter) {
      case 'published': return status.label === 'Published';
      case 'hidden': return status.label === 'Hidden';
      case 'expired': return status.label === 'Expired';
      case 'scheduled': return status.label === 'Scheduled';
      case 'coming-soon': return status.label === 'Coming Soon';
      default: return true;
    }
  });

  const stats = {
    total: movies.length,
    published: movies.filter((m) => getMovieStatus(m).label === 'Published').length,
    hidden: movies.filter((m) => getMovieStatus(m).label === 'Hidden').length,
    expired: movies.filter((m) => getMovieStatus(m).label === 'Expired').length,
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Movies</h1>
            <div className="admin-stats">
              <span className="admin-stat">{stats.total} Total</span>
              <span className="admin-stat stat-published">{stats.published} Published</span>
              <span className="admin-stat stat-hidden">{stats.hidden} Hidden</span>
              <span className="admin-stat stat-expired">{stats.expired} Expired</span>
            </div>
          </div>
          <Link to="/admin/movies/new" className="admin-btn admin-btn-primary">
            + Add Movie
          </Link>
        </div>

        <div className="admin-toolbar">
          <input
            type="text"
            className="admin-search"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
            <option value="coming-soon">Coming Soon</option>
          </select>
        </div>

        {error && <div className="admin-error">{error}</div>}

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
            <p>Loading movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="admin-empty">
            <p>No movies found{search ? ` matching "${search}"` : ''}.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Genre</th>
                  <th>Year</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Expiration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td>
                      <div className="admin-movie-cell">
                        {movie.thumbnailUrl || movie.coverImageUrl ? (
                          <img
                            src={movie.thumbnailUrl || movie.coverImageUrl || ''}
                            alt={movie.title}
                            className="admin-movie-thumb"
                          />
                        ) : (
                          <div
                            className="admin-movie-thumb-placeholder"
                            style={{ background: movie.gradient }}
                          />
                        )}
                        <div>
                          <span className="admin-movie-title">{movie.title}</span>
                          {movie.isOriginal && <span className="admin-badge-original">Original</span>}
                          {movie.isFeatured && <span className="admin-badge-featured">Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="admin-td-muted">{movie.genre}</td>
                    <td className="admin-td-muted">{movie.year}</td>
                    <td>{movie.rating}</td>
                    <td><StatusBadge movie={movie} /></td>
                    <td className="admin-td-muted">
                      {movie.expirationDate
                        ? new Date(movie.expirationDate).toLocaleDateString()
                        : 'Unlimited'}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <Link
                          to={`/admin/movies/${movie.id}/edit`}
                          className="admin-btn admin-btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-outline"
                          onClick={() => handleToggleVisibility(movie)}
                        >
                          {movie.isPublished ? 'Hide' : 'Show'}
                        </button>
                        {deleteConfirm === movie.id ? (
                          <>
                            <button
                              className="admin-btn admin-btn-sm admin-btn-danger"
                              onClick={() => handleDelete(movie.id)}
                            >
                              Confirm
                            </button>
                            <button
                              className="admin-btn admin-btn-sm"
                              onClick={() => setDeleteConfirm(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="admin-btn admin-btn-sm admin-btn-danger-outline"
                            onClick={() => setDeleteConfirm(movie.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
