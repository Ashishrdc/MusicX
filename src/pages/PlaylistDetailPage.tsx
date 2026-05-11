{/* Added by Yugant N (05-2026), Playlist Detail Page */}

import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, alpha, useTheme, IconButton, Tooltip } from "@mui/material";
import { usePlayer } from "../context/player/PlayerContext";
import { SongList } from "../components/player/SongList";
import { PlayAllButton } from "../components/buttons/PlayAllButton";
import { AddAllToQueueButton } from "../components/buttons/AddAllToQueueButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export const PlaylistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { playlists, setAndPlaySong, setQueue } = usePlayer();

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 2, opacity: 0.5 }}>
        <QueueMusicRoundedIcon sx={{ fontSize: 64 }} />
        <Typography variant="h6">Playlist not found</Typography>
      </Box>
    );
  }

  const totalDuration = playlist.songs.reduce((acc, s) => acc + (s.duration || 0), 0);
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    return `${min} min`;
  };

  // Pick up to 4 cover images for mosaic
  const coverImages = playlist.songs.slice(0, 4).map((s) => s.image?.[1]?.url).filter(Boolean);

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 800, mx: "auto" }}>

      {/* Back button */}
      <Tooltip title="Back to playlists">
        <IconButton
          onClick={() => navigate("/playlist")}
          sx={{ mb: 2, "&:hover": { color: "primary.main" } }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
      </Tooltip>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-end" },
          gap: 3,
          mb: 4,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {/* Cover art — mosaic or single or empty */}
        <Box
          sx={{
            width: { xs: 140, sm: 160 },
            height: { xs: 140, sm: 160 },
            borderRadius: 3,
            flexShrink: 0,
            overflow: "hidden",
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: "grid",
            gridTemplateColumns: coverImages.length >= 4 ? "1fr 1fr" : "1fr",
            gridTemplateRows: coverImages.length >= 4 ? "1fr 1fr" : "1fr",
          }}
        >
          {coverImages.length === 0 ? (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <QueueMusicRoundedIcon sx={{ fontSize: 56, color: "primary.main", opacity: 0.6 }} />
            </Box>
          ) : coverImages.length < 4 ? (
            <img src={coverImages[0]} alt={playlist.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            coverImages.map((url, i) => (
              <img key={i} src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ))
          )}
        </Box>

        {/* Playlist meta */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            fontWeight={700}
            letterSpacing={2}
            color="primary"
            sx={{ textTransform: "uppercase" }}
          >
            Playlist
          </Typography>
          <Typography
            variant="h4"
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
            {playlist.name}
          </Typography>

          {/* Stats row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-start" },
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <MusicNoteRoundedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"}
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
          </Box>

          {/* Action buttons */}
          {playlist.songs.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 2.5,
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <PlayAllButton songs={playlist.songs} />
              <AddAllToQueueButton songs={playlist.songs} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Song list */}
      {playlist.songs.length === 0 ? (
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
          <Typography variant="body1" fontWeight={600}>No songs yet</Typography>
          <Typography variant="body2">Add songs using the playlist button on any track</Typography>
        </Box>
      ) : (
        <SongList songs={playlist.songs} />
      )}
    </Box>
  );
};