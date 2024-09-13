import React from "react";
import { Box } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";
import { CustomButton } from "./CustomButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const ThemeToggle = React.memo(() => {
  const { toggleTheme, themeMode } = useLayout();

  return (
    <Box>
      <CustomButton onClick={toggleTheme}>
        {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </CustomButton>
    </Box>
  );
});
