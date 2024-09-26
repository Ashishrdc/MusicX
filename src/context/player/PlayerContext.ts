import { createContext, useContext } from "react";
import { Song } from "../../constants/interfaces/song.interface";
import { RepeatMode } from "../../constants/types/common.types";

interface PlayerContextType {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  currentSong: Song | null;
  isPlaying: boolean;
  repeatMode: RepeatMode;
  volume: number;
  queue: Song[];
  playlist: Song[];
  currentTime: number; // Added
  duration: number; // Added
  setCurrentTime: (time: number) => void; // Added
  setCurrentSong: (song: Song) => void;
  setAndPlaySong: (song: Song) => void;
  toggleRepeatMode: () => void;
  play: () => void;
  pause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setVolume: (volume: number) => void;
  addToPlaylist: (song: Song) => void;
  setPlaylist?: (songs: Song[]) => void;
  removeFromPlaylist: (songId: string) => void;
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
  removeFromQueue: (songId: string) => void;
  getNextSong: () => Song | string;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
