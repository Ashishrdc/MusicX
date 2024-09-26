import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export const FSPlayerToggle = () => {
  const { playerMode, toggleFSPlayer } = useLayout();
  return (
    <>
      <Box>
        <CustomButton onClick={toggleFSPlayer} color="secondary">
          <ExpandMoreRoundedIcon
            sx={{
              transition: "transform 0.3s ease",
              transform:
                playerMode === "mini" ? "rotate(-180deg)" : "rotate(0deg)",
            }}
          />
        </CustomButton>
      </Box>
    </>
  );
};
