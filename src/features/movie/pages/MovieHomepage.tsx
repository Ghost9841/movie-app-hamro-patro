"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"


// Mock movie data
const mockMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "Pulp Fiction",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    title: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    rating: 8.8,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    title: "Goodfellas",
    genre: "Crime",
    year: 1990,
    rating: 8.7,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
    rating: 9.2,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 9,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 10,
    title: "Fight Club",
    genre: "Drama",
    year: 1999,
    rating: 8.8,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 11,
    title: "The Avengers",
    genre: "Action",
    year: 2012,
    rating: 8.0,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 12,
    title: "Titanic",
    genre: "Romance",
    year: 1997,
    rating: 7.9,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 13,
    title: "The Lion King",
    genre: "Animation",
    year: 1994,
    rating: 8.5,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 14,
    title: "Jurassic Park",
    genre: "Adventure",
    year: 1993,
    rating: 8.1,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 15,
    title: "Star Wars",
    genre: "Sci-Fi",
    year: 1977,
    rating: 8.6,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 16,
    title: "The Silence of the Lambs",
    genre: "Thriller",
    year: 1991,
    rating: 8.6,
    poster: "/placeholder.svg?height=400&width=300",
  },
]

const genres = ["All", "Action", "Adventure", "Animation", "Crime", "Drama", "Romance", "Sci-Fi", "Thriller"]

const MOVIES_PER_PAGE = 8

export default function MovieHomepage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter movies based on search term and genre
  const filteredMovies = mockMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
  const endIndex = startIndex + MOVIES_PER_PAGE
  const currentMovies = filteredMovies.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-primary">MovieFlix</h1>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={selectedGenre} onValueChange={handleGenreChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Movie Grid */}
      <main className="container mx-auto px-4 pb-8">
        {currentMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No movies found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {currentMovies.map((movie) => (
              <Card key={movie.id} className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      
                      className="object-cover transition-all group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                      ⭐ {movie.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">{movie.title}</h3>
                    <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                      <span>{movie.year}</span>
                      <span className="bg-secondary px-2 py-1 rounded text-xs">{movie.genre}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
