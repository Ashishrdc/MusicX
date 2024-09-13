import { Box, Typography } from "@mui/material";
import { PlayerControls } from "./PlayerControls";
import { VolumeControl } from "../buttons/VolumeControl";
import { formatSecondsToTime } from "../../util/helperFunctions";
import { usePlayer } from "../../context/player/PlayerContext";
import { useLayout } from "../../context/layout/LayoutContext";
import he from "he";
import { Seekbar } from "./Seekbar";

export const MusicPlayer = () => {
  const { currentSong, currentTime, duration } = usePlayer();
  const { isSmallScreen } = useLayout();

  return (
    <>
      {/* Seekbar */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          width: "100%",
        }}
      >
        <Seekbar />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isSmallScreen ? "1fr 50px" : "1fr 1fr 1fr",
          alignItems: "center",
          width: "100%",
          gap: 2,
        }}
      >
        {/* Left Section - Column 1 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
            padding: 1,
            overflow: "hidden", // Ensures the content won't overflow
          }}
        >
          <Box
            sx={{
              height: 50,
              width: 50,
              borderRadius: 1,
              overflow: "hidden",
              flexShrink: 0, // Ensures that image doesn't shrink
            }}
          >
            <img
              src={currentSong?.image[1].url}
              alt={currentSong?.name}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Typography
              noWrap
              variant="body2"
              fontWeight={600}
              sx={{
                overflow: "hidden",
              }}
            >
              {(currentSong && he.decode(currentSong.name)) ||
                "No Song Playing"}
            </Typography>
            <Typography
              noWrap
              variant="subtitle2"
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

        {/* Right Section - Column 3 */}
        {!isSmallScreen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              noWrap
              variant="subtitle2"
              color="text.secondary"
              fontWeight={600}
            >
              {`${formatSecondsToTime(currentTime)} / ${formatSecondsToTime(
                duration
              )}`}
            </Typography>
            <VolumeControl />
          </Box>
        )}
      </Box>
    </>
  );
};
