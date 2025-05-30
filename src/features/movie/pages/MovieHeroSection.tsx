// MovieHeroSection.tsx
import React, { useState, useEffect } from 'react';
import MovieListing from '@/features/movie/pages/MovieListPage';
import MovieDetail from '@/features/movie/pages/MovieDetailPage';

type View = 'listing' | 'detail';

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
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

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
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className="text-2xl font-bold text-gray-900 cursor-pointer"
                onClick={handleBackToListing}
              >
                🎬 MovieHub
              </h1>
            </div>
            
            {currentView === 'listing' && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {favorites.length} favorites
                </span>
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`px-3 py-1 text-sm rounded ${
                    showFavoritesOnly
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showFavoritesOnly ? '❤️ Showing Favorites' : '🤍 Show Favorites'}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'listing' ? (
          <>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
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
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedGenre !== 'all' || showFavoritesOnly) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {selectedGenre !== 'all' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded capitalize">
                      Genre: {selectedGenre.replace('-', ' ')}
                    </span>
                  )}
                  {showFavoritesOnly && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">
                      Favorites Only
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Movie Listing */}
            {showFavoritesOnly ? (
              favorites.length > 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Favorites feature requires individual movie fetching. Click "Show All Movies" to browse and add favorites.
                  </p>
                  <button
                    onClick={() => setShowFavoritesOnly(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Show All Movies
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No favorites yet. Add some movies to your favorites!</p>
                  <button
                    onClick={() => setShowFavoritesOnly(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Browse Movies
                  </button>
                </div>
              )
            ) : (
              <MovieListing
                onMovieClick={handleMovieClick}
                searchTerm={searchTerm}
                selectedGenre={selectedGenre}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </>
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
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-sm">
            Powered by YTS API • Made with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MovieHeroSection;