import { PaletteOptions } from "@mui/material/styles/createPalette";
import { lighten, darken } from "@mui/material/styles";

// Define color hex codes for each theme
export const themeColors = {
  orangered: "#FF5722",
  hotpink: "#FF69B4",
  purple: "#9C27B0",
  blue: "#2196F3",
  lightblue: "#03A9F4",
  oldGold: "#CFB53B",
  darkGold: "#B8860B",
  raspberry: "#E30B5D",
  slate: "#64748B",
  indigo: "#6366F1",
  teal: "#0F766E",
  emerald: "#059669",
  cyan: "#0891B2",
  violet: "#7C3AED",
  rose: "#BE185D",
  amber: "#B45309",
};

// Function for creating light palettes
const createLightPalette = (mainColor: string): PaletteOptions => ({
  primary: {
    main: mainColor,
    light: lighten(mainColor, 0.3),
    dark: darken(mainColor, 0.3),
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#000000",
    light: lighten("#000000", 0.2),
    dark: darken("#000000", 0.1),
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },
  text: {
    primary: "#000000",
  },
  action: {
    hover: darken("#ffffff", 0.1),
  },
});

// Function for creating dark palettes
const createDarkPalette = (mainColor: string): PaletteOptions => ({
  primary: {
    main: mainColor,
    light: lighten(mainColor, 0.3),
    dark: darken(mainColor, 0.3),
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#ffffff",
    light: lighten("#ffffff", 0.2),
    dark: darken("#ffffff", 0.1),
    contrastText: "#000000",
  },
  background: {
    default: "#121212", // Dark background for dark mode
    paper: "#1d1d1d", // Paper background should also be dark
  },
  text: {
    primary: "#ffffff", // Lighter text for dark mode
  },
  action: {
    hover: lighten("#000000", 0.2), // Darker hover effect
  },
});

export const lightPalettes = {
  orangered: createLightPalette(themeColors.orangered),
  hotpink: createLightPalette(themeColors.hotpink),
  purple: createLightPalette(themeColors.purple),
  blue: createLightPalette(themeColors.blue),
  lightblue: createLightPalette(themeColors.lightblue),
  oldGold: createLightPalette(themeColors.oldGold),
  darkGold: createLightPalette(themeColors.darkGold),
  raspberry: createLightPalette(themeColors.raspberry),
  slate: createLightPalette(themeColors.slate),
  indigo: createLightPalette(themeColors.indigo),
  teal: createLightPalette(themeColors.teal),
  emerald: createLightPalette(themeColors.emerald),
  cyan: createLightPalette(themeColors.cyan),
  violet: createLightPalette(themeColors.violet),
  rose: createLightPalette(themeColors.rose),
  amber: createLightPalette(themeColors.amber),
};

export const darkPalettes = {
  orangered: createDarkPalette(themeColors.orangered),
  hotpink: createDarkPalette(themeColors.hotpink),
  purple: createDarkPalette(themeColors.purple),
  blue: createDarkPalette(themeColors.blue),
  lightblue: createDarkPalette(themeColors.lightblue),
  oldGold: createDarkPalette(themeColors.oldGold),
  darkGold: createDarkPalette(themeColors.darkGold),
  raspberry: createDarkPalette(themeColors.raspberry),
  slate: createDarkPalette(themeColors.slate),
  indigo: createDarkPalette(themeColors.indigo),
  teal: createDarkPalette(themeColors.teal),
  emerald: createDarkPalette(themeColors.emerald),
  cyan: createDarkPalette(themeColors.cyan),
  violet: createDarkPalette(themeColors.violet),
  rose: createDarkPalette(themeColors.rose),
  amber: createDarkPalette(themeColors.amber),
};

