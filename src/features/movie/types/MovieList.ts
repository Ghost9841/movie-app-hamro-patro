// Root interface for the entire API response
export interface YtsApiResponse {
  status: string; // e.g., "ok"
  status_message: string; // e.g., "Query was successful"
  data: YtsData;
  '@meta': YtsMeta;
}

// export Interface for the 'data' object
export interface YtsData {
  movie_count: number; // e.g., 68142
  limit: number; // e.g., 20
  page_number: number; // e.g., 1
  movies: YtsMovie[];
}

// export Interface for each movie in the 'movies' array
export interface YtsMovie {
  id: number; // e.g., 69354
  url: string; // e.g., "https://yts.mx/movies/ariel-1988"
  imdb_code: string; // e.g., "tt0094675"
  title: string; // e.g., "Ariel"
   director: string
  title_english: string; // e.g., "Ariel"
  title_long: string; // e.g., "Ariel (1988)"
  slug: string; // e.g., "ariel-1988"
  year: number; // e.g., 1988
  rating: number; // e.g., 7.4
  runtime: number; // e.g., 72
  genres: string[]; // e.g., ["Comedy", "Crime", "Drama", "Romance"]
  summary: string; // e.g., ""
  description_full: string; // e.g., ""
  synopsis: string; // e.g., ""
  yt_trailer_code: string; // e.g., ""
  language: string; // e.g., "fi"
  mpa_rating: string; // e.g., ""
  background_image: string; // e.g., "https://yts.mx/assets/images/movies/ariel_1988/background.jpg"
  background_image_original: string; // e.g., "https://yts.mx/assets/images/movies/ariel_1988/background.jpg"
  small_cover_image: string; // e.g., "https://yts.mx/assets/images/movies/ariel_1988/small-cover.jpg"
  medium_cover_image: string; // e.g., "https://yts.mx/assets/images/movies/ariel_1988/medium-cover.jpg"
  large_cover_image: string; // e.g., "https://yts.mx/assets/images/movies/ariel_1988/large-cover.jpg"
  state: string; // e.g., "ok"
  torrents: YtsTorrent[];
  date_uploaded: string; // e.g., "2025-05-29 14:17:02"
  date_uploaded_unix: number; // e.g., 1748521022
}

// export Interface for each torrent in the 'torrents' array
export interface YtsTorrent {
  url: string; // e.g., "https://yts.mx/torrent/download/AD8593570A9400228308051F56B001E19ABDF643"
  hash: string; // e.g., "AD8593570A9400228308051F56B001E19ABDF643"
  quality: string; // e.g., "720p"
  type: string; // e.g., "bluray"
  is_repack: string; // e.g., "0"
  video_codec: string; // e.g., "x264"
  bit_depth: string; // e.g., "8"
  audio_channels: string; // e.g., "2.0"
  seeds: number; // e.g., 0
  peers: number; // e.g., 0
  size: string; // e.g., "665.87 MB"
  size_bytes: number; // e.g., 698215301
  date_uploaded: string; // e.g., "2025-05-29 14:17:02"
  date_uploaded_unix: number; // e.g., 1748521022
}

// Interface for the '@meta' object
interface YtsMeta {
  server_time: number; // e.g., 1748532323
  server_timezone: string; // e.g., "CET"
  api_version: number; // e.g., 2
  execution_time: string; // e.g., "0 ms"
}