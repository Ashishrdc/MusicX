{/* Modified by Yugant N (05-2026), Added new functionality and design on Home Page */}

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
                md: 4,
              },
              minHeight: isSmallScreen ? 240 : 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: {xs: "column", md: "row"},
              alignContent: {xs: "flex-start", md:"center"},
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: "white",
              boxShadow: theme.shadows[10],
            }}
          >
            <Box
              sx={{
                zIndex: 2,
                maxWidth: { xs: "100%", md:600},
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Chip
                icon={<GraphicEqRoundedIcon />}
                label="Your music space"
                sx={{
                  width: "fit-content",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
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

              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  maxWidth: { xs: "100%", md: 520},
                }}
              >
                Explore trending tracks, continue your sessions, and keep your
                queue flowing without distractions.
              </Typography>

              {currentSong && (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label="Now Playing"
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.18)",
                      color: "white",
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      wordBreak: "break-word",
                    }}
                  >
                    {currentSong.name}
                  </Typography>
                </Stack>
              )}
            </Box>

            {!isSmallScreen && (
              <Box
                sx={{
                  position: "absolute",
                  right: -40,
                  bottom: -40,
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
            )}
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
      {/* )} */}
    </Box>
  );
};

export default Home;