import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Movie } from '../types';
import { useMyList } from '../hooks/useMyList';

type AppContextValue = {
  selectedMovie: Movie | null;
  openModal: (movie: Movie) => void;
  closeModal: () => void;
  myList: string[];
  addToMyList: (id: string) => void;
  removeFromMyList: (id: string) => void;
  isInMyList: (id: string) => boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { myList, addToMyList, removeFromMyList, isInMyList } = useMyList();

  const openModal = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedMovie(null);
    document.body.style.overflow = '';
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      if (!prev) setIsMobileMenuOpen(false);
      return !prev;
    });
    setSearchQuery('');
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      return !prev;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedMovie,
        openModal,
        closeModal,
        myList,
        addToMyList,
        removeFromMyList,
        isInMyList,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        toggleSearch,
        closeSearch,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
