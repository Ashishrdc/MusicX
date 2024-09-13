import { PaletteOptions } from "@mui/material/styles/createPalette";
import { lighten, darken } from "@mui/material/styles";

// Define color hex codes for each theme
const themeColors = {
  orangered: "#FF5722",
  pink: "#FFC0CB",
  hotpink: "#FF69B4",
  purple: "#9C27B0",
  blue: "#2196F3",
  lightblue: "#03A9F4",
  yellow: "#FFEB3B",
  gold: "#FFD700",
  raspberry: "#E30B5D",
};

// Function for creating light palettes
const createLightPalette = (mainColor: string): PaletteOptions => ({
  primary: {
    main: mainColor,
    light: lighten(mainColor, 0.2),
    dark: darken(mainColor, 0.1),
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
    light: lighten(mainColor, 0.2),
    dark: darken(mainColor, 0.1),
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
  pink: createLightPalette(themeColors.pink),
  hotpink: createLightPalette(themeColors.hotpink),
  purple: createLightPalette(themeColors.purple),
  blue: createLightPalette(themeColors.blue),
  lightblue: createLightPalette(themeColors.lightblue),
  yellow: createLightPalette(themeColors.yellow),
  gold: createLightPalette(themeColors.gold),
  raspberry: createLightPalette(themeColors.raspberry),
};

export const darkPalettes = {
  orangered: createDarkPalette(themeColors.orangered),
  pink: createDarkPalette(themeColors.pink),
  hotpink: createDarkPalette(themeColors.hotpink),
  purple: createDarkPalette(themeColors.purple),
  blue: createDarkPalette(themeColors.blue),
  lightblue: createDarkPalette(themeColors.lightblue),
  yellow: createDarkPalette(themeColors.yellow),
  gold: createDarkPalette(themeColors.gold),
  raspberry: createDarkPalette(themeColors.raspberry),
};
