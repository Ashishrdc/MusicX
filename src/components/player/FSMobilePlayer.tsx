import { Box, Button, Slide, Typography } from "@mui/material";
import { useState } from "react";
import { usePlayer } from "../../context/player/PlayerContext";
import { PlayerControls } from "./PlayerControls";
import { Seekbar } from "./Seekbar";
import he from "he";

export const FSMobilePlayer = () => {
  const [showLyrics, setShowLyrics] = useState(false);
  const { currentSong } = usePlayer();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        height: "100vh",
        padding: 2,
      }}
    >
      {/* Song Artwork */}
      <Box
        sx={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Album Art */}
        <img
          src={currentSong?.image[2].url}
          alt="Album Art"
          style={{ maxHeight: "100%", objectFit: "contain" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          noWrap
          variant="h1"
          fontWeight={600}
          sx={{
            overflow: "hidden",
          }}
        >
          {currentSong && he.decode(currentSong.name)}
        </Typography>
        <Typography
          noWrap
          variant="h2"
          color="text.secondary"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {currentSong?.artists.primary
            .map((artist) => he.decode(artist.name))
            .join(", ")}
        </Typography>
      </Box>
      {/* Player Controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
          gap: 3,
        }}
      >
        {/* Add play, pause, next, previous buttons here */}

        <Seekbar />
        <PlayerControls />
      </Box>

      {/* Toggle Lyrics Button */}
      <Button
        onClick={() => setShowLyrics(!showLyrics)}
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {showLyrics ? "Hide Lyrics" : "Show Lyrics"}
      </Button>

      {/* Slide-up Lyrics */}
      <Slide direction="up" in={showLyrics} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: 2,
            overflowY: "auto",
          }}
        >
          <Button
            onClick={() => setShowLyrics(!showLyrics)}
            sx={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {showLyrics ? "Hide Lyrics" : "Show Lyrics"}
          </Button>
          <Typography variant="body1" color="white">
            {/* Lyrics content */}
            Lyrics go here...
          </Typography>
        </Box>
      </Slide>
    </Box>
  );
};
