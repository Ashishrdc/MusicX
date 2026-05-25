{/* Modified by Yugant N (05-2026), new attributes added */}

import { createContext, useContext } from "react";
import { Song } from "../../constants/api/interfaces/song";
import { RepeatMode } from "../../constants/types/common.types";

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

interface PlayerContextType {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  currentSong: Song | null;
  isPlaying: boolean;
  repeatMode: RepeatMode;
  volume: number;
  queue: Song[];
  playlists: Playlist[];
  currentTime: number;
  duration: number;
  dominantColor: string | null;
  history: Song[];
  setQueue: React.Dispatch<React.SetStateAction<Song[]>>;
  setCurrentTime: (time: number) => void;
  setCurrentSong: (song: Song) => void;
  setAndPlaySong: (song: Song) => void;
  toggleRepeatMode: () => void;
  play: () => void;
  pause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setVolume: (volume: number) => void;
  createPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
  removeFromQueue: (songId: string) => void;
  getNextSong: () => Song | string;
  stopAndClose: () => void;
  renamePlaylist: (playlistId: string, newName: string) => void;
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