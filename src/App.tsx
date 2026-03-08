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
import LoginPage from './pages/LoginPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import MovieForm from './pages/admin/MovieForm';

export default function App() {
  return (
    <AppProvider>
      <div className="app">
        <Routes>
          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/movies/new" element={<AdminRoute><MovieForm /></AdminRoute>} />
          <Route path="/admin/movies/:id/edit" element={<AdminRoute><MovieForm /></AdminRoute>} />

          {/* Public routes */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <SearchOverlay />
                <MobileMenu />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/browse" element={<BrowsePage />} />
                  <Route path="/browse/:genre" element={<BrowsePage />} />
                  <Route path="/my-list" element={<MyListPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
                <MovieModal />
              </>
            }
          />
        </Routes>
      </div>
    </AppProvider>
  );
}
