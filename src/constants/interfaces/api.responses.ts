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
