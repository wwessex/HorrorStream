import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { toggleSearch, toggleMobileMenu } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-left">
        <Link to="/" className="logo-link">
          <h1 className="logo">DREADFLIX</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-active' : ''}`}>
            Home
          </Link>
          <Link to="/browse" className={`nav-link ${location.pathname.startsWith('/browse') ? 'nav-active' : ''}`}>
            Browse
          </Link>
          <Link to="/my-list" className={`nav-link ${location.pathname === '/my-list' ? 'nav-active' : ''}`}>
            My List
          </Link>
        </nav>
      </div>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Search" onClick={toggleSearch}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="icon-btn mobile-menu-btn" aria-label="Menu" onClick={toggleMobileMenu}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
