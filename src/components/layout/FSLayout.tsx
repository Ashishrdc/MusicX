import { Box, Slide } from "@mui/material";
import { FSPlayerToggle } from "../buttons/FSPlayerToggle";
import { useLayout } from "../../context/layout/LayoutContext";
import { ReactNode } from "react";

export const FSLayout = ({ children }: { children: ReactNode }) => {
  const { playerMode } = useLayout();

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
            overflowY: "auto",
            height: "100vh",
          }}
        >
          {children}
        </Box>
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
