// MovieListing.tsx
import React, { useState, useEffect } from 'react';
import { type AxiosResponse } from 'axios';
import ytsApi from '@/services/Axios';
import { type YtsMovie, type YtsApiResponse } from '@/features/movie/types/MovieTypes';

interface MovieListingProps {
  onMovieClick: (movieId: number) => void;
  searchTerm: string;
  selectedGenre: string;
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

const MovieListing: React.FC<MovieListingProps> = ({
  onMovieClick,
  searchTerm,
  selectedGenre,
  favorites,
  onToggleFavorite,
}) => {
  const [movies, setMovies] = useState<YtsMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const moviesPerPage = 10;

  const fetchMovies = async (page: number, query?: string, genre?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params: any = { 
        page, 
        limit: moviesPerPage 
      };
      
      if (query && query.trim()) {
        params.query_term = query.trim();
      }
      
      if (genre && genre !== 'all') {
        params.genre = genre;
      }

      const response: AxiosResponse<YtsApiResponse> = await ytsApi.get('list_movies.json', {
        params,
      });
      
      const { data } = response.data;
      setMovies(data.movies || []);
      setTotalPages(Math.ceil(data.movie_count / data.limit));
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error('Fetch error:', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when page, search term, or genre changes
  useEffect(() => {
    fetchMovies(currentPage, searchTerm, selectedGenre);
  }, [currentPage, searchTerm, selectedGenre]);

  // Reset to page 1 when search term or genre changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, selectedGenre]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button
          onClick={() => fetchMovies(currentPage, searchTerm, selectedGenre)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={movie.medium_cover_image}
                alt={movie.title}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => onMovieClick(movie.id)}
              />
              <button
                onClick={() => onToggleFavorite(movie.id)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  favorites.includes(movie.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600'
                } hover:scale-110 transition-transform`}
              >
                ❤️
              </button>
            </div>
            <div className="p-4">
              <h3
                className="font-semibold text-sm mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
                onClick={() => onMovieClick(movie.id)}
              >
                {movie.title}
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{movie.year}</span>
                <span className="flex items-center">
                  ⭐ {movie.rating}/10
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieListing;