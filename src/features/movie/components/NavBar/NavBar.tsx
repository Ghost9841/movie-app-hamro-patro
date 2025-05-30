import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-10">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <span className="text-red-500 text-lg">•</span>
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Genre</a>
        <a href="#" className="hover:text-gray-300">Country</a>
      </div>

      {/* Center Section - Search */}
      <div className="flex items-center">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-white text-black placeholder-gray-500 rounded-full py-2 px-4 pl-10 w-64 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-gray-300">Movies</a>
        <a href="#" className="hover:text-gray-300">Series</a>
        <a href="#" className="hover:text-gray-300">Animation</a>
        <a href="#" className="hover:text-gray-300 flex items-center">
          Login/Signup
          <span className="w-4 h-4 bg-white rounded-full ml-1"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;