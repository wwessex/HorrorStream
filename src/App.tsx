import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import MovieModal from './components/MovieModal';
import SearchOverlay from './components/SearchOverlay';
import MobileMenu from './components/MobileMenu';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import MyListPage from './pages/MyListPage';
import SearchResultsPage from './pages/SearchResultsPage';

export default function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <SearchOverlay />
        <MobileMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/browse/:genre" element={<BrowsePage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
        <MovieModal />
      </div>
    </AppProvider>
  );
}
