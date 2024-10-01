import { useEffect, useState, useCallback } from "react";
import { usePlayer } from "../../context/player/PlayerContext"; // Keep using the context
import { Box, Typography, Divider } from "@mui/material";
import axiosInstance from "../../util/axios/axiosInstance";
import { LyricsData } from "../../constants/interfaces/api.responses";

export const Lyrics = () => {
  const { currentSong } = usePlayer(); // Still using the PlayerContext here
  const [lyricsData, setLyricsData] = useState<LyricsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Callback to fetch lyrics
  const fetchLyrics = useCallback(async () => {
    if (currentSong && currentSong.hasLyrics) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<LyricsData>(
          `api/songs/${currentSong.id}/lyrics`
        );
        setLyricsData(response.data); // Ensure we're setting `data.data`
        console.log("Fetched lyrics data:", response.data);
      } catch (err) {
        console.error("Error fetching lyrics:", err);
        setError("Failed to load lyrics");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("No current song or no lyrics available.");
      setLyricsData(null); // Reset lyricsData if no current song
    }
  }, [currentSong]);

  // Fetch lyrics only when currentSong changes
  useEffect(() => {
    fetchLyrics();
  }, [currentSong, fetchLyrics]);

  // Loading state
  if (isLoading) return <Typography>Loading lyrics...</Typography>;

  // Error state
  if (error) return <Typography color="error">{error}</Typography>;

  // Check if lyricsData is undefined or null
  if (!lyricsData) return <Typography>No lyrics available</Typography>;

  return (
    <Box sx={{ padding: 2, overflowY: "auto", height: "100%" }}>
      {/* Lyrics Snippet */}
      <Typography variant="h6" gutterBottom>
        {lyricsData.snippet || "No snippet available"}
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      {/* Full Lyrics */}
      <Box sx={{ whiteSpace: "pre-line" }}>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: lyricsData.lyrics }} // Ensure lyrics exist
        />
      </Box>

      {/* Copyright */}
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="caption" color="textSecondary">
        {lyricsData.copyright || "No copyright info available"}
      </Typography>
    </Box>
  );
};

export default Lyrics;
