import React, { useState, useEffect } from 'react';
import axios, { type AxiosResponse } from 'axios';
import ytsApi from '@/services/Axios';
import { type YtsApiResponse, type YtsMovie } from '../types/MovieTypes';
import Navbar from '@/features/NavBar/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  searchQuery: string;
}

const MovieListPage: React.FC<Props> = ({ searchQuery }) => {
  const [movies, setMovies] = useState<YtsMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const moviesPerPage = 20;

  const fetchMovies = async (page: number, query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<YtsApiResponse> = await ytsApi.get('list_movies.json', {
        params: { page, limit: moviesPerPage, query_term: query || undefined },
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

  useEffect(() => {
    setCurrentPage(1);
    fetchMovies(1, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies(currentPage, searchQuery);
  }, [currentPage]);

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
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={(query) => fetchMovies(1, query)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg">{error}</p>
            <Button
              onClick={() => fetchMovies(currentPage, searchQuery)}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
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
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center items-center mt-8 space-x-4">
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                variant={currentPage === 1 ? 'secondary' : 'default'}
                className="transition-colors"
              >
                Previous
              </Button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                variant={currentPage === totalPages ? 'secondary' : 'default'}
                className="transition-colors"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListPage;