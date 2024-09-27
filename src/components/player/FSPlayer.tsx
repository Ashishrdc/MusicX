import { Box, Slide } from "@mui/material";
import { FSPlayerToggle } from "../buttons/FSPlayerToggle";
import { useLayout } from "../../context/layout/LayoutContext";
import { FSMobilePlayer } from "./FSMobilePlayer";
import { FSBigPlayer } from "./FSBigPlayer";

export const FSPlayer = () => {
  const { playerMode, isSmallScreen } = useLayout();

  return (
    <Slide
      direction="up"
      in={playerMode === "fullscreen"}
      mountOnEnter
      unmountOnExit
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100vh",
          backgroundColor: "background.paper",
          zIndex: 1400, // Higher z-index for overlay
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        {/* Conditionally render mobile or large screen player */}
        {isSmallScreen ? <FSMobilePlayer /> : <FSBigPlayer />}
        {/* Toggle button for fullscreen player */}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <FSPlayerToggle />
        </Box>
      </Box>
    </Slide>
  );
};
