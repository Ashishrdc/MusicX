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

export const PlayerControls = () => {
  const { isPlaying, play, pause, playNext, playPrevious } = usePlayer();
  const { isSmallScreen } = useLayout(); // Hook to detect small screens

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
      {isSmallScreen ? (
        // Render only Play/Pause button on small screens
        <CustomButton
          variant="contained"
          color="secondary"
          borderRadius={50}
          onClick={handlePlayback}
        >
          {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
        </CustomButton>
      ) : (
        // Render full controls on larger screens
        <>
          <ShuffleToggle />
          <CustomButton onClick={playPrevious} hover={false}>
            <SkipPreviousRoundedIcon />
          </CustomButton>
          <CustomButton
            variant="contained"
            color="secondary"
            borderRadius={50}
            onClick={handlePlayback}
          >
            {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </CustomButton>
          <CustomButton onClick={playNext} hover={false}>
            <SkipNextRoundedIcon />
          </CustomButton>
          <RepeatModeToggle />
        </>
      )}
    </Box>
  );
};
