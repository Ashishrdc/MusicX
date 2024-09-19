import { Box } from "@mui/material";
import { MusicPlayer } from "../player/MusicPlayer";

export const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
      }}
    >
      <MusicPlayer />
    </Box>
  );
};
