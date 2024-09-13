import { useRef } from "react";
import { Slider, Box } from "@mui/material";
import { usePlayer } from "../../context/player/PlayerContext";

export const Seekbar = () => {
  const { audioRef, currentTime, duration, setCurrentTime } = usePlayer();
  const isScrubbing = useRef(false);

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
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      {/* Seekbar Slider */}
      <Slider
        value={currentTime}
        min={0}
        max={duration}
        step={1}
        onChange={handleSeek}
        onChangeCommitted={handleSeekEnd}
        onMouseDown={handleSeekStart}
        sx={{
          flexGrow: 1,
          backgroundColor: "red",

          "& .MuiSlider-thumb": {
            width: 12,
            height: 12,
            "&:hover": {
              boxShadow: "0 0 0 8px rgba(0,0,0,0.16)",
            },
          },
          "& .MuiSlider-track": {
            height: 6,
          },
          "& .MuiSlider-rail": {
            height: 6,
            opacity: 0.3,
          },
        }}
      />
    </Box>
  );
};
