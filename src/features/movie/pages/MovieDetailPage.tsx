// MovieDetail.tsx
import React, { useState, useEffect } from 'react';
import { type AxiosResponse } from 'axios';
import ytsApi from '@/services/Axios';
import { type YtsMovie, type YtsApiResponse } from '@/features/movie/types/MovieTypes';

interface MovieDetailProps {
  movieId: number;
  onBack: () => void;
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  movieId,
  onBack,
  favorites,
  onToggleFavorite,
}) => {
  const [movie, setMovie] = useState<YtsMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<YtsApiResponse> = await ytsApi.get('movie_details.json', {
        params: { movie_id: id, with_images: true, with_cast: true },
      });
      
      const { data } = response.data;
      setMovie(data.movies[0] || null); // Assuming the API returns an array of moviesmovies);
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
      console.error('Fetch movie detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail(movieId);
  }, [movieId]);

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
        <div className="space-x-4 mt-4">
          <button
            onClick={() => fetchMovieDetail(movieId)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>Movie not found.</p>
        <button
          onClick={onBack}
          className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center"
      >
        ← Back to Movies
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hero Section with Background */}
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${
              movie.background_image || movie.large_cover_image
            })`,
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="flex items-center space-x-8">
                <img
                  src={movie.large_cover_image}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-lg"
                />
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{movie.title_long}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-lg">⭐ {movie.rating}/10</span>
                    <span className="text-lg">{movie.year}</span>
                    <span className="text-lg">{movie.runtime} min</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onToggleFavorite(movie.id)}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      favorites.includes(movie.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {favorites.includes(movie.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {movie.description_full || movie.summary || 'No description available.'}
              </p>

              {/* Movie Info */}
              <div className="space-y-3">
                {movie.director && (
                  <div className="flex">
                    <span className="font-semibold w-24">Director:</span>
                    <span className="text-gray-700">{movie.director}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="font-semibold w-24">Language:</span>
                  <span className="text-gray-700">{movie.language}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">Rating:</span>
                  <span className="text-gray-700">{movie.mpa_rating || 'Not Rated'}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">IMDB:</span>
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {movie.imdb_code}
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info & Trailer */}
            <div>
              {movie.yt_trailer_code && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Trailer</h3>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Torrent Quality Info */}
              {movie.torrents && movie.torrents.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Available Qualities</h3>
                  <div className="space-y-2">
                    {movie.torrents.map((torrent, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded">
                        <div>
                          <span className="font-semibold">{torrent.quality}</span>
                          <span className="text-gray-600 ml-2">({torrent.size})</span>
                          <span className="text-gray-500 ml-2 text-sm">{torrent.type}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Seeds: {torrent.seeds} | Peers: {torrent.peers}</div>
                          <div className="text-xs">
                            {torrent.video_codec} • {torrent.audio_channels} • {torrent.bit_depth}bit
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;