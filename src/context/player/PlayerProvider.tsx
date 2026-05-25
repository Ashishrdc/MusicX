{/* Modified by Yugant N (05-2026), New states and functions added */}

import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { PlayerContext, Playlist } from "./PlayerContext";
import { RepeatMode } from "../../constants/types/common.types";
import { Song } from "../../constants/api/interfaces/song";
import { getDominantColorFromImage } from "../../util/helperFunctions";
import he from "he";

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // -------------------------States-------------------------- //
  const [currentSong, setCurrentSong] = useState<Song | null>(() => {
    const saved = localStorage.getItem("currentSong");
    return saved ? JSON.parse(saved) : null;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [volume, setVolume] = useState<number>(1);
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem("playlists");
    return saved ? JSON.parse(saved) : [];
  });
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(() => {
    const saved = localStorage.getItem("currentTime");
    return saved ? parseFloat(saved) : 0;
  });
  const [duration, setDuration] = useState(0);
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [history, setHistory] = useState<Song[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // -------------------------Refs-------------------------- //
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstMount = useRef(true);
  const currentTimeRef = useRef(currentTime);

  // -------------------------Functions-------------------------- //

  const safePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
      });
    }
  };

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);

  const setAndPlaySong = useCallback(
    (song: Song) => {
      const songInQueue = queue.some((q) => q.id === song.id);
      if (!songInQueue) {
        setQueue((prev) => [...prev, song]);
      }
      setCurrentSong(song);
    },
    [queue]
  );

  const playNext = useCallback(() => {
    if (!queue.length) return;

    const currentIndex = currentSong
      ? queue.findIndex((song) => song.id === currentSong.id)
      : -1;

    if (repeatMode === "one") {
      if (currentIndex === -1 || currentIndex === queue.length - 1) return;
      setAndPlaySong(queue[currentIndex + 1]);
    } else if (currentIndex === -1 || currentIndex === queue.length - 1) {
      if (repeatMode === "all") {
        setAndPlaySong(queue[0]);
      } else {
        setIsPlaying(false);
        audioRef.current?.pause();
      }
    } else {
      setAndPlaySong(queue[currentIndex + 1]);
    }
  }, [queue, currentSong, repeatMode, setAndPlaySong]);

  const playPrevious = useCallback(() => {
    if (!queue.length || !currentSong) return;

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);

    if (repeatMode === "one") {
      if (currentIndex > 0) setAndPlaySong(queue[currentIndex - 1]);
    } else if (currentIndex > 0) {
      setAndPlaySong(queue[currentIndex - 1]);
    } else if (repeatMode === "all") {
      setAndPlaySong(queue[queue.length - 1]);
    } else {
      pause();
    }
  }, [queue, currentSong, repeatMode, setAndPlaySong, pause]);

  const handleSongEnd = useCallback(() => {
    if (repeatMode === "one") {
      safePlay();
    } else {
      playNext();
    }
  }, [playNext, repeatMode]);

  const getNextSong = useCallback(() => {
    if (!queue.length || !currentSong) return "End of list";

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id);

    if (repeatMode === "one") return "Repeating current song";
    if (repeatMode === "off" && currentIndex === queue.length - 1) return "End of list";
    if (repeatMode === "all" && currentIndex === queue.length - 1) return queue[0];

    return queue[currentIndex + 1] || "End of list";
  }, [queue, currentSong, repeatMode]);

  const addToQueue = useCallback(
    (song: Song) => setQueue((prev) => [...prev, song]),
    []
  );

  const removeFromQueue = useCallback(
    (songId: string) => setQueue((prev) => prev.filter((s) => s.id !== songId)),
    []
  );

  const clearQueue = useCallback(() => setQueue([]), []);

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = { id: Date.now().toString(), name, songs: [] };
    setPlaylists((prev) => [...prev, newPlaylist]);
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.songs.find((s) => s.id === song.id)
          ? { ...p, songs: [...p.songs, song] }
          : p
      )
    );
  }, []);

  const renamePlaylist = useCallback((playlistId: string, newName: string) => {
    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, name: newName } : p))
    );
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    );
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  }, []);

  const toggleRepeatMode = useCallback(() => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "off": return "one";
        case "one": return "all";
        case "all": return "off";
        default: return "off";
      }
    });
  }, []);

  const stopAndClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setCurrentTime(0);
    setDuration(0);
    localStorage.removeItem("currentSong");
    localStorage.removeItem("currentTime");
  }, []);

  // -------------------------Side Effects-------------------------- //

  // Volume control
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Song end listener
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleSongEnd);
      return () => audio.removeEventListener("ended", handleSongEnd);
    }
  }, [handleSongEnd]);

  // Load song into audio element — handles both first mount restore and normal song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isFirstMount.current) {
      // Restore session: load and seek to saved timestamp, but don't autoplay
      isFirstMount.current = false;
      audioRef.current.src = currentSong.downloadUrl[4].url;
      audioRef.current.load();
      setDuration(currentSong.duration || 0);

      const onCanPlay = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = currentTimeRef.current;
        }
      };
      audioRef.current.addEventListener("canplay", onCanPlay, { once: true });
      return;
    }

    // Normal song change: load, seek to 0, and autoplay
    audioRef.current.src = currentSong.downloadUrl[4].url;
    audioRef.current.load();
    setCurrentTime(0);
    currentTimeRef.current = 0;
    localStorage.setItem("currentTime", "0");
    setDuration(currentSong.duration || audioRef.current.duration);
    safePlay();
    play();
  }, [currentSong]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update history when song changes
  useEffect(() => {
    if (currentSong) {
      setHistory((prev) => {
        const exists = prev.find((s) => s.id === currentSong.id);
        if (exists) return prev;
        return [currentSong, ...prev].slice(0, 5);
      });
    }
  }, [currentSong]);

  // Track current time — update state and ref, save to localStorage every 5s
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      if (!audio) return;
      setCurrentTime(audio.currentTime);
      currentTimeRef.current = audio.currentTime;
    };

    const saveInterval = setInterval(() => {
      localStorage.setItem("currentTime", String(currentTimeRef.current));
    }, 5000);

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        clearInterval(saveInterval);
      };
    }
  }, []);

  // Save current time immediately before page unload
  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem("currentTime", String(currentTimeRef.current));
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // Play / Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Dominant color from album art
  useEffect(() => {
    if (currentSong?.image?.[1]?.url) {
      getDominantColorFromImage(currentSong.image[1].url)
        .then(setDominantColor)
        .catch((err) => console.error("Error fetching dominant color:", err));
    }
  }, [currentSong]);

  // Persist currentSong to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
    } else {
      localStorage.removeItem("currentSong");
    }
  }, [currentSong, isLoaded]);

  // Persist queue and history to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("queue", JSON.stringify(queue));
    localStorage.setItem("history", JSON.stringify(history));
  }, [queue, history, isLoaded]);

  // Persist playlists to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists, isLoaded]);

  // Load queue and history from localStorage on mount
  useEffect(() => {
    const savedQueue = localStorage.getItem("queue");
    const savedHistory = localStorage.getItem("history");
    if (savedQueue) setQueue(JSON.parse(savedQueue));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    setIsLoaded(true);
  }, []);

  // -------------------------Media Session-------------------------- //
  useEffect(() => {
    if (audioRef.current && currentSong && "mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: he.decode(currentSong.name),
        artist: currentSong.artists.primary.map((a) => he.decode(a.name)).join(", "),
        album: currentSong.album.name,
        artwork: [
          { src: currentSong.image[0]?.url, sizes: "96x96", type: "image/png" },
          { src: currentSong.image[0]?.url, sizes: "128x128", type: "image/png" },
          { src: currentSong.image[1]?.url, sizes: "192x192", type: "image/png" },
          { src: currentSong.image[2]?.url, sizes: "512x512", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", play);
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("previoustrack", playPrevious);
      navigator.mediaSession.setActionHandler("nexttrack", playNext);
      navigator.mediaSession.setActionHandler("seekforward", () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
        }
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
        }
      });

      return () => {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("previoustrack", null);
        navigator.mediaSession.setActionHandler("nexttrack", null);
        navigator.mediaSession.setActionHandler("seekforward", null);
        navigator.mediaSession.setActionHandler("seekbackward", null);
      };
    }
  }, [currentSong, play, pause, playNext, playPrevious]);

  // -------------------------Context Value-------------------------- //
  const contextValue = useMemo(
    () => ({
      audioRef,
      currentSong,
      isPlaying,
      repeatMode,
      volume,
      playlists,
      queue,
      setQueue,
      currentTime,
      duration,
      dominantColor,
      history,
      setCurrentTime,
      setCurrentSong,
      setAndPlaySong,
      toggleRepeatMode,
      play,
      pause,
      playNext,
      playPrevious,
      setVolume,
      createPlaylist,
      addSongToPlaylist,
      renamePlaylist,
      removeSongFromPlaylist,
      deletePlaylist,
      addToQueue,
      clearQueue,
      removeFromQueue,
      getNextSong,
      stopAndClose,
    }),
    [
      currentSong,
      isPlaying,
      repeatMode,
      volume,
      playlists,
      queue,
      currentTime,
      duration,
      dominantColor,
      history,
      play,
      pause,
      playNext,
      playPrevious,
      setAndPlaySong,
      createPlaylist,
      addSongToPlaylist,
      renamePlaylist,
      removeSongFromPlaylist,
      deletePlaylist,
      addToQueue,
      clearQueue,
      removeFromQueue,
      getNextSong,
      stopAndClose,
    ]
  );

  return (
    <PlayerContext.Provider value={contextValue}>
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
};