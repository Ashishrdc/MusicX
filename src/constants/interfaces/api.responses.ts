import { Song } from "./song.interface";

export interface SongsApiResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  total: number;
  start: number;
  results: Song[];
}

export interface LyricsApiResponse {
  success: boolean;
  data: LyricsData;
}

export interface LyricsData {
  lyrics: string;
  snippet: string;
  copyright: string;
}
