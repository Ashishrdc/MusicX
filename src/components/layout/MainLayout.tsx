import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useLayout } from "../../context/layout/LayoutContext";
import { Box, Modal, Paper, Slide } from "@mui/material";
import { Footer } from "./Footer";
import { SearchBar } from "../search/SearchBar";
import { usePlayer } from "../../context/player/PlayerContext";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { sidebarState, isSmallScreen, toggleSidebarState, searchMode } =
    useLayout();
  const { currentSong } = usePlayer();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: isSmallScreen ? "100dvh" : "100vh",
      }}
    >
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
                  left: 0,
                  top: 0,
                  zIndex: 1300,
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
                  ? 80
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
            height: isSmallScreen ? "100dvh" : "100vh",
          }}
        >
          {/* Navbar */}
          <Box
            sx={{
              padding: isSmallScreen ? 0.5 : 1,
              width: "100%",
              top: 0,
            }}
          >
            {isSmallScreen && searchMode ? <SearchBar /> : <Navbar />}
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: isSmallScreen ? 1 : 2,
            }}
          >
            {children}
          </Box>

          {/* Bottom Bar */}
          <Box>{currentSong && <Footer />}</Box>
        </Box>
      </Box>
    </Box>
  );
};
