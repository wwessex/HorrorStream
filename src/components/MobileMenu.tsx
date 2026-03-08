import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useApp();
  const location = useLocation();

  if (!isMobileMenuOpen) return null;

  return (
    <>
      <div className="mobile-menu-backdrop" onClick={closeMobileMenu} />
      <nav className="mobile-menu">
        <button className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Link
          to="/"
          className={`mobile-nav-link ${location.pathname === '/' ? 'nav-active' : ''}`}
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/browse"
          className={`mobile-nav-link ${location.pathname.startsWith('/browse') ? 'nav-active' : ''}`}
          onClick={closeMobileMenu}
        >
          Browse
        </Link>
        <Link
          to="/my-list"
          className={`mobile-nav-link ${location.pathname === '/my-list' ? 'nav-active' : ''}`}
          onClick={closeMobileMenu}
        >
          My List
        </Link>
      </nav>
    </>
  );
}
