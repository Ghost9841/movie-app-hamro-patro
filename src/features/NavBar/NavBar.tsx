import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react'; // Using lucide-react for the search icon
import type { AxiosResponse } from 'axios';
import type { YtsApiResponse } from '../movie/types/MovieTypes';
import ytsApi from '@/services/Axios';

const Navbar: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const moviesPerPage = 20;
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const fetchMovies = async (page: number, query?: string) => {
        // ... existing logic
        const response: AxiosResponse<YtsApiResponse> = await ytsApi.get('list_movies.json', {
            params: { page, limit: moviesPerPage, query_term: query },
        });
        // ... rest of the logic
    };

    useEffect(() => {
        fetchMovies(currentPage, searchQuery);
    }, [currentPage, searchQuery]);
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
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="bg-white text-black placeholder-gray-500 rounded-full py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
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