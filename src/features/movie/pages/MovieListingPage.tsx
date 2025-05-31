
import { ErrorMessage, LoadingSpinner } from "../components/ui/LoadingScreen";
import { Film, Loader2, } from 'lucide-react';
import MovieCard from "./MovieCardComp";
import type { YtsMovie } from "@/types";

interface MovieListingProps {
    movies: YtsMovie[];
    isFavorite: boolean;
    onSelectMovie: (movie: any) => void;
    onToggleFavorite: (movie: any) => void;
    hasMore: boolean;
    loading: boolean; // Add this line
    error: any; // Also add this line for the 'error' property
    favorites: any; // And this line for the 'favorites' property
    onLoadMore: any; // And this line for the 'onLoadMore' property
    currentPage: any; // And this line for the 'currentPage' property
}
const MovieListing = ({ movies, loading, error, onSelectMovie, onToggleFavorite, favorites, onLoadMore, hasMore, }: MovieListingProps) => {
    if (loading && movies.length === 0) {
        return <LoadingSpinner />;
    }

    if (error && movies.length === 0) {
        return <ErrorMessage message={error} />;
    }

    if (movies.length === 0) {
        return (
            <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No movies found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onSelect={onSelectMovie}
                        onToggleFavorite={onToggleFavorite}
                        isFavorite={favorites.some((fav: { id: any; }) => fav.id === movie.id)}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="text-center mt-8">
                    <button
                        onClick={onLoadMore}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Load More Movies'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieListing;