import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminHeader() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <Link to="/admin" className="admin-logo">
          DREADFLIX <span className="admin-logo-tag">Admin</span>
        </Link>
        <nav className="admin-nav">
          <Link
            to="/admin"
            className={`admin-nav-link ${location.pathname === '/admin' ? 'admin-nav-active' : ''}`}
          >
            Movies
          </Link>
          <Link to="/" className="admin-nav-link">
            View Site
          </Link>
        </nav>
      </div>
      <div className="admin-header-right">
        <span className="admin-user-email">{user?.email}</span>
        <button className="admin-sign-out" onClick={signOut}>Sign Out</button>
      </div>
    </header>
  );
}
