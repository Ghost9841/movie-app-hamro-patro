import { Bookmark, Home, Search } from "lucide-react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}
export const Navbar = ({ currentView, onNavigate, searchTerm, onSearch, selectedGenre, onGenreChange }:NavbarProps) => {
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Adventure', 'Crime'];

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-blue-400 cursor-pointer" onClick={() => onNavigate('home')}>
            MovieHub
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={() => onNavigate('favorites')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'favorites' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Favorites
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {genres.map(genre => (
              <option key={genre} value={genre === 'All' ? '' : genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};