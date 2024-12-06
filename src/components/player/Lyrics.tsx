import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import axiosInstance from "../../util/axios/axiosInstance";
import { usePlayer } from "../../context/player/PlayerContext";
import { Equalizer } from "../common/loading";
import { CenteredFlexBox } from "../common/box/CenteredFlexBox";
import { useLayout } from "../../context/layout/LayoutContext";
import he from "he";
import { LyricsApiResponse, LyricsData } from "../../constants/api/interfaces/lyrics";

export const Lyrics = React.memo(() => {
  const { currentSong } = usePlayer();
  const { playerMode } = useLayout();
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
        <Box sx={{ overflowY: "auto", height: "100%" }}>
          {/* Title */}
          <Box
            sx={{
              width: "100%",
              top: 0,
            }}
          >
            {playerMode === "fullscreen" && (
              <Typography variant="h4" fontWeight={600}>
                Lyrics for {he.decode(currentSong.name)}
              </Typography>
            )}

            {/* Lyrics Snippet */}
            <Typography variant="h6" fontStyle={"italic"} gutterBottom>
              {lyricsData?.snippet}
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          {/* Full Lyrics */}
          <Box sx={{ whiteSpace: "pre-line" }}>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: lyricsData.lyrics }}
            />

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
        </Box>
      ) : (
        <CenteredFlexBox textAlign={"center"} flexDirection={"column"} gap={1}>
          <Typography variant="h1">😔</Typography>
          <Typography variant="h3" fontWeight={600}>
            Oops! The lyrics for this song aren't available right now.
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            We're working on getting it for you. In the meantime, enjoy the
            music!
          </Typography>
        </CenteredFlexBox>
      )}
    </>
  );
});
