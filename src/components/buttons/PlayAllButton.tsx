{/* Added by Yugant N (05-2026), to Add PlayAll Button in App */}

import { CustomButton } from "./CustomButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Song } from "../../constants/api/interfaces/song";
import { usePlayer } from "../../context/player/PlayerContext";

export const PlayAllButton = ({ songs }: { songs: Song[] }) => {
  const { setAndPlaySong, setQueue } = usePlayer();

  const handlePlayAll = () => {
    if (!songs || songs.length === 0) return;

    const [first, ...rest] = songs;

    // play first song
    setAndPlaySong(first);

    // add remaining WITHOUT duplicates
    setQueue([first, ...rest]);
  };

  return (
    <CustomButton onClick={handlePlayAll}>
      <PlayArrowIcon /> Play All
    </CustomButton>
  );
};