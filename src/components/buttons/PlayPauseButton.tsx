import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { usePlayer } from "../../context/player/PlayerContext";
import { SongCardProps } from "../../constants/interfaces/card.interface";
import { useLayout } from "../../context/layout/LayoutContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";

export const PlayPauseButton = ({ song }: SongCardProps) => {
  const { isPlaying, currentSong, setAndPlaySong, play, pause } = usePlayer();
  const { viewMode } = useLayout();

  const handleClick = () => {
    if (song.id === currentSong?.id) {
      isPlaying ? pause() : play();
    } else {
      setAndPlaySong(song);
    }
  };

  return (
    <Box>
      <CustomButton
        variant={
          viewMode === "grid"
            ? "contained"
            : song.id === currentSong?.id
            ? "contained"
            : "text"
        }
        color={song.id === currentSong?.id ? "primary" : "secondary"}
        onClick={handleClick}
        borderRadius={50}
        hover={viewMode === "grid" ? true : false}
      >
        {song.id === currentSong?.id && isPlaying ? (
          <EqualizerRoundedIcon
            sx={{ fontSize: viewMode === "list" ? 25 : 30 }}
          />
        ) : (
          <PlayArrowRoundedIcon
            sx={{ fontSize: viewMode === "list" ? 25 : 30 }}
          />
        )}
      </CustomButton>
    </Box>
  );
};
