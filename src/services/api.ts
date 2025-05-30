import type { YtsApiResponse, YtsMovie } from "@/types";

class YtsApiService {
  private baseURL = 'https://yts.mx/api/v2';

  async fetchMovies(page = 1, limit = 20, searchTerm = '', genre = ''): Promise<YtsApiResponse> {
    try {
      let url = `${this.baseURL}/list_movies.json?page=${page}&limit=${limit}`;
      
      if (searchTerm) {
        url += `&query_term=${encodeURIComponent(searchTerm)}`;
      }
      
      if (genre) {
        url += `&genre=${encodeURIComponent(genre)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async fetchMovieDetails(movieId: number): Promise<YtsMovie> {
    try {
      const url = `${this.baseURL}/movie_details.json?movie_id=${movieId}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data.movie;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

export const apiService = new YtsApiService();