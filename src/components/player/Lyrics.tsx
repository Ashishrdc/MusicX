import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import axiosInstance from "../../util/axios/axiosInstance";
import { usePlayer } from "../../context/player/PlayerContext";
import { Equalizer } from "../common/loading";
import { CenteredFlexBox } from "../common/box/CenteredFlexBox";
import {
  LyricsApiResponse,
  LyricsData,
} from "../../constants/interfaces/api.responses";

export const Lyrics = React.memo(() => {
  const { currentSong } = usePlayer();
  const [lyricsData, setLyricsData] = useState<LyricsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch lyrics when the current song changes
  useEffect(() => {
    const fetchLyrics = async () => {
      if (currentSong && currentSong.hasLyrics) {
        setIsLoading(true);

        try {
          const response = await axiosInstance.get<LyricsApiResponse>(
            `api/songs/${currentSong.id}/lyrics`
          );
          setLyricsData(response.data.data); // Access the nested data object
        } catch (err) {
          console.error("Error fetching lyrics:", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.warn("No current song or no lyrics available.");
        setLyricsData(null);
      }
    };

    fetchLyrics();
  }, [currentSong]);

  // Loading state
  if (isLoading)
    return (
      <CenteredFlexBox>
        <Equalizer />
      </CenteredFlexBox>
    );

  return (
    <>
      {currentSong?.hasLyrics && lyricsData ? (
        <Box sx={{ padding: 2, overflowY: "auto", height: "100%" }}>
          {/* Title */}
          <Typography variant="h2" fontWeight={600}>
            Lyrics for {currentSong.name}
          </Typography>

          {/* Lyrics Snippet */}
          <Typography variant="h6" gutterBottom>
            {lyricsData?.snippet}
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          {/* Full Lyrics */}
          <Box sx={{ whiteSpace: "pre-line" }}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: lyricsData.lyrics }}
            />
          </Box>

          {/* Copyright */}
          <Divider sx={{ marginY: 2 }} />

          <Typography
            variant="caption"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: lyricsData.copyright,
            }}
          />
        </Box>
      ) : (
        <CenteredFlexBox>
          <Typography variant="h1" fontWeight={600}>
            Sorry! Lyrics isn't available.🥺
          </Typography>
        </CenteredFlexBox>
      )}
    </>
  );
});
