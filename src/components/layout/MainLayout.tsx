import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useLayout } from "../../context/layout/LayoutContext";
import { Box, Modal, Paper, Slide } from "@mui/material";
import { Footer } from "./Footer";
import { SearchBar } from "../search/SearchBar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { sidebarState, isSmallScreen, toggleSidebarState, searchMode } =
    useLayout();

  return (
    <Box
      sx={{
        height: isSmallScreen ? "100dvh" : "100vh",
        display: "flex",
        flexDirection: "column",
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
          <Box sx={{ padding: 1 }}>
            {isSmallScreen && searchMode ? <SearchBar /> : <Navbar />}
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
            }}
          >
            {children}
          </Box>

          {/* Bottom Bar */}
          <Box sx={{ position: "relative", backgroundColor: "green" }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
