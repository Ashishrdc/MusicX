import { ReactNode, useEffect, useState } from "react";
import { LayoutContext } from "./LayoutContext";
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ThemeMode,
  ThemeName,
  ViewMode,
  SidebarState,
  PlayerMode,
} from "../../constants/types/common.types";
import { getTheme } from "../../theme";
import { ScrollbarStyles } from "../../components/styles/ScrollbarStyles";

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();

  // useMediaQuery
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  // useStates
  const [sidebarState, setSidebarState] = useState<SidebarState>(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    return (savedSidebarState as SidebarState) || "open-expanded";
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme ? (savedTheme as ThemeMode) : "light";
  });

  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const savedThemeName = localStorage.getItem("themeName");
    return savedThemeName ? (savedThemeName as ThemeName) : "hotpink";
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    return savedViewMode ? (savedViewMode as ViewMode) : "grid";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [playerMode, setPlayerMode] = useState<PlayerMode>("mini");

  // Variables
  // const currentTheme = getTheme(themeName, themeMode);
  const currentTheme = getTheme("blue", themeMode);

  // -------------------------------Functions ---------------------------------//
  const selectTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  const toggleSidebarState = () => {
    if (isSmallScreen) {
      setSidebarState(sidebarState === "closed" ? "open-expanded" : "closed");
    } else {
      setSidebarState(
        sidebarState === "open-mini" ? "open-expanded" : "open-mini"
      );
    }
  };

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const toggleSearchMode = () => {
    setSearchMode((prevMode) => !prevMode);
  };

  const toggleFSPlayer = () => {
    playerMode === "mini" ? setPlayerMode("fullscreen") : setPlayerMode("mini");
  };

  // -------------------------------SideEffects---------------------------------//

  // Save theme mode to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Save the viewMode to local storage
  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  // Handle screen size changes
  useEffect(() => {
    if (isSmallScreen || playerMode === "fullscreen") {
      setSidebarState("closed");
    } else {
      // Use the stored user preference or default to "open-expanded"
      const userPreference = localStorage.getItem("sidebarState") as
        | "open-mini"
        | "open-expanded"
        | null;
      setSearchMode(false);
      setSidebarState(userPreference || "open-expanded");
    }
  }, [isSmallScreen, playerMode, setSidebarState]);

  // Save the user's preference when toggling on larger screens
  useEffect(() => {
    if (!isSmallScreen && sidebarState !== "closed") {
      localStorage.setItem("sidebarState", sidebarState);
    }
  }, [sidebarState, isSmallScreen]);

  return (
    <LayoutContext.Provider
      value={{
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
        sidebarState,
        themeMode,
        themeName,
        viewMode,
        searchMode,
        playerMode,
        searchQuery,
        setSearchQuery,
        toggleSidebarState,
        toggleTheme,
        selectTheme,
        toggleViewMode,
        toggleSearchMode,
        toggleFSPlayer,
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <CssBaseline enableColorScheme />
        <ScrollbarStyles width={8} borderRadius={2} />
        {children}
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};
