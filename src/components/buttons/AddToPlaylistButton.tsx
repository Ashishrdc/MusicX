{/* Added by Yugant N (05-2026), to Add Song to Playlist in App */}

import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { CustomModal } from "../modal/CustomModal";
import { usePlayer } from "../../context/player/PlayerContext";
import { Song } from "../../constants/api/interfaces/song";
import {
  Box,
  Typography,
  InputBase,
  Divider,
  Tooltip,
  alpha,
  useTheme,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import he from "he";

export const AddToPlaylistButton = ({ song }: { song: Song }) => {
  const { playlists, createPlaylist, addSongToPlaylist } = usePlayer();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [added, setAdded] = useState<string | null>(null);
  const theme = useTheme();

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName("");
  };

  const handleAdd = (playlistId: string) => {
    addSongToPlaylist(playlistId, song);
    setAdded(playlistId);
    setTimeout(() => {
      setAdded(null);
      setOpen(false);
    }, 800);
  };

  return (
    <Box>
      <CustomModal
        title=""
        open={open}
        onClose={() => {
          setOpen(false);
          setNewName("");
          setAdded(null);
        }}
      >
        <Box sx={{ minWidth: 300, maxWidth: 360 }}>

          {/* Header — song context */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2.5,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 1.5,
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <img
                src={song.image?.[1]?.url}
                alt={song.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box sx={{ overflow: "hidden" }}>
              <Typography variant="caption" color="primary" fontWeight={700} letterSpacing={1} sx={{ textTransform: "uppercase" }}>
                Adding to playlist
              </Typography>
              <Typography variant="body2" fontWeight={600} noWrap>
                {he.decode(song.name)}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {song.artists.primary.map((a) => he.decode(a.name)).join(", ")}
              </Typography>
            </Box>
          </Box>

          {/* Playlist list */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              maxHeight: 220,
              overflowY: "auto",
              pr: 0.5,
              mb: 2,
              // subtle scrollbar
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: alpha(theme.palette.primary.main, 0.3),
                borderRadius: 4,
              },
            }}
          >
            {playlists.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 3,
                  gap: 1,
                  opacity: 0.5,
                }}
              >
                <QueueMusicRoundedIcon sx={{ fontSize: 36 }} />
                <Typography variant="caption">No playlists yet</Typography>
              </Box>
            ) : (
              playlists.map((p) => {
                const isAdded = added === p.id;
                return (
                  <Box
                    key={p.id}
                    onClick={() => !isAdded && handleAdd(p.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      cursor: isAdded ? "default" : "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor: isAdded
                        ? alpha(theme.palette.primary.main, 0.12)
                        : "transparent",
                      border: `1px solid ${
                        isAdded
                          ? alpha(theme.palette.primary.main, 0.3)
                          : "transparent"
                      }`,
                      "&:hover": {
                        backgroundColor: isAdded
                          ? alpha(theme.palette.primary.main, 0.12)
                          : alpha(theme.palette.primary.main, 0.06),
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.primary.main, 0.15),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <QueueMusicRoundedIcon
                          sx={{ fontSize: 16, color: "primary.main" }}
                        />
                      </Box>
                      <Typography variant="body2" fontWeight={500} noWrap>
                        {p.name}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isAdded
                          ? "primary.main"
                          : alpha(theme.palette.primary.main, 0.1),
                        transition: "all 0.25s ease",
                        flexShrink: 0,
                      }}
                    >
                      {isAdded ? (
                        <CheckRoundedIcon
                          sx={{ fontSize: 14, color: "primary.contrastText" }}
                        />
                      ) : (
                        <AddRoundedIcon
                          sx={{ fontSize: 14, color: "primary.main" }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>

          <Divider sx={{ mb: 2, opacity: 0.4 }} />

          {/* Create new playlist */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
              transition: "border-color 0.2s ease",
              "&:focus-within": {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <AddRoundedIcon sx={{ color: "primary.main", fontSize: 20, flexShrink: 0 }} />
            <InputBase
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="New playlist name…"
              fullWidth
              sx={{ fontSize: 14 }}
            />
            <Box
              onClick={handleCreate}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                backgroundColor: newName.trim()
                  ? "primary.main"
                  : alpha(theme.palette.primary.main, 0.2),
                color: newName.trim()
                  ? "primary.contrastText"
                  : alpha(theme.palette.primary.main, 0.5),
                cursor: newName.trim() ? "pointer" : "default",
                transition: "all 0.2s ease",
                flexShrink: 0,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Create
            </Box>
          </Box>

        </Box>
      </CustomModal>

      <Tooltip title="Add to playlist" placement="top">
        <Box>
          <CustomButton onClick={() => setOpen(true)}>
            <PlaylistAddIcon />
          </CustomButton>
        </Box>
      </Tooltip>
    </Box>
  );
};