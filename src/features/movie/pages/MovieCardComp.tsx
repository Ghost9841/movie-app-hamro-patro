import { Heart, Play, Star } from "lucide-react";


interface MovieCardProps {
    movie: {
        medium_cover_image: string;
        title: string;
        year: number;
        rating: number;
        genres: string[];
        summary: string;
    };
    isFavorite: boolean;
    onSelect: (movie: any) => void;
    onToggleFavorite: (movie: any) => void;
}
const MovieCard = ({ movie, onSelect, onToggleFavorite, isFavorite }: MovieCardProps) => {
    return (
        <div className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
            <div onClick={() => onSelect(movie)} className="relative">
                <img
                    src={movie.medium_cover_image}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
                    }}
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2 truncate">{movie.title}</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">{movie.year}</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{movie.rating}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genres.slice(0, 2).map(genre => (
                        <span key={genre} className="px-2 py-1 bg-blue-600 text-xs rounded-full text-white">
                            {genre}
                        </span>
                    ))}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(movie);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${isFavorite ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;