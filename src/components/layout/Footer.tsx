import { Box } from "@mui/material";
import { MiniPlayer } from "../player/MiniPlayer";

export const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
      }}
    >
      <MiniPlayer />
    </Box>
  );
};
