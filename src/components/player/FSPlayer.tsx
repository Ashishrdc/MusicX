import { Box, Slide, Typography } from "@mui/material";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLayout } from "../../context/layout/LayoutContext";
import { FSPlayerToggle } from "../buttons/FSPlayerToggle";
import he from "he";
import { Seekbar } from "./Seekbar";
import { PlayerControls } from "./PlayerControls";
import { formatSecondsToTime } from "../../util/helperFunctions";

export const FSPlayer = () => {
  const { currentSong, getNextSong, currentTime, duration } = usePlayer();
  const { playerMode } = useLayout();

  const nextSong = getNextSong();

  return (
    <>
      <Slide
        direction="up"
        in={playerMode === "fullscreen"}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "background.paper",
            zIndex: 1400, // Higher for fullscreen :)
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingY: 1,
              paddingX: 2,
            }}
          >
            <Box sx={{}}>
              <Typography variant="body1" noWrap>
                Next Song:{" "}
                {typeof nextSong === "string" ? nextSong : nextSong.name}
              </Typography>
            </Box>
            <FSPlayerToggle />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              flexWrap: "wrap",
              alignItems: {
                xs: "center",
                sm: "flex-start",
              },
              justifyContent: {
                xs: "center",
                sm: "flex-start",
              },
              height: "100vh",
              paddingX: 2,
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: {
                  xs: 300,
                  md: 350,
                },
                maxWidth: "100vw",
                objectFit: "contain",
              }}
            >
              <img
                src={currentSong?.image[2].url}
                alt={currentSong?.name}
                style={{ height: "100%", width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                },
                flexDirection: "column",
                padding: {
                  xs: 1,
                  sm: 3,
                },
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <Typography variant="h1" fontWeight={600}>
                {currentSong && he.decode(currentSong.name)}
              </Typography>
              <Typography variant="h2" color="text.secondary" fontWeight={600}>
                {currentSong?.artists.primary
                  .map((artist) => he.decode(artist.name))
                  .join(", ")}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Seekbar />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {`${formatSecondsToTime(currentTime)}`}
                </Typography>
                <Typography
                  noWrap
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={600}
                >
                  {`${formatSecondsToTime(duration)}`}
                </Typography>
              </Box>
            </Box>
            <Box>
              <PlayerControls />
            </Box>
          </Box>
        </Box>
      </Slide>
    </>
  );
};
