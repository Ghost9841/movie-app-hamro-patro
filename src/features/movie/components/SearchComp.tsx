import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, type SetStateAction } from "react"

const mockMovies = [
    {
        id: 1,
        title: "The Dark Knight",
        genre: "Action",
        year: 2008,
        rating: 9.0,
        posterUrl: "https://images.unsplash.com/photo-1489599162475-ba04fe5fa136?w=300&h=400&fit=crop",
    },
    {
        id: 2,
        title: "Inception",
        genre: "Sci-Fi",
        year: 2010,
        rating: 8.8,
        posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop",
    },
    {
        id: 3,
        title: "Pulp Fiction",
        genre: "Crime",
        year: 1994,
        rating: 8.9,
        posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        genre: "Drama",
        year: 1994,
        rating: 9.3,
        posterUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=400&fit=crop",
    },
    {
        id: 5,
        title: "Forrest Gump",
        genre: "Drama",
        year: 1994,
        rating: 8.8,
        posterUrl: "https://images.unsplash.com/photo-1489599162475-ba04fe5fa136?w=300&h=400&fit=crop",
    },
    {
        id: 6,
        title: "The Matrix",
        genre: "Sci-Fi",
        year: 1999,
        rating: 8.7,
        posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop",
    },
    {
        id: 7,
        title: "Goodfellas",
        genre: "Crime",
        year: 1990,
        rating: 8.7,
        posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
    },
    {
        id: 8,
        title: "The Godfather",
        genre: "Crime",
        year: 1972,
        rating: 9.2,
        posterUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=400&fit=crop",
    },
    {
        id: 9,
        title: "Interstellar",
        genre: "Sci-Fi",
        year: 2014,
        rating: 8.6,
        posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop",
    },
    {
        id: 10,
        title: "Fight Club",
        genre: "Drama",
        year: 1999,
        rating: 8.8,
        posterUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=400&fit=crop",
    },
    {
        id: 11,
        title: "The Avengers",
        genre: "Action",
        year: 2012,
        rating: 8.0,
        posterUrl: "https://images.unsplash.com/photo-1489599162475-ba04fe5fa136?w=300&h=400&fit=crop",
    },
    {
        id: 12,
        title: "Titanic",
        genre: "Romance",
        year: 1997,
        rating: 7.9,
        posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop",
    },
    {
        id: 13,
        title: "The Lion King",
        genre: "Animation",
        year: 1994,
        rating: 8.5,
        posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
    },
    {
        id: 14,
        title: "Jurassic Park",
        genre: "Adventure",
        year: 1993,
        rating: 8.1,
        posterUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=400&fit=crop",
    },
    {
        id: 15,
        title: "Star Wars",
        genre: "Sci-Fi",
        year: 1977,
        rating: 8.6,
        posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop",
    },
    {
        id: 16,
        title: "The Silence of the Lambs",
        genre: "Thriller",
        year: 1991,
        rating: 8.6,
        posterUrl: "https://images.unsplash.com/photo-1489599162475-ba04fe5fa136?w=300&h=400&fit=crop",
    },
]

const SearchComp = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)

    // Filter movies based on search term and genre
    const filteredMovies = mockMovies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre
        return matchesSearch && matchesGenre
    })

    // Calcul
    const handleSearchChange = (value: SetStateAction<string>) => {
        setSearchTerm(value)
        setCurrentPage(1)
    }



    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
    )
}

export default SearchComp

