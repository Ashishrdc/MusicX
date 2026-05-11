import { Box, Typography, Tooltip } from "@mui/material";
import { PlayerControls } from "./PlayerControls";
import { VolumeControl } from "../buttons/VolumeControl";
import { formatSecondsToTime } from "../../util/helperFunctions";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLayout } from "../../context/layout/LayoutContext";
import { Seekbar } from "./Seekbar";
import { FSPlayerToggle } from "../buttons/FSPlayerToggle";
import { LyricsToggle } from "../buttons/LyricsToggle";
import { AddToPlaylistButton } from "../buttons/AddToPlaylistButton";
import he from "he";

export const MiniPlayer = () => {
  const { currentSong, currentTime, duration, stopAndClose } = usePlayer();
  const { isSmallScreen } = useLayout();

  return (
    <>
      {/* Seekbar */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          overflowX: "clip",
          width: "100%",
          top: 0,
        }}
      >
        <Seekbar />
      </Box>

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: isSmallScreen
            ? "minmax(0, 1fr) auto"
            : "1fr 1fr 1fr",

          alignItems: "center",

          width: "100%",

          mt: 0.5,
          px: 1,
          py: 0.75,

          gap: isSmallScreen ? 1 : 2,

          overflow: "hidden",
        }}
      >
        {/* Left Section - Column 1 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            overflow: "hidden",

            minWidth: 0,

            gap: 1,
          }}
        >
          {/* Album Art */}
          <Box
            sx={{
              height: 50,
              width: 50,
              borderRadius: 1,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={currentSong?.image[1].url}
              alt={currentSong?.name}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Box>

          {/* Song Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              overflow: "hidden",

              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              noWrap
              variant="body2"
              fontWeight={600}
              sx={{ overflow: "hidden" }}
            >
              {(currentSong && he.decode(currentSong.name)) || "No Song Playing"}
            </Typography>
            <Typography
              noWrap
              variant="subtitle2"
              color="text.secondary"
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
            >
              {currentSong?.artists.primary
                .map((artist) => he.decode(artist.name))
                .join(", ")}
            </Typography>
          </Box>

          {/* Close button on small screens — sits next to song info */}
          {/* {isSmallScreen && (
            <CustomButton
              onClick={stopAndClose}
              hover={false}
              color="error"
              padding={0}
              sx={{ flexShrink: 0 }}
            >
              <CloseRoundedIcon fontSize="small" />
            </CustomButton>
          )} */}
        </Box>

        {/* Center Section - Column 2 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "flex-end" : "center",
            alignItems: "center",
          }}
        >
          <PlayerControls />
        </Box>

        {/* Right Section - Column 3 (large screens only) */}
        {!isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {/* Time display */}
            <Box sx={{ display: "flex", minWidth: 40, textAlign: "right" }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={600}
              >
                {`${formatSecondsToTime(currentTime)} / ${formatSecondsToTime(duration)}`}
              </Typography>
            </Box>

            <VolumeControl />

            {/* Added by Yugant N (05-2026), Tooltip added */}
            {currentSong &&
              <Tooltip title="Add to playlist" placement="top">
                <Box>
                  <AddToPlaylistButton
                    song={currentSong} /></Box></Tooltip>}

            <Tooltip title="Lyrics" placement="top">
              <Box>
                <LyricsToggle />
              </Box>
            </Tooltip>

            {/* ---------------------------- */}

            <FSPlayerToggle />

            {/* Close button on large screens */}
            {/* <CustomButton onClick={stopAndClose} hover={false} color="error">
              <CloseRoundedIcon fontSize="small" />
            </CustomButton> */}
          </Box>
        )}
      </Box>
    </>
  );
};