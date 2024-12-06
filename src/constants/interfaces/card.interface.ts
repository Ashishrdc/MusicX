import { Song } from "../api/interfaces/song";

export interface SongCardProps {
  song: Song;
  onPlay?: (song: Song) => void;
}
