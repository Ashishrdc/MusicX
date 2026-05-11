{/* Added by Yugant N (05-2026), Album Page */}

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../util/axios/axiosInstance";
import { SongList } from "../components/player/SongList";
import { Box, Typography, alpha, useTheme, IconButton, Tooltip, Skeleton } from "@mui/material";
import { usePlayer } from "../context/player/PlayerContext";
import { PlayAllButton } from "../components/buttons/PlayAllButton";
import { AddAllToQueueButton } from "../components/buttons/AddAllToQueueButton";
import { useLayout } from "../context/layout/LayoutContext";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

export const AlbumPage = () => {
  const { id } = useParams();
  const { isSmallScreen } = useLayout();
  const navigate = useNavigate();
  const theme = useTheme();

  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setQueue } = usePlayer();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/albums?id=${id}`)
      .then((res) => setAlbum(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    return `${min} min`;
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 800, mx: "auto" }}>
        <Skeleton variant="circular" width={36} height={36} sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: isSmallScreen ? "center" : "flex-end",
            gap: 3,
            mb: 4,
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              width: isSmallScreen ? "55%" : 180,
              aspectRatio: "1/1",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <Box sx={{ flex: 1, width: "100%" }}>
            <Skeleton variant="text" width="30%" height={16} />
            <Skeleton variant="text" width="65%" height={40} sx={{ mt: 0.5 }} />
            <Skeleton variant="text" width="45%" />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: 3 }} />
              <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 3 }} />
            </Box>
          </Box>
        </Box>
        {Array.from({ length: 5 }).map((_, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 1.5 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="35%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (!album) return null;

  const songs = album.songs || [];
  const totalDuration = songs.reduce(
    (acc: number, s: any) => acc + (s.duration || 0),
    0
  );

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 800, mx: "auto" }}>

      {/* Back */}
      <Tooltip title="Go back">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mb: 2, "&:hover": { color: "primary.main" } }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
      </Tooltip>

      {/* ── ALBUM HEADER ───────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "center" : "flex-end",
          gap: 3,
          mb: 4,
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        {/* Cover art */}
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            width: isSmallScreen ? "55%" : 180,
            maxWidth: 200,
          }}
        >
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.25)}`,
              aspectRatio: "1/1",
            }}
          >
            <img
              src={album.image?.[2]?.url}
              alt={album.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
          {/* Glow reflection */}
          <Box
            sx={{
              position: "absolute",
              bottom: -12,
              left: "10%",
              right: "10%",
              height: 20,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              filter: "blur(12px)",
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* Meta */}
        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <Typography
            variant="caption"
            fontWeight={700}
            letterSpacing={2}
            color="primary"
            sx={{ textTransform: "uppercase" }}
          >
            Album
          </Typography>

          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            fontWeight={800}
            letterSpacing={-0.5}
            sx={{
              mt: 0.5,
              mb: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {album.name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" fontWeight={500} noWrap>
            {album.artists?.primary?.map((a: any) => a.name).join(", ")}
          </Typography>

          {/* Stats row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 1.5,
              justifyContent: isSmallScreen ? "center" : "flex-start",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <MusicNoteRoundedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {songs.length} {songs.length === 1 ? "song" : "songs"}
              </Typography>
            </Box>

            {totalDuration > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeRoundedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {formatTime(totalDuration)}
                </Typography>
              </Box>
            )}

            {album.year && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarTodayRoundedIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {album.year}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Action buttons */}
          {songs.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 2.5,
                justifyContent: isSmallScreen ? "center" : "flex-start",
              }}
            >
              <PlayAllButton songs={songs} />
              <AddAllToQueueButton songs={songs} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Divider with accent */}
      <Box
        sx={{
          height: 1,
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          mb: 2,
          borderRadius: 1,
        }}
      />

      {/* ── SONG LIST ──────────────────────────────────────────────────────── */}
      {songs.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 8,
            gap: 1.5,
            opacity: 0.4,
          }}
        >
          <MusicNoteRoundedIcon sx={{ fontSize: 52 }} />
          <Typography variant="body1" fontWeight={600}>
            No songs in this album
          </Typography>
        </Box>
      ) : (
        <SongList songs={songs} />
      )}
    </Box>
  );
};