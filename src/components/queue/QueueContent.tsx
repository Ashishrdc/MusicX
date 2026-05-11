{/* Added by Yugant N (05-2026), Queue Content */}

import { usePlayer } from "../../context/player/PlayerContext";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import he from "he";

const QueueContent = () => {
  const {
    queue,
    currentSong,
    setAndPlaySong,
    removeFromQueue,
  } = usePlayer();

  if (!queue.length) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Queue is empty
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        gap: 0.5,

        overflowY: "auto",

        height: "100%",

        pr: 0.5,

        // FIX: prevents overlap with top toggle arrow
        pt: {
          xs: 5,
          sm: 1,
        },
      }}
    >
      {queue.map((song, index) => {
        const isActive = song.id === currentSong?.id;

        return (
          <Box key={`${song.id}-${index}`}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                gap: 1.5,

                px: 1,
                py: 0.75,

                borderRadius: 2,

                backgroundColor: isActive
                  ? "primary.main"
                  : "transparent",

                color: isActive
                  ? "primary.contrastText"
                  : "text.primary",

                transition: "background-color 0.2s ease",

                cursor: "pointer",

                "&:hover": {
                  backgroundColor: isActive
                    ? "primary.dark"
                    : "action.hover",
                },
              }}
              onClick={() => setAndPlaySong(song)}
            >
              {/* Thumbnail */}
              <Avatar
                src={song.image?.[0]?.url}
                variant="rounded"
                sx={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                }}
              >
                <PlayArrowRoundedIcon />
              </Avatar>

              {/* Song info */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={isActive ? "bold" : "medium"}
                  noWrap
                >
                  {he.decode(song.name)}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.75,
                  }}
                  noWrap
                >
                  {song.artists.primary
                    .map((a) => he.decode(a.name))
                    .join(", ")}
                </Typography>
              </Box>

              {/* Remove button */}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromQueue(song.id);
                }}
                sx={{
                  color: isActive
                    ? "primary.contrastText"
                    : "text.secondary",

                  flexShrink: 0,
                }}
              >
                <ClearRoundedIcon fontSize="small" />
              </IconButton>
            </Box>

            <Divider
              sx={{
                opacity: 0.2,
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default QueueContent;