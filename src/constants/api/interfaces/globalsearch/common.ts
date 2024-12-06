import { Image } from "../common.interfaces";

// Global Search Album
export interface Album {
  id: string;
  title: string;
  image: Image[];
  artist: string;
  url: string;
  type: string;
  description: string;
  year: string;
  language: string;
  songIds: string;
}

export interface AlbumResults {
  results: Album[];
  position: number;
}

// Global Search Song
export interface Song {
  id: string;
  title: string;
  image: Image[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
}

export interface SongResults {
  results: Song[];
  position: number;
}

// Global Search Artist
export interface Artist {
  id: string;
  title: string;
  image: Image[];
  type: string;
  description: string;
  position: number;
}

export interface ArtistResults {
  results: Artist[];
  position: number;
}

// Global Search Playlist
export interface Playlist {
  id: string;
  title: string;
  image: Image[];
  url: string;
  language: string;
  type: string;
  description: string;
}

export interface PlaylistResults {
  results: Playlist[];
  position: number;
}

// Global Search TopQuery
export interface TopQuery {
  id: string;
  title: string;
  image: Image[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
}

export interface TopQueryResults {
  results: TopQuery[];
  position: number;
}
