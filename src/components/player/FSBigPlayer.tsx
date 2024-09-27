import { Box, Typography, Grid, IconButton } from "@mui/material";
import { useState } from "react";

export const FSBigPlayer = () => {
  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ flex: 1 }}>
        {/* Left Column: Album Art */}
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="album-art.jpg"
            alt="Album Art"
            style={{ width: "80%", maxHeight: "80%" }}
          />
        </Grid>

        {/* Right Column: Song Info & Lyrics */}
        <Grid
          item
          xs={8}
          sx={{ padding: 3, display: "flex", flexDirection: "column" }}
        >
          {/* Song Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">Song Title</Typography>
            <Typography variant="subtitle1">Artist Name</Typography>
          </Box>

          {/* Toggle Lyrics Button */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => setShowLyrics(!showLyrics)}>
              {/* Icon for lyrics toggle */}
            </IconButton>
          </Box>

          {/* Lyrics */}
          {showLyrics && (
            <Box
              sx={{
                flex: 2,
                overflowY: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                padding: 2,
              }}
            >
              <Typography variant="body1">
                {/* Lyrics content */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Static Player Controls at the bottom */}
      <Box
        sx={{
          height: "60px",
          backgroundColor: "grey.900",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Player controls */}
        <IconButton>Play/Pause</IconButton>
      </Box>
    </Box>
  );
};
