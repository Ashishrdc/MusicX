{/* Added by Yugant N (05-2026), Playlist Page */}

import { Box, Typography, InputBase, alpha, useTheme, Tooltip, IconButton } from "@mui/material";
import { useState } from "react";
import { usePlayer } from "../context/player/PlayerContext";
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export const PlaylistPage = () => {
  const { playlists, createPlaylist, deletePlaylist, renamePlaylist } = usePlayer();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName("");
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) renamePlaylist(id, editName.trim());
    setEditingId(null);
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 1100, mx: "auto" }}>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          letterSpacing={-0.5}
          sx={{ mb: 0.5 }}
        >
          My Playlists
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"}
        </Typography>
      </Box>

      {/* Create Playlist Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.25,
          mb: 3,
          borderRadius: 3,
          border: `1.5px solid ${alpha(theme.palette.primary.main, 0.25)}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          transition: "all 0.2s ease",
          "&:focus-within": {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
        }}
      >
        <QueueMusicRoundedIcon sx={{ color: "primary.main", fontSize: 20, flexShrink: 0 }} />
        <InputBase
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          placeholder="Name your new playlist…"
          sx={{ fontSize: 14, fontWeight: 500 }}
        />
        <Box
          onClick={handleCreate}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            backgroundColor: newName.trim() ? "primary.main" : alpha(theme.palette.primary.main, 0.15),
            color: newName.trim() ? "primary.contrastText" : alpha(theme.palette.primary.main, 0.4),
            cursor: newName.trim() ? "pointer" : "default",
            transition: "all 0.2s ease",
            flexShrink: 0,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 16 }} />
          Create
        </Box>
      </Box>

      {/* Empty State */}
      {playlists.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 10,
            gap: 2,
            opacity: 0.45,
          }}
        >
          <QueueMusicRoundedIcon sx={{ fontSize: 64 }} />
          <Typography variant="body1" fontWeight={600}>No playlists yet</Typography>
          <Typography variant="body2">Create one above to get started</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {playlists.map((playlist) => (
            <Box
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  transform: "translateX(4px)",
                },
              }}
            >
              {/* Playlist Icon / Art */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  flexShrink: 0,
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // mosaic of up to 4 song arts if available
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {playlist.songs.length > 0 ? (
                  <img
                    src={playlist.songs[0].image?.[0]?.url}
                    alt={playlist.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <QueueMusicRoundedIcon sx={{ color: "primary.main", fontSize: 24 }} />
                )}
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {editingId === playlist.id ? (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InputBase
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(playlist.id)}
                      autoFocus
                      sx={{
                        fontWeight: 700,
                        fontSize: 15,
                        px: 1,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.primary.main}`,
                        flex: 1,
                      }}
                    />
                    <Tooltip title="Save">
                      <IconButton
                        size="small"
                        onClick={() => handleSaveEdit(playlist.id)}
                        sx={{ color: "primary.main" }}
                      >
                        <CheckRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <>
                    <Typography variant="body1" fontWeight={700} noWrap>
                      {playlist.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                      <MusicNoteRoundedIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>

              {/* Actions */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip title="Rename">
                  <IconButton
                    size="small"
                    onClick={() => { setEditingId(playlist.id); setEditName(playlist.name); }}
                    sx={{
                      opacity: 0.6,
                      "&:hover": { opacity: 1, color: "primary.main" },
                    }}
                  >
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete playlist">
                  <IconButton
                    size="small"
                    onClick={() => deletePlaylist(playlist.id)}
                    sx={{
                      opacity: 0.6,
                      "&:hover": { opacity: 1, color: "error.main" },
                    }}
                  >
                    <DeleteRoundedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <ChevronRightRoundedIcon sx={{ color: "text.disabled", fontSize: 20, flexShrink: 0 }} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};