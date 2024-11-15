import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useLayout } from "../../context/layout/LayoutContext";
import { Box, Modal, Paper, Slide, useTheme } from "@mui/material";
import { Footer } from "./Footer";
import { SearchBar } from "../search/SearchBar";
import { usePlayer } from "../../context/player/PlayerContext";

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.8s ease",
        backgroundColor: playerMode === "fullscreen" ? dominantColor : "none",
        position: "relative",
        overflow: "hidden",
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
        {/* Sidebar */}
        {isSmallScreen ? (
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
        ) : (
          <Paper
            elevation={3}
            square
            sx={{
              width:
                sidebarState === "open-expanded"
                  ? 200
                  : sidebarState === "open-mini"
                  ? 70
                  : 0,
              overflow: "hidden",
              transition: "width 0.3s ease",
            }}
          >
            <Sidebar />
          </Paper>
        )}

        {/* Main content area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            height: "100dvh",
          }}
        >
          {/* Navbar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              height: 70,
              width: "100%",
              padding: 1,
              backgroundColor:
                themeMode === "dark" ? "background.paper" : "none",
            }}
          >
            {searchMode ? <SearchBar /> : <Navbar />}
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 1,
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
