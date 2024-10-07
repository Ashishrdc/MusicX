import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useLayout } from "../../context/layout/LayoutContext";
import { Box, Modal, Paper, Slide } from "@mui/material";
import { Footer } from "./Footer";
import { SearchBar } from "../search/SearchBar";
import { FSLayout } from "./FSLayout";
import { Lyrics } from "../player/Lyrics";
import { FSSections } from "./FSSections";
import { CenteredFlexBox } from "../common/box/CenteredFlexBox";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import { FSPlayer } from "../player/FSPlayer";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { sidebarState, isSmallScreen, searchMode, toggleSidebarState } =
    useLayout();

  const sections = [
    {
      id: "lyrics",
      title: <LyricsRoundedIcon />,
      component: <Lyrics />,
    },
    {
      id: "section3",
      title: <QueueMusicRoundedIcon />,
      component: <CenteredFlexBox>Section 3</CenteredFlexBox>,
    },
  ];

  if (isSmallScreen)
    sections.unshift({
      id: "player",
      title: <PlayArrowRoundedIcon />,
      component: <MobilePlayer />,
    });

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
            position: "relative",
            height: "100dvh",
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
          <Box>
            <Footer />
            <FSLayout>
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                }}
              >
                {!isSmallScreen && <FSPlayer />}
                <FSSections sections={sections} />
              </Box>
            </FSLayout>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
