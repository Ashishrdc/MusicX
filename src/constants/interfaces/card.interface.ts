import { Song } from "./song.interface";

export interface SongCardProps {
  song: Song;
  onPlay?: (song: Song) => void;
}
