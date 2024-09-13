import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import { CustomButton } from "./CustomButton";
import { Box } from "@mui/material";

export const ShuffleToggle = () => {
  return (
    <Box>
      <CustomButton hover={false}>
        <ShuffleRoundedIcon fontSize="small" />
      </CustomButton>
    </Box>
  );
};
