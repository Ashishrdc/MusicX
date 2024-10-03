import { useState } from "react";
import { CustomButton } from "./CustomButton";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import { Lyrics } from "../player/Lyrics";
import { CustomModal } from "../modal/CustomModal";
import { usePlayer } from "../../context/player/PlayerContext";

export const LyricsToggle = () => {
  const { currentSong } = usePlayer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <CustomModal
        title={currentSong?.name || "No Title"}
        open={isOpen}
        onClose={handleClick}
      >
        <Lyrics />
      </CustomModal>
      <CustomButton onClick={handleClick}>
        <LyricsRoundedIcon fontSize="small" />
      </CustomButton>
    </>
  );
};
