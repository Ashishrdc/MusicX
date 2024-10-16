import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useLayout } from "../../context/layout/LayoutContext";
import { Box, Modal, Paper, Slide } from "@mui/material";
import { Footer } from "./Footer";
import { SearchBar } from "../search/SearchBar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { sidebarState, isSmallScreen, searchMode, toggleSidebarState } =
    useLayout();

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
            position: "relative",
            height: "100dvh",
          }}
        >
          {/* Navbar */}
          <Paper
            elevation={1}
            square
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              height: isSmallScreen ? 64 : 80,
              width: "100%",
              padding: 1,
              top: 0,
            }}
          >
            {searchMode ? <SearchBar /> : <Navbar />}
          </Paper>

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
