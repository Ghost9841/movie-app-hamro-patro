// FavoritesPage.tsx
import React, { useState, useEffect } from 'react';
import {type  AxiosResponse } from 'axios';
import ytsApi from '@/services/Axios';
import { type YtsMovie, type YtsApiResponse } from '@/features/movie/types/MovieTypes';

interface FavoritesPageProps {
  favorites: number[];
  onMovieClick: (movieId: number) => void;
  onToggleFavorite: (movieId: number) => void;
  onBackToHome: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onMovieClick,
  onToggleFavorite,
  onBackToHome,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<YtsMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

  const fetchFavoriteMovie = async (movieId: number): Promise<YtsMovie[] | null> => {
    try {
      setLoadingStates(prev => ({ ...prev, [movieId]: true }));
      
      const response: AxiosResponse<YtsApiResponse> = await ytsApi.get('movie_details.json', {
        params: { movie_id: movieId, with_images: true },
      });
      
      return response.data.data.movies;
    } catch (err) {
      console.error(`Error fetching movie ${movieId}:`, err);
      return null;
    } finally {
      setLoadingStates(prev => ({ ...prev, [movieId]: false }));
    }
  };

  const fetchAllFavorites = async () => {
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const moviePromises = favorites.map(id => fetchFavoriteMovie(id));
      const movies = await Promise.all(moviePromises);
      const validMovies = movies.flat().filter((movie): movie is YtsMovie => movie !== null);
      
      setFavoriteMovies(validMovies);
      
      if (validMovies.length === 0 && favorites.length > 0) {
        setError('Could not load any favorite movies. They may no longer be available.');
      }
    } catch (err) {
      setError('Failed to load favorite movies. Please try again.');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFavorites();
  }, [favorites]);

  // Loading Skeleton Component
  const MovieSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-300 rounded w-12"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">💔</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start adding movies to your favorites by clicking the heart icon on any movie you love!
      </p>
      <button
        onClick={onBackToHome}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        🎬 Browse Movies
      </button>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">😞</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
      <div className="space-x-4">
        <button
          onClick={fetchAllFavorites}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          🔄 Try Again
        </button>
        <button
          onClick={onBackToHome}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          🏠 Go Home
        </button>
      </div>
    </div>
  );

  if (favorites.length === 0) {
    return <EmptyState />;
  }

  if (error && favoriteMovies.length === 0) {
    return <ErrorState />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              ❤️ My Favorites
            </h1>
            <p className="text-gray-600">
              {loading ? 
                'Loading your favorite movies...' : 
                `${favoriteMovies.length} favorite movie${favoriteMovies.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
          
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium w-fit"
          >
            ← Back to Browse
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: Math.min(favorites.length, 10) }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Movies Grid */}
      {!loading && favoriteMovies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105">
              <div className="relative group">
                <img
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  className="w-full h-48 sm:h-64 object-cover cursor-pointer"
                  onClick={() => onMovieClick(movie.id)}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 cursor-pointer"
                     onClick={() => onMovieClick(movie.id)}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Remove from Favorites Button */}
                <button
                  onClick={() => onToggleFavorite(movie.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Remove from favorites"
                >
                  ❤️
                </button>
              </div>
              
              <div className="p-3 sm:p-4">
                <h3
                  className="font-semibold text-sm sm:text-base mb-2 cursor-pointer hover:text-blue-600 line-clamp-2 leading-tight"
                  onClick={() => onMovieClick(movie.id)}
                >
                  {movie.title}
                </h3>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600">
                  <span>{movie.year}</span>
                  <span className="flex items-center">
                    ⭐ {movie.rating}/10
                  </span>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {movie.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                    {movie.genres.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{movie.genres.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Partial Error Message */}
      {error && favoriteMovies.length > 0 && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-yellow-600 mr-2">⚠️</span>
            <p className="text-yellow-800 text-sm">
              Some favorite movies could not be loaded. They may no longer be available.
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!loading && favoriteMovies.length > 0 && (
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onBackToHome}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🎬 Find More Movies
              </button>
              <button
                onClick={() => {
                  // Clear all favorites with confirmation
                  if (window.confirm(`Are you sure you want to remove all ${favoriteMovies.length} movies from your favorites?`)) {
                    favoriteMovies.forEach(movie => onToggleFavorite(movie.id));
                  }
                }}
                className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                🗑️ Clear All Favorites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {!loading && favoriteMovies.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{favoriteMovies.length}</div>
            <div className="text-sm text-gray-600">Total Movies</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {favoriteMovies.length > 0 ? Math.round(favoriteMovies.reduce((acc, movie) => acc + movie.rating, 0) / favoriteMovies.length * 10) / 10 : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {favoriteMovies.length > 0 ? new Date().getFullYear() - Math.round(favoriteMovies.reduce((acc, movie) => acc + movie.year, 0) / favoriteMovies.length) : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Age (Years)</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {favoriteMovies.reduce((genres, movie) => {
                movie.genres?.forEach(genre => {
                  genres.add(genre);
                });
                return genres;
              }, new Set()).size}
            </div>
            <div className="text-sm text-gray-600">Unique Genres</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;