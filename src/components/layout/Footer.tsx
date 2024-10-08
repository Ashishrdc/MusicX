import { Box, Divider, Slide, useTheme } from "@mui/material";
import { MiniPlayer } from "../player/MiniPlayer";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLayout } from "../../context/layout/LayoutContext";
import { FSPlayer } from "../player/FSPlayer";
import { FSLayout } from "./FSLayout";
import { FSSections } from "./FSSections";

export const Footer = () => {
  const { currentSong } = usePlayer();
  const { playerMode, isSmallScreen } = useLayout();
  const theme = useTheme();

  return (
    <>
      <Slide
        direction={currentSong || playerMode === "mini" ? "right" : "up"}
        in={Boolean(currentSong)}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          {playerMode === "mini" && <MiniPlayer />}
        </Box>
      </Slide>
      <FSLayout>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            padding: isSmallScreen ? 0.5 : 1,
            gap: 3,
          }}
        >
          {!isSmallScreen && (
            <Box
              sx={{
                display: "flex",
                width: "60%",
                maxWidth: "70%",
              }}
            >
              <FSPlayer />
              <Divider orientation="vertical" flexItem>
                <Box
                  sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                  }}
                />
              </Divider>
            </Box>
          )}
          <Box sx={{ display: "flex", width: "100%", borderRadius: 5 }}>
            <FSSections />
          </Box>
        </Box>
      </FSLayout>
    </>
  );
};
