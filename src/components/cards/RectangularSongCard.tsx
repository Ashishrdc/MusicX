import { Box, Typography, Paper } from "@mui/material";
import { SongCardProps } from "../../constants/interfaces/card.interface";
import { PlayPauseButton } from "../buttons/PlayPauseButton";
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
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "60px auto 75px",
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
            minWidth: 0, // Ensures that the text container can shrink
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden", // Prevents the text from overflowing
          }}
        >
          <Typography noWrap variant="body2" fontWeight={600}>
            {he.decode(song.name)}
          </Typography>
          <Typography noWrap variant="subtitle2" color="text.secondary">
            {song.artists.primary
              .map((artist) => he.decode(artist.name))
              .join(", ")}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {formatSecondsToTime(song.duration)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayPauseButton song={song} />
        </Box>
      </Box>
    </Paper>
  );
};
