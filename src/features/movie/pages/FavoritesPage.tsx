import { Heart } from "lucide-react";
import MovieCard from "./MovieCardComp";
import type { YtsMovie } from "@/types";

interface FavoritesProps{
    favorites: YtsMovie[];
    onSelectMovie: (movie: YtsMovie) => void;
    onToggleFavorite: (movie: YtsMovie) => void;
}

const FavoritesPage = ({ favorites, onSelectMovie, onToggleFavorite }:FavoritesProps) => {
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">No Favorites Yet</h2>
          <p className="text-gray-400 text-lg">
            Start adding movies to your favorites to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites ({favorites.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;