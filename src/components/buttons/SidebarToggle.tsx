import React from "react";
import { Box } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";
import { CustomButton } from "./CustomButton";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export const SidebarToggle = React.memo(() => {
  const { sidebarState, toggleSidebarState } = useLayout();

  const handleToggleSidebar = () => {
    if (sidebarState === "closed") {
      toggleSidebarState("open-mini");
    } else if (sidebarState === "open-mini") {
      toggleSidebarState("open-expanded");
    } else {
      toggleSidebarState("closed");
    }
  };

  return (
    <Box>
      <CustomButton onClick={handleToggleSidebar}>
        {sidebarState === "open-expanded" ? (
          <MenuOpenRoundedIcon />
        ) : (
          <MenuRoundedIcon />
        )}
      </CustomButton>
    </Box>
  );
});
