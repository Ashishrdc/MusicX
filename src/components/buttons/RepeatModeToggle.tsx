import React from "react";
import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { usePlayer } from "../../context/player/PlayerContext";
import RepeatIconRounded from "@mui/icons-material/Repeat";
import RepeatOneIconRounded from "@mui/icons-material/RepeatOne";
import { useLayout } from "../../context/layout/LayoutContext";

export const RepeatModeToggle = React.memo(() => {
  const { repeatMode, toggleRepeatMode } = usePlayer();
  const { playerMode } = useLayout();
  return (
    <Box>
      <CustomButton
        color={playerMode === "fullscreen" ? "secondary" : "primary"}
        variant={repeatMode != "off" ? "contained" : "text"}
        hover={repeatMode === "off" ? false : true}
        onClick={toggleRepeatMode}
      >
        {repeatMode === "one" ? (
          <RepeatOneIconRounded fontSize="small" />
        ) : repeatMode === "all" ? (
          <RepeatIconRounded fontSize="small" />
        ) : (
          <RepeatIconRounded style={{ opacity: 0.8 }} fontSize="small" />
        )}
      </CustomButton>
    </Box>
  );
});
