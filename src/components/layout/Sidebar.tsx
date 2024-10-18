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
      <Box
        sx={{
          display: "flex",
          wordBreak: "break-all",
          alignItems: "center",
          textAlign: "center",
          p: 1,
        }}
      >
        {sidebarState === "open-expanded" ? (
          <Typography variant="h1">
            Full Sidebar Content (To be implemented)
          </Typography>
        ) : (
          <Typography variant="body1">
            Mini Sidebar (To be implemented)
          </Typography>
        )}
      </Box>
    </Box>
  );
};
