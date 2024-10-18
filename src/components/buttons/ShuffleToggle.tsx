import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import { CustomButton } from "./CustomButton";
import { Box } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";

export const ShuffleToggle = () => {
  const { playerMode } = useLayout();
  return (
    <Box>
      <CustomButton hover={false}>
        <ShuffleRoundedIcon
          fontSize="small"
          color={playerMode === "fullscreen" ? "secondary" : "primary"}
        />
      </CustomButton>
    </Box>
  );
};
