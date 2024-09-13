import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";

export const ViewToggle = () => {
  const { viewMode, toggleViewMode } = useLayout();
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <CustomButton onClick={toggleViewMode}>
        {viewMode === "grid" ? (
          <ViewListRoundedIcon />
        ) : (
          <GridViewRoundedIcon />
        )}
      </CustomButton>
    </Box>
  );
};
