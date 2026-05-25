{/* Added by Yugant N (05-2026), to Add AddAllToQueueButton in App */}

import { CustomButton } from "./CustomButton";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { Song } from "../../constants/api/interfaces/song";
import { usePlayer } from "../../context/player/PlayerContext";

export const AddAllToQueueButton = ({ songs }: { songs: Song[] }) => {
  const { setQueue } = usePlayer();

  const handleAddAll = () => {
    if (!songs || songs.length === 0) return;

    setQueue((prev) => {

      //only keep songs that are not in queue, handle duplicates
      const filtered = songs.filter(
        (song) => !prev.some((q) => q.id === song.id)
      );

      return [...prev, ...filtered];
    });
  };

  return (
    <CustomButton onClick={handleAddAll}>
      <QueueMusicIcon /> Add All to Queue
    </CustomButton>
  );
};