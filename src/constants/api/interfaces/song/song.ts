import { Artist, Lyrics, Album, Image } from "../common.interfaces";

export interface Song {
  id: string;
  name: string;
  type: string;
  year: string;
  releaseDate: string;
  duration: number;
  label: string;
  explicitContent: boolean;
  playCount: number;
  language: string;
  hasLyrics: boolean;
  lyricsId: string;
  lyrics: Lyrics;
  url: string;
  copyright: string;
  album: Album;
  artists: {
    primary: Artist[];
    featured: Artist[];
    all: Artist[];
  };
  image: Image[];
  downloadUrl: Image[];
}
