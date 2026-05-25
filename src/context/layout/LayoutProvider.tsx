{/* Modified by Yugant N (05-2026), Add functionality in Layout */}

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

export const LayoutProvider: React.FC<{
  children: ReactNode;
}> = ({
  children,
}) => {

  const theme = useTheme();

  // ---------------- MEDIA QUERIES ---------------- //

  const isSmallScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const isMediumScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );

  const isLargeScreen = useMediaQuery(
    theme.breakpoints.up("md")
  );

  // ---------------- STATES ---------------- //

  const [sidebarState, setSidebarState] =
    useState<SidebarState>(() => {

      const savedSidebarState =
        localStorage.getItem("sidebarState");

      return (
        (savedSidebarState as SidebarState)
        || "open-expanded"
      );
    });

  const [themeMode, setThemeMode] =
    useState<ThemeMode>(() => {

      const savedTheme =
        localStorage.getItem("themeMode");

      return savedTheme
        ? (savedTheme as ThemeMode)
        : "light";
    });

  // OLD themeName state kept for compatibility
  const [themeName, setThemeName] =
    useState<ThemeName>(() => {

      const savedThemeName =
        localStorage.getItem("themeName");

      return savedThemeName
        ? (savedThemeName as ThemeName)
        : "orangered";
    });

  // NEW ACTIVE THEME COLOR
  const [themeColor, setThemeColorState] =
    useState<string>(() => {

      return (
        localStorage.getItem("themeColor")
        || "orangered"
      );
    });

  const [viewMode, setViewMode] =
    useState<ViewMode>(() => {

      const savedViewMode =
        localStorage.getItem("viewMode");

      return savedViewMode
        ? (savedViewMode as ViewMode)
        : "grid";
    });

  const [searchQuery, setSearchQuery] =
    useState<string>("");

  const [searchMode, setSearchMode] =
    useState<boolean>(false);

  const [playerMode, setPlayerMode] =
    useState<PlayerMode>("mini");

  // ---------------- THEME ---------------- //

  const currentTheme = useMemo(() => {

    return getTheme(
      themeColor as ThemeName,
      themeMode
    );

  }, [themeColor, themeMode]);

  // ---------------- FUNCTIONS ---------------- //

  const selectTheme = (
    newTheme: ThemeName
  ) => {

    setThemeName(newTheme);

    setThemeColorState(newTheme);

    localStorage.setItem(
      "themeColor",
      newTheme
    );
  };

  const setThemeColor = (
    color: string
  ) => {

    setThemeColorState(color);

    localStorage.setItem(
      "themeColor",
      color
    );
  };

  const toggleSidebarState = () => {

    const newState =
      isSmallScreen
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

    setThemeMode((prevMode) =>
      prevMode === "light"
        ? "dark"
        : "light"
    );
  };

  const toggleViewMode = () => {

    setViewMode((prevMode) =>
      prevMode === "grid"
        ? "list"
        : "grid"
    );
  };

  const toggleSearchMode = () => {

    setSearchMode((prevMode) =>
      !prevMode
    );
  };

  const toggleFSPlayer = () => {

    playerMode === "mini"
      ? setPlayerMode("fullscreen")
      : setPlayerMode("mini");
  };

  const isMobileDevice = (): boolean => {

    const userAgent =
      navigator.userAgent;

    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      .test(userAgent.toLowerCase());
  };

  // ---------------- EFFECTS ---------------- //

  // SAVE THEME MODE
  useEffect(() => {

    localStorage.setItem(
      "themeMode",
      themeMode
    );

  }, [themeMode]);

  // SAVE VIEW MODE
  useEffect(() => {

    localStorage.setItem(
      "viewMode",
      viewMode
    );

  }, [viewMode]);

  // SAVE THEME NAME
  useEffect(() => {

    localStorage.setItem(
      "themeName",
      themeName
    );

  }, [themeName]);

  // HANDLE SCREEN SIZE
  useEffect(() => {

    if (
      isSmallScreen ||
      playerMode === "fullscreen"
    ) {

      setSidebarState("closed");

    } else {

      const userPreference =
        localStorage.getItem(
          "sidebarState"
        ) as
          | "open-mini"
          | "open-expanded"
          | null;

      setSearchMode(false);

      setSidebarState(
        userPreference
        || "open-expanded"
      );
    }

  }, [
    isSmallScreen,
    playerMode,
  ]);

  // SAVE SIDEBAR STATE
  useEffect(() => {

    if (
      !isSmallScreen &&
      sidebarState !== "closed"
    ) {

      localStorage.setItem(
        "sidebarState",
        sidebarState
      );
    }

  }, [
    sidebarState,
    isSmallScreen,
  ]);

  // HANDLE BACK BUTTON
  useEffect(() => {

    const handlePopState = (
      event: PopStateEvent
    ) => {

      if (
        playerMode === "fullscreen"
      ) {

        event.preventDefault();

        setPlayerMode("mini");

        window.history.pushState(
          null,
          "",
          window.location.pathname
          + window.location.search
        );
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };

  }, [playerMode]);

  // ---------------- PROVIDER ---------------- //

  return (
    <LayoutContext.Provider
      value={{

        // SCREEN
        isSmallScreen,
        isMediumScreen,
        isLargeScreen,

        // HELPERS
        isMobileDevice,

        // STATES
        sidebarState,
        themeMode,
        themeName,
        themeColor,
        viewMode,
        searchMode,
        playerMode,
        searchQuery,

        // SETTERS
        setSearchQuery,
        setThemeColor,

        // ACTIONS
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

        <ScrollbarStyles
          width={8}
          borderRadius={2}
        />

        {children}

      </ThemeProvider>

    </LayoutContext.Provider>
  );
};