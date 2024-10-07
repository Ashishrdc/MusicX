import React from "react";
import { Box, Typography } from "@mui/material";
import { SongCardProps } from "../../constants/interfaces/card.interface";
import { PlayPauseButton } from "../buttons/PlayPauseButton";
import { formatSecondsToTime } from "../../util/helperFunctions";
import { usePlayer } from "../../context/player/PlayerContext";
import he from "he";

export const BoxSongCard: React.FC<SongCardProps> = ({ song }) => {
  const { currentSong } = usePlayer();
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
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          opacity: song.id === currentSong?.id ? 1 : 0,
          transition: "all 0.3s ease",
          inset: 0,
          "&:hover": {
            opacity: 1,
            ".transition-slide-up": {
              transform: "translateY(-60%)",
            },
          },
        }}
      >
        <Box
          className="transition-slide-up"
          sx={{
            transition: "transform 0.3s ease",
            transform:
              song.id === currentSong?.id
                ? "translateY(-60%)"
                : "translateY(60%)",
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
          style={{
            width: "100%",
            height: "100%",
          }}
          src={song.image[2]?.url || "/placeholder-image.png"}
          alt={song.name}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          width: "inherit",
        }}
      >
        <Typography noWrap variant="body2" fontWeight={600}>
          {he.decode(song.name)}
        </Typography>
        <Typography noWrap variant="subtitle2" color="text.secondary">
          {song.artists.primary
            .map((artist) => he.decode(artist.name))
            .join(", ")}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {formatSecondsToTime(song.duration)}
        </Typography>
      </Box>
    </Box>
  );
};
