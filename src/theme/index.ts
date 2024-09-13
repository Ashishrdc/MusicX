import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import { lightPalettes, darkPalettes } from "./palette";
import { ThemeMode, ThemeName } from "../constants/types/common.types";

// Function to create themes based on palette and mode
export const getTheme = (themeName: ThemeName, mode: ThemeMode) => {
  const palette =
    mode === "light" ? lightPalettes[themeName] : darkPalettes[themeName];
  return createTheme({
    palette: { ...palette, mode },
    typography,
  });
};
