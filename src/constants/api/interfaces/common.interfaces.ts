export interface Image {
  quality: string;
  url: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  type: string;
  image: Image[];
  url: string;
}

export interface ArtistGroup {
  primary: Artist[];
  featured: Artist[];
  all: Artist[];
}

export interface Album {
  id: string | null;
  name: string | null;
  url: string | null;
}

export interface Lyrics {
  lyrics: string;
  copyright: string;
  snippet: string;
}

// Common API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
