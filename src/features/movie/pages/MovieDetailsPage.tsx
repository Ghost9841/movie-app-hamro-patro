import type { YtsMovie } from "@/types";
import { ArrowLeft, Calendar, Clock, Heart, Play, Star } from "lucide-react";


interface MovieDetailProps{
  movie: YtsMovie; // Replace MovieType with the actual type or interface
  onBack: () => void;
   onToggleFavorite: (movie: YtsMovie) => void; // Update the function to accept an argument
  isFavorite: boolean;
}
const MovieDetail = ({ movie, onBack, onToggleFavorite, isFavorite }:MovieDetailProps) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
        >
          <img
            src={movie.background_image_original || movie.large_cover_image}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x900/374151/9CA3AF?text=No+Image';
            }}
          />
         
        </div>
        
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="lg:w-1/3">
            <img
              src={movie.large_cover_image}
              alt={movie.title}
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x900/374151/9CA3AF?text=No+Image';
              }}
            />
          </div>

          {/* Details */}
          <div className="lg:w-2/3 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{movie.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{movie.runtime} min</span>
              </div>
              {movie.language && (
                <span className="text-gray-300 uppercase">{movie.language}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map(genre => (
                <span key={genre} className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            {movie.director && (
              <div className="mb-4">
                <span className="text-gray-400">Directed by: </span>
                <span className="text-white font-semibold">{movie.director}</span>
              </div>
            )}

            <div className="flex gap-4 mb-6">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button
                onClick={() => onToggleFavorite(movie)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFavorite 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Plot Summary</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.description_full || movie.summary || 'No description available.'}
              </p>
            </div>

            {movie.torrents && movie.torrents.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-3">Available Qualities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.torrents.map((torrent, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{torrent.quality}</span>
                        <span className="text-gray-400">{torrent.size}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <div>Seeds: {torrent.seeds} | Peers: {torrent.peers}</div>
                        <div>Codec: {torrent.video_codec}</div>
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
  );
};


export default MovieDetail;