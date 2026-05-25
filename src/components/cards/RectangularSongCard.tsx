import { Box, Typography, Paper } from "@mui/material";
import { SongCardProps } from "../../constants/interfaces/card.interface";
import { PlayPauseButton } from "../buttons/PlayPauseButton";
import { AddToPlaylistButton } from "../buttons/AddToPlaylistButton";
import { formatSecondsToTime } from "../../util/helperFunctions";
import he from "he";

export const RectangularSongCard = ({ song }: SongCardProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 60,
        width: "100%",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          backgroundColor: "action.hover",
          // reveal the playlist button only on hover
          "& .action-buttons": { opacity: 1 },
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          // shrunk the right column a bit to fit two icon buttons comfortably
          gridTemplateColumns: "60px auto 90px",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              opacity: 0,
              transition: "all 0.3s ease",
              transform: "translateY(15%)",
              "&:hover": {
                transform: "translateY(0)",
                backdropFilter: "blur(0.5)",
                opacity: 1,
              },
            }}
          >
            <PlayPauseButton song={song} />
          </Box>
          <img
            src={song?.image[1].url}
            alt={song?.name}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Box>

        <Box
          sx={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Typography noWrap variant="body2" fontWeight={600}>
            {he.decode(song.name)}
          </Typography>
          <Typography noWrap variant="subtitle2" color="text.secondary">
            {song.artists.primary.map((a) => he.decode(a.name)).join(", ")}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {formatSecondsToTime(song.duration)}
          </Typography>
        </Box>

        {/* Right actions — play is always visible, playlist button fades in */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.25,
          }}
        >
          {/* Playlist button hidden until row is hovered */}
          <Box
            className="action-buttons"
            sx={{ opacity: 0, transition: "opacity 0.2s ease" }}
          >
          {/* Added by Yugant N (05-2026), Add Playlist Button */}
            <AddToPlaylistButton song={song} />
          </Box>

          <PlayPauseButton song={song} />
        </Box>
      </Box>
    </Paper>
  );
};