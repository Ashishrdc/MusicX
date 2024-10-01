import { Box, Slide } from "@mui/material";
import { MiniPlayer } from "../player/MiniPlayer";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLayout } from "../../context/layout/LayoutContext";

export const Footer = () => {
  const { currentSong } = usePlayer();
  const { playerMode } = useLayout();
  return (
    <Slide
      direction={currentSong || playerMode === "mini" ? "right" : "up"}
      in={Boolean(currentSong)}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
        }}
      >
        {playerMode === "mini" && <MiniPlayer />}
      </Box>
    </Slide>
  );
};
