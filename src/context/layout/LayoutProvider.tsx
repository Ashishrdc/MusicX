import { ReactNode, useEffect, useMemo, useState } from "react";
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
  const currentTheme = useMemo(
    () => getTheme("orangered", themeMode),
    [themeMode]
  );

  // -------------------------------Functions----------------------------------//
  const selectTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  const toggleSidebarState = () => {
    const newState = isSmallScreen
      ? sidebarState === "closed"
        ? "open-expanded"
        : "closed"
      : sidebarState === "open-mini"
      ? "open-expanded"
      : "open-mini";

    if (newState !== sidebarState) {
      setSidebarState(newState);
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

  const isMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );
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

  // Handle back button for fullscreen mode
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (playerMode === "fullscreen") {
        // Prevent navigation
        event.preventDefault();

        // Exit fullscreen mode
        setPlayerMode("mini");

        // Push the current state back to history to prevent navigation
        window.history.pushState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    };

    // Listen for the browser back button (popstate)
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Cleanup listener on component unmount
      window.removeEventListener("popstate", handlePopState);
    };
  }, [playerMode, setPlayerMode]);

  return (
    <LayoutContext.Provider
      value={{
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,
        isMobileDevice,
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
