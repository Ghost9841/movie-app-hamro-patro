import type { YtsMovie } from '@/types';
import { Star, Play, Clock, } from 'lucide-react';
import { useEffect, useState, } from 'react';


interface HeroCarouselProps {
    movies: YtsMovie[];
    onSelectMovie: (movie: YtsMovie) => void; // Add this line
}

const HeroCarousel = ({ movies, onSelectMovie }: HeroCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [movies.length]);

    if (!movies.length) return null;

    const currentMovie = movies[currentIndex];

    return (
        <div className="relative h-96 lg:h-[500px] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(${currentMovie.medium_cover_image || currentMovie.large_cover_image})`
                }}
                key={currentMovie.id}
            >
            </div>

            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                            {currentMovie.title}
                        </h1>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-gray-300">{currentMovie.year}</span>
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="text-white">{currentMovie.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-5 h-5 text-gray-300" />
                                <span className="text-gray-300">{currentMovie.runtime} min</span>
                            </div>
                        </div>
                        <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                            {currentMovie.summary || currentMovie.description_full}
                        </p>
                        <button
                            onClick={() => onSelectMovie(currentMovie)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <Play className="w-5 h-5" />
                            Watch Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;