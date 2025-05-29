import React, { useState, useEffect } from 'react';

import ytsApi from '@/services/Axios'; // Import the Axios instance
import type { YtsApiResponse, YtsMovie } from '../types/MovieList';
import type { AxiosResponse } from 'axios';


type Props = {};

const MovieListPage: React.FC<Props> = () => {
  const [movies, setMovies] = useState<YtsMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const moviesPerPage = 10; // Matches YTS API default limit

  // Fetch movies from YTS API
  const fetchMovies = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<YtsApiResponse> = await ytsApi.get('list_movies.json', {
        params: { page, limit: moviesPerPage },
      });
      const { data } = response.data;
      setMovies(data.movies);
      setTotalPages(Math.ceil(data.movie_count / data.limit));
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when page changes
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Movies</h1>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={() => fetchMovies(currentPage)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Movie List */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={movie.medium_cover_image}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {movie.title_long}
                    </h3>
                    <p className="text-gray-600 text-sm">Year: {movie.year}</p>
                    <p className="text-gray-600 text-sm flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      Rating: {movie.rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;