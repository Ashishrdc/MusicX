import { useState } from "react";
import { CustomButton } from "./CustomButton";
import { Lyrics } from "../player/Lyrics";
import { CustomModal } from "../modal/CustomModal";
import { usePlayer } from "../../context/player/PlayerContext";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import he from "he";
import { Box } from "@mui/material";

export const LyricsToggle = () => {
  const { currentSong } = usePlayer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <CustomModal
        title={(currentSong && he.decode(currentSong.name)) || "No Title"}
        open={isOpen}
        onClose={handleClick}
      >
        <Lyrics />
      </CustomModal>
      <CustomButton onClick={handleClick}>
        <LyricsRoundedIcon />
      </CustomButton>
    </Box>
  );
};
