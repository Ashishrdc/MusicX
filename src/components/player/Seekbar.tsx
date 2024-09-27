import { useRef } from "react";
import { Slider, useTheme } from "@mui/material";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLayout } from "../../context/layout/LayoutContext";

export const Seekbar = () => {
  const { audioRef, currentTime, duration, setCurrentTime } = usePlayer();
  const { playerMode } = useLayout();
  const isScrubbing = useRef(false);
  const theme = useTheme();

  // Handle user scrubbing
  const handleSeek = (_event: Event, newValue: number | number[]) => {
    setCurrentTime(newValue as number);
    if (audioRef.current) {
      audioRef.current.currentTime = newValue as number;
    }
  };

  // Prevent updates while scrubbing
  const handleSeekStart = () => {
    isScrubbing.current = true;
  };

  const handleSeekEnd = () => {
    isScrubbing.current = false;
  };

  return (
    <Slider
      value={currentTime}
      min={0}
      max={duration}
      step={1}
      onChange={handleSeek}
      onChangeCommitted={handleSeekEnd}
      onMouseDown={handleSeekStart}
      sx={{
        padding: playerMode === "fullscreen" ? 1 : 0,
        borderRadius: 0,
        width: "100%",
        "& .MuiSlider-thumb": {
          display:
            (currentTime < 5 || currentTime > duration - 5) &&
            playerMode !== "fullscreen"
              ? "none"
              : "block",
          color: theme.palette.secondary.main,
          borderRadius: 0,
          height: 6,
          width: 10,
          opacity: 1,
          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
          "&:hover, &.Mui-focusVisible, &.Mui-active": {
            height: 15,
            width: 15,
            borderRadius: 1,
            backgroundColor: theme.palette.secondary.main,
          },
        },
        "& .MuiSlider-track": {
          height: 4,
        },
        "& .MuiSlider-rail": {
          height: 4,
          backgroundColor: theme.palette.secondary.main,
        },
        "@media (pointer: coarse)": {
          paddingY:
            playerMode !== "fullscreen" ? "0 !important" : "10px !important", // Override the default padding
        },
      }}
    />
  );
};
