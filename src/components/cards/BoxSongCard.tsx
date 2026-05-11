import React from "react";
import { Box, Typography } from "@mui/material";
import { SongCardProps } from "../../constants/interfaces/card.interface";
import { PlayPauseButton } from "../buttons/PlayPauseButton";
import { AddToPlaylistButton } from "../buttons/AddToPlaylistButton";
import { formatSecondsToTime } from "../../util/helperFunctions";
import { usePlayer } from "../../context/player/PlayerContext";
import he from "he";

export const BoxSongCard: React.FC<SongCardProps> = ({ song }) => {
  const { currentSong } = usePlayer();
  const isActive = song.id === currentSong?.id; //Added by Yugant N (05-2026), Code reuse

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        p: 0.5,
        width: "100%",
        height: "fit-content",
        overflow: "hidden",
        position: "relative",
        marginBottom: 0.5,
        borderRadius: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          backgroundColor: "action.hover",
          // reveal playlist button when card is hovered
          "& .playlist-btn": { opacity: 1 },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          opacity: isActive ? 1 : 0,
          transition: "all 0.3s ease",
          inset: 0,
          "&:hover": {
            opacity: 1,
            ".transition-slide-up": { transform: "translateY(-60%)" },
          },
        }}
      >
        <Box
          className="transition-slide-up"
          sx={{
            transition: "transform 0.3s ease",
            transform: isActive ? "translateY(-60%)" : "translateY(60%)",
          }}
        >
          <PlayPauseButton song={song} />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          aspectRatio: "1",
          overflow: "hidden",
          borderRadius: 1,
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={song.image[2]?.url || "/placeholder-image.png"}
          alt={song.name}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          gap: 0.5,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography noWrap variant="body2" fontWeight={600}>
            {he.decode(song.name)}
          </Typography>
          <Typography noWrap variant="subtitle2" color="text.secondary">
            {song.artists.primary.map((a) => he.decode(a.name)).join(", ")}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {formatSecondsToTime(song.duration)}
          </Typography>
        </Box>

        <Box
          className="playlist-btn"
          sx={{
            opacity: 0,
            transition: "opacity 0.2s ease",
            flexShrink: 0,
            // nudge it up slightly so it aligns with the title line
            mt: 0.25,
          }}
        >
          {/* Added by Yugant N (05-2026), Add Playlist Button */}
          <AddToPlaylistButton song={song} />
        </Box>
      </Box>
    </Box>
  );
};