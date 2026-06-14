{
  /* Modified by Yugant N (05-2026), Added new functionality and design on Home Page */
}

import {
  Box,
  Chip,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import { useEffect, useMemo, useState } from "react";
import { MediaSection } from "../components/sections/MediaSection";
import { fetchTrendingSongs } from "../constants/api/services/songService";
import { SongList } from "../components/player/SongList";
import { usePlayer } from "../context/player/PlayerContext";
import { useLayout } from "../context/layout/LayoutContext";
import { Song } from "../constants/api/interfaces/song";
import he from "he";

export const Home = () => {
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const { history, currentSong } = usePlayer();
  const { isSmallScreen } = useLayout();
  const theme = useTheme();

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        const songs = await fetchTrendingSongs();
        setTrendingSongs(songs);
      } catch (error) {
        console.error("Error fetching trending songs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  const recentlyPlayed = useMemo(() => {
    return history.slice(0, 10);
  }, [history]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflowY: "auto",
        px: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },
        pb: 4,
        gap: 3,
      }}
    >
      {/* SEARCH MODE */}
      {/* {searchQuery.trim().length > 0 ? (
        <SearchResult />
      ) : ( */}
      <>
        {/* HERO SECTION */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            p: {
              xs: 2.5,
              md: 3,
            },
            minHeight: isSmallScreen ? 240 : 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignContent: { xs: "flex-start", md: "center" },
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 25%, ${theme.palette.mode === "light" ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText} 105%)`,
            boxShadow: theme.shadows[10],
          }}
        >
          <Box
            sx={{
              zIndex: 2,
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-evenly",
              gap: 1,
              p: 0.5,
            }}
          >
            <Chip
              icon={<GraphicEqRoundedIcon />}
              label="Your music space"
              sx={{
                width: "fit-content",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />

            <Typography
              variant={isSmallScreen ? "h4" : "h3"}
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Discover music that matches your vibe.
            </Typography>

            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Explore trending tracks, continue your sessions, and keep your
              queue flowing without distractions.
            </Typography>

            {currentSong && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  overflow: "hidden",
                  minWidth: 0,
                  gap: 1,
                }}
              >
                <Chip
                  label={<Typography variant="body2">Now Playing</Typography>}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.18)",
                  }}
                />
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {he.decode(
                    `${currentSong.name} by ${currentSong.artists.primary.map((artist) => artist.name).join(", ")}`,
                  )}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: -100,
              bottom: 0,
              width: 260,
              height: 260,
              borderRadius: 50,
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </Box>

        {/* TRENDING */}
        <MediaSection
          title="Trending Songs"
          subtitle="Fresh tracks people are listening to right now"
          icon={<TrendingUpRoundedIcon />}
        >
          {loading ? (
            <Stack spacing={2}>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  height={72}
                  animation="wave"
                />
              ))}
            </Stack>
          ) : (
            <SongList songs={trendingSongs} />
          )}
        </MediaSection>

        {/* CONTINUE LISTENING */}
        {recentlyPlayed.length > 0 && (
          <MediaSection
            title="Continue Listening"
            subtitle="Jump back into your recent tracks"
            icon={<HistoryRoundedIcon />}
          >
            <SongList songs={recentlyPlayed} />
          </MediaSection>
        )}
      </>
    </Box>
  );
};

export default Home;
