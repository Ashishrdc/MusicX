import { Box, Slide } from "@mui/material";
import { FSPlayerToggle } from "../buttons/FSPlayerToggle";
import { useLayout } from "../../context/layout/LayoutContext";
import { ReactNode } from "react";

export const FSLayout = ({ children }: { children: ReactNode }) => {
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
          inset: 0,
          position: "fixed",
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            overflowY: "auto",
            scrollBehavior: "smooth",
            scrollSnapType: "y mandatory",
            height: "100dvh",
            gap: 2,
          }}
        >
          {children}
        </Box>
        {/* Toggle button for fullscreen player */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <FSPlayerToggle />
        </Box>
      </Box>
    </Slide>
  );
};
