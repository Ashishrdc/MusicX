import { Artist } from "./artist";

export interface ArtistData {
  total: number;
  start: number;
  results: Artist[];
}
