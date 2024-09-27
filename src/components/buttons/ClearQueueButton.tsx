import { usePlayer } from "../../context/player/PlayerContext";
import { CustomButton } from "./CustomButton";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";

export const ClearQueueButton = () => {
  const { clearQueue } = usePlayer();
  return (
    <CustomButton onClick={clearQueue}>
      <ClearAllRoundedIcon />
    </CustomButton>
  );
};
