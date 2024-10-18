import { Box } from "@mui/material";
import { CustomButton } from "../buttons/CustomButton";
import { usePlayer } from "../../context/player/PlayerContext";
import { RepeatModeToggle } from "../buttons/RepeatModeToggle";
import { ShuffleToggle } from "../buttons/ShuffleToggle";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import { useLayout } from "../../context/layout/LayoutContext";
import { FSPlayerToggle } from "../buttons/FSPlayerToggle";

export const PlayerControls = () => {
  const { isPlaying, play, pause, playNext, playPrevious } = usePlayer();
  const { isSmallScreen, playerMode } = useLayout(); // Hook to detect small screens

  const fontSize =
    playerMode === "fullscreen" ? { xs: 35, sm: 40, md: 45 } : {};

  const handlePlayback = () => {
    if (isPlaying) pause();
    else play();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.25,
      }}
    >
      {isSmallScreen && playerMode !== "fullscreen" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <FSPlayerToggle />
          <CustomButton
            variant="contained"
            color="secondary"
            borderRadius={50}
            onClick={handlePlayback}
          >
            {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </CustomButton>
        </Box>
      ) : (
        // Render full controls on larger screens
        <>
          <ShuffleToggle />
          <CustomButton
            onClick={playPrevious}
            hover={false}
            color={playerMode === "fullscreen" ? "secondary" : "primary"}
          >
            <SkipPreviousRoundedIcon sx={{ fontSize: fontSize }} />
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            borderRadius={50}
            onClick={handlePlayback}
          >
            {isPlaying ? (
              <PauseRoundedIcon sx={{ fontSize: fontSize }} />
            ) : (
              <PlayArrowRoundedIcon sx={{ fontSize: fontSize }} />
            )}
          </CustomButton>
          <CustomButton
            onClick={playNext}
            hover={false}
            color={playerMode === "fullscreen" ? "secondary" : "primary"}
          >
            <SkipNextRoundedIcon sx={{ fontSize: fontSize }} />
          </CustomButton>
          <RepeatModeToggle />
        </>
      )}
    </Box>
  );
};
