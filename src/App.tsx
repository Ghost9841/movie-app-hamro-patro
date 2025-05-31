import { useEffect, useMemo, useState, type SetStateAction, } from "react";
import { storageService } from "./services/storage";
import { apiService } from "./services/api";
import { type YtsMovie } from "./types";
import { Navbar } from "./features/movie/components/NavBar/NavBar";
import MovieListing from "./features/movie/pages/MovieListingPage";
import HeroCarousel from "./features/movie/components/HeroCarousel/HeroCarousel";
import FavoritesPage from "./features/movie/pages/FavoritesPage";
import MovieDetail from "./features/movie/pages/MovieDetailsPage";

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState<YtsMovie>();
  const [movies, setMovies] = useState<YtsMovie[]>([]);
  const [favorites, setFavorites] = useState<YtsMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalMovies, setTotalMovies] = useState(0);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setFavorites(storageService.getFavorites());
  }, []);

  // Fetch movies
  const fetchMovies = async (page = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.fetchMovies(page, 20, searchTerm, selectedGenre);

      if (response.status === 'ok' && response.data.movies) {
        const newMovies = response.data.movies;

        if (append) {
          setMovies((prev: YtsMovie[]) => [...prev, ...newMovies]);
        } else {
          setMovies(newMovies);
        }

        setTotalMovies(response.data.movie_count);
        setHasMore(newMovies.length === 20 && movies.length + newMovies.length < response.data.movie_count);
      } else {
        setMovies([]);
        setHasMore(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to fetch movies');
      } else {
        setError('An unknown error occurred');
      }
      if (!append) {
        setMovies([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial load and search/filter effects
  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
    setHasMore(true);
    fetchMovies(1, false);
  }, [searchTerm, selectedGenre]);

  // Handle navigation
  const handleNavigate = (view: SetStateAction<string>) => {
    setCurrentView(view);
    setSelectedMovie(movies.length > 0 ? movies[0] ?? undefined : undefined);
  };

  // Handle movie selection
  const handleSelectMovie = async (movie: YtsMovie) => {
    try {
      setLoading(true);
      const detailedMovie = await apiService.fetchMovieDetails(movie.id);
      setSelectedMovie(() => detailedMovie);
      setCurrentView('detail');
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
      setSelectedMovie(movie);
      setCurrentView('detail');
    } finally {
      setLoading(false);
    }
  };

  // Handle favorite toggle
  const handleToggleFavorite = (movie: YtsMovie) => {
    const isFav = storageService.isFavorite(movie.id);

    if (isFav) {
      storageService.removeFavorite(movie.id);
    } else {
      storageService.addFavorite(movie);
    }

    setFavorites(storageService.getFavorites());
  };

  // Handle load more
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(nextPage, true);
  };

  // Handle back navigation
  const handleBack = () => {
    setSelectedMovie(undefined);
    setCurrentView('home');
  };

  // Featured movies for hero carousel
  const featuredMovies = useMemo(() => {
    return movies.filter(movie => movie.rating >= 5).slice(0, 5);
  }, [movies]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {currentView === 'detail' && selectedMovie ? (
        <MovieDetail
          movie={selectedMovie}
          onBack={handleBack}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={storageService.isFavorite(selectedMovie.id)}
        />
      ) : currentView === 'favorites' ? (
        <FavoritesPage
          favorites={favorites}
          onSelectMovie={handleSelectMovie}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <div className="bg-gray-900 min-h-screen">
          {featuredMovies.length > 0 && !searchTerm && !selectedGenre && (
            <HeroCarousel
              movies={featuredMovies}
              onSelectMovie={handleSelectMovie}
            />
          )}

          <MovieListing
                movies={movies}
                loading={loading}
                error={error}
                onSelectMovie={handleSelectMovie}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                currentPage={currentPage} isFavorite={false}          />
        </div>
      )}
    </div>
  );
};

export default App;