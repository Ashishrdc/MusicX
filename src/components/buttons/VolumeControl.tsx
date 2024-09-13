import React, { useEffect, useState } from "react";
import { Box, Paper, Slider, useTheme } from "@mui/material";
import { usePlayer } from "../../context/player/PlayerContext";
import { CustomButton } from "./CustomButton";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";

export const VolumeControl = React.memo(() => {
  const theme = useTheme();
  const { volume, setVolume } = usePlayer();
  const [previousVolume, setPreviousVolume] = useState(volume || 0.5);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume || 0.5);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const getRailColor = () => {
    if (volume === 0) return "#FF0000"; // #FF0000 -> Red
    return theme.palette.primary.main;
  };

  const handleMouseEnter = () => {
    setSliderVisible(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setSliderVisible(false);
    }
  };

  const handleSliderMouseDown = () => {
    setIsDragging(true);
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
    setSliderVisible(true);
  };

  // Global mouse up event listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setSliderVisible(false);
    };

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
    } else {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomButton onClick={toggleMute} hover={false}>
        {volume === 0 ? (
          <VolumeOffRoundedIcon />
        ) : volume > 0 && volume < 0.5 ? (
          <VolumeDownRoundedIcon />
        ) : volume > 0.5 ? (
          <VolumeUpRoundedIcon />
        ) : (
          <VolumeDownRoundedIcon />
        )}
      </CustomButton>

      <Paper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "-125px",
          width: 40,
          height: 120,
          opacity: sliderVisible ? 1 : 0,
          visibility: sliderVisible ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <Slider
          value={volume}
          orientation="vertical"
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          onMouseDown={handleSliderMouseDown}
          onMouseUp={handleSliderMouseUp}
          sx={{
            cursor: isDragging ? "grabbing" : "grab",
            height: "100%",
            width: "100%",
            borderRadius: 1,
            "& .MuiSlider-thumb": {
              color: "secondary.main",
              borderRadius: 0,
              height: 10,
              width: "110%",
              opacity: 1,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                width: "110%",
                height: 15,
                backgroundColor: theme.palette.secondary.contrastText,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
              backgroundColor: getRailColor(),
            },
          }}
        />
      </Paper>
    </Box>
  );
});
