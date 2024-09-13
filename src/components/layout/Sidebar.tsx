import { Box, Typography } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";
import { CustomTitle } from "../common/title/CustomTitle";

export const Sidebar = () => {
  const { sidebarState } = useLayout();
  return (
    <Box>
      <Box
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CustomTitle />
      </Box>
      {sidebarState === "open-expanded" ? (
        <Typography variant="body1">Full Sidebar Content</Typography>
      ) : (
        <Typography variant="body1">Mini Sidebar</Typography>
      )}
    </Box>
  );
};
