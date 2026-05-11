import { ReactNode } from "react";
import { Sidebar } from "../navigation/Sidebar";
import { Navbar } from "../navigation/Navbar";
import { useLayout } from "../../context/layout/LayoutContext";
import { Box, Modal, Paper, Slide, Collapse, useTheme } from "@mui/material";
import { Footer } from "./Footer";
import { SearchBar } from "../search/SearchBar";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const {
    sidebarState,
    isSmallScreen,
    searchMode,
    playerMode,
    themeMode,
    toggleSidebarState,
  } = useLayout();
  const { dominantColor } = usePlayer();
  const theme = useTheme();

  /* Added by Yugant N (05-2026), to check /search location to show/hide SearchBar  */
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.8s ease",
        backgroundColor: playerMode === "fullscreen" ? dominantColor : "none",
        position: "relative",
        overflowX: "hidden",
        height: "100dvh",
      }}
    >
      {/* Semi-transparent overlay */}
      {playerMode === "fullscreen" && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.35)"
                : "rgba(0, 0, 0, 0.3)",
            pointerEvents: "none",
            zIndex: 2,
            inset: 0,
          }}
        />
      )}

      {/* Container for sidebar and main content */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar Modal */}
        {isSmallScreen && (
          <Modal
            open={sidebarState === "open-expanded"}
            onClose={toggleSidebarState}
          >
            <Slide
              direction="right"
              in={sidebarState === "open-expanded"}
              mountOnEnter
              unmountOnExit
            >
              <Paper
                elevation={3}
                square
                sx={{
                  height: "100%",
                  width: "240px",
                  position: "absolute",
                }}
              >
                <Sidebar />
              </Paper>
            </Slide>
          </Modal>
        )}

        {/* Sidebar */}
        <Paper
          elevation={3}
          square
          sx={{
            width:
              !isSmallScreen && sidebarState === "open-expanded"
                ? 200
                : sidebarState === "open-mini"
                  ? 70
                  : 0,
            overflowX: "hidden",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <Sidebar />
        </Paper>

        {/* Main content area */}

        {/* Modified by Yugant N (05-2026), to Show/Hide Search Bar when location == /search */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minHeight: 0,
          }}
        >
          {/* Navbar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "background.paper"
                  : "transparent",
            }}
          >
            {/* NAVBAR */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: 70,
                width: "100%",
                px: 1,
              }}
            >
              <Navbar />
            </Box>

            {/* SEARCHBAR */}
            <Collapse
              in={isSearchPage}
              timeout={350}
              unmountOnExit
            >
              <Box
                sx={{
                  width: "100%",
                  px: 1,
                  pb: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >

                <SearchBar />
              </Box>
            </Collapse>
          </Box>

          {/* ------------------------------------ */}

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 1,
              minHeight: 0,
            }}
          >
            {children}
          </Box>

          {/* Bottom Bar */}
          <Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
