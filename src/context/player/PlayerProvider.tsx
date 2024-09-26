import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { PlayerContext } from "./PlayerContext";
import { RepeatMode } from "../../constants/types/common.types";
import { Song } from "../../constants/interfaces/song.interface";

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // States
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //-----------------------------Functions--------------------------------//
  // Helper function for safe playback
  const safePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
      });
    }
  };

  // Playback Controls
  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Helper function to set the current song and ensure it's in the queue
  const setAndPlaySong = useCallback(
    (song: Song) => {
      // Check if the song is already in the queue
      const songInQueue = queue.some((queuedSong) => queuedSong.id === song.id);

      // Add to queue if it's not already there
      if (!songInQueue) {
        setQueue((prevQueue) => [...prevQueue, song]);
      }

      // Set as the current song and play it
      setCurrentSong(song);
    },
    [queue]
  );

  // Play Next Song with queue handling
  const playNext = useCallback(() => {
    if (!queue.length) return; // No songs in queue
    const currentIndex = currentSong
      ? queue.findIndex((song) => song.id === currentSong.id)
      : -1;

    if (repeatMode === "one") {
      safePlay(); // Replay the current song
    } else if (currentIndex === -1 || currentIndex === queue.length - 1) {
      if (repeatMode === "all") {
        setAndPlaySong(queue[0]); // Loop back to the start of the queue
      } else {
        setIsPlaying(false); // Stop playback if no more songs and repeatMode is off
        audioRef.current?.pause();
      }
    } else {
      setAndPlaySong(queue[currentIndex + 1]); // Play the next song
    }
  }, [queue, currentSong, repeatMode, setAndPlaySong]);

  // Play Previous Song
  const playPrevious = useCallback(() => {
    if (!queue.length || !currentSong) return;
    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);

    if (currentIndex > 0) {
      setAndPlaySong(queue[currentIndex - 1]); // Play the previous song
    } else if (repeatMode === "all") {
      setAndPlaySong(queue[queue.length - 1]); // Loop back to the last song
    } else {
      pause(); // No more previous songs, stop playing
    }
  }, [queue, currentSong, repeatMode, setAndPlaySong, pause]);

  // Handle song end
  const handleSongEnd = useCallback(() => {
    if (repeatMode === "one") {
      safePlay(); // Replay the current song
    } else {
      playNext(); // Play the next song in the queue or stop based on repeatMode
    }
  }, [playNext, repeatMode]);

  // Playlist functions
  const addToPlaylist = useCallback(
    (song: Song) => setPlaylist([...playlist, song]),
    [playlist]
  );
  const removeFromPlaylist = useCallback(
    (songId: string) =>
      setPlaylist(playlist.filter((song) => song.id !== songId)),
    [playlist]
  );

  // Queue functions
  const addToQueue = useCallback(
    (song: Song) => setQueue([...queue, song]),
    [queue]
  );
  const removeFromQueue = useCallback(
    (songId: string) => setQueue(queue.filter((song) => song.id !== songId)),
    [queue]
  );
  const clearQueue = () => setQueue([]);

  // ---------------------Toggles---------------------- //

  // Toggle repeat mode (off -> one -> all -> off)
  const toggleRepeatMode = () => {
    setRepeatMode((prevMode) => {
      switch (prevMode) {
        case "off":
          return "one";
        case "one":
          return "all";
        case "all":
          return "off";
        default:
          return "off";
      }
    });
  };

  // --------------------SideEffects ------------------//

  // Volume Control
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Attach "ended" event listener to handleSongEnd
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleSongEnd);
      return () => {
        audio.removeEventListener("ended", handleSongEnd);
      };
    }
  }, [handleSongEnd]);

  // Automatically play when a new song is set
  // Update currentTime and duration on song change
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.downloadUrl[4].url;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(currentSong.duration || audioRef.current.duration);
      safePlay();
      play();
    }
  }, [currentSong, play]);

  // Update currentTime on timeupdate
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  // Play or Pause the playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Error playing audio: ", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const getNextSong = useCallback(() => {
    if (!queue.length || !currentSong) {
      return "End of list";
    }

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);

    // If repeatMode is "one", repeat the current song
    if (repeatMode === "one") {
      return "Repeating current song";
    }

    // If repeatMode is "off" and the current song is the last in the queue
    if (repeatMode === "off" && currentIndex === queue.length - 1) {
      return "End of list";
    }

    // If repeatMode is "all" and the current song is the last, loop back to the first song
    if (repeatMode === "all" && currentIndex === queue.length - 1) {
      return queue[0]; // Return the first song in the queue
    }

    // Return the next song in the queue if available
    return queue[currentIndex + 1] || "End of list";
  }, [queue, currentSong, repeatMode]);

  // Save playlist and queue to localStorage
  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("queue", JSON.stringify(queue));
  }, [playlist, queue]);

  // Load playlist and queue from localStorage on mount
  useEffect(() => {
    const savedPlaylist = localStorage.getItem("playlist");
    const savedQueue = localStorage.getItem("queue");
    if (savedPlaylist) setPlaylist(JSON.parse(savedPlaylist));
    if (savedQueue) setQueue(JSON.parse(savedQueue));
  }, []);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      audioRef,
      currentSong,
      isPlaying,
      repeatMode,
      volume,
      playlist,
      queue,
      currentTime,
      duration,
      toggleRepeatMode,
      setCurrentSong,
      setAndPlaySong,
      setCurrentTime,
      play,
      pause,
      playNext,
      playPrevious,
      setVolume,
      addToPlaylist,
      removeFromPlaylist,
      addToQueue,
      clearQueue,
      removeFromQueue,
      getNextSong,
    }),
    [
      currentSong,
      isPlaying,
      repeatMode,
      volume,
      playlist,
      queue,
      currentTime,
      duration,
      play,
      pause,
      playNext,
      playPrevious,
      setVolume,
      addToPlaylist,
      removeFromPlaylist,
      addToQueue,
      removeFromQueue,
      setAndPlaySong,
      getNextSong,
    ]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
};
