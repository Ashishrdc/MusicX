import { Box, Typography } from "@mui/material";
import { usePlayer } from "../../context/player/PlayerContext";

export const MobilePlayer = () => {
  const { currentSong, getNextSong } = usePlayer();

  const nextSong = getNextSong();
  return (
    <Box>
      <Box>
        <Typography variant="h6">Upcoming Next:</Typography>
        <Typography variant="body1">
          {typeof nextSong === "string" ? nextSong : nextSong.name}
        </Typography>
      </Box>
      <Box>{/* Album Art, Song Metadata, Seekbar, PlayerControls */}</Box>
    </Box>
  );
};
