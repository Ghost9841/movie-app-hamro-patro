// MovieHeroSection.tsx
import React, { useState, useEffect } from 'react';
import MovieListing from '@/features/movie/pages/MovieListPage';
import MovieDetail from '@/features/movie/pages/MovieDetailPage';
import FavoritesPage from './FavoritesPage';

type View = 'listing' | 'detail' | 'favorites';

const genres = [
  'all', 'action', 'adventure', 'animation', 'biography', 'comedy', 'crime',
  'documentary', 'drama', 'family', 'fantasy', 'film-noir', 'history',
  'horror', 'music', 'musical', 'mystery', 'romance', 'sci-fi', 'sport',
  'thriller', 'war', 'western'
];

const MovieHeroSection: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('listing');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
    setCurrentView('detail');
  };

  const handleBackToListing = () => {
    setCurrentView('listing');
    setSelectedMovieId(null);
  };

  const handleNavigateToFavorites = () => {
    setCurrentView('favorites');
    setSelectedMovieId(null);
  };

  const handleToggleFavorite = (movieId: number) => {
    setFavorites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer"
                onClick={handleBackToListing}
              >
                🎬 MovieHub
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={handleBackToListing}
                className={`px-3 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${
                  currentView === 'listing'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">🏠 Home</span>
                <span className="sm:hidden">🏠</span>
              </button>
              
              <button
                onClick={handleNavigateToFavorites}
                className={`px-3 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors relative ${
                  currentView === 'favorites'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">❤️ Favorites</span>
                <span className="sm:hidden">❤️</span>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {currentView === 'listing' ? (
          <>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative lg:col-span-1">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Genre Filter */}
                <select
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize text-sm sm:text-base"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre} className="capitalize">
                      {genre === 'all' ? 'All Genres' : genre.replace('-', ' ')}
                    </option>
                  ))}
                </select>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedGenre !== 'all') && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {selectedGenre !== 'all' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded capitalize">
                      Genre: {selectedGenre.replace('-', ' ')}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Movie Listing */}
            <MovieListing
              onMovieClick={handleMovieClick}
              searchTerm={searchTerm}
              selectedGenre={selectedGenre}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </>
        ) : currentView === 'favorites' ? (
          <FavoritesPage
            favorites={favorites}
            onMovieClick={handleMovieClick}
            onToggleFavorite={handleToggleFavorite}
            onBackToHome={handleBackToListing}
          />
        ) : (
          selectedMovieId && (
            <MovieDetail
              movieId={selectedMovieId}
              onBack={handleBackToListing}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            Powered by YTS API • Made with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MovieHeroSection;