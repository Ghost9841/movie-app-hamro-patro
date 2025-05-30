import type { YtsMovie } from "@/types";

class StorageService {
  private favoritesKey = 'movie-favorites';

  getFavorites(): YtsMovie[] {
    try {
      const stored = localStorage.getItem(this.favoritesKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  addFavorite(movie: YtsMovie): void {
    try {
      const favorites = this.getFavorites();
      const exists = favorites.find(fav => fav.id === movie.id);
      
      if (!exists) {
        favorites.push(movie);
        localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }

  removeFavorite(movieId: number): void {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(fav => fav.id !== movieId);
      localStorage.setItem(this.favoritesKey, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }

  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === movieId);
  }
}

export const storageService = new StorageService();