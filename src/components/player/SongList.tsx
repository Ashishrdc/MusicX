import { Box } from "@mui/material";
import { Song } from "../../constants/interfaces/song.interface"; // Import your Song type
import { usePlayer } from "../../context/player/PlayerContext";
import { BoxSongCard } from "../cards/BoxSongCard";

import { RectangularSongCard } from "../cards/RectangularSongCard";
import { useLayout } from "../../context/layout/LayoutContext";
interface SongList {
  songs: Song[];
}

export const SongList = ({ songs }: SongList) => {
  const { setCurrentSong } = usePlayer();
  const { viewMode } = useLayout();

  const handlePlaySong = (song: Song) => {
    // Logic to play the song
    setCurrentSong(song);
    console.log(`Playing song: ${song.name}`);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns:
          viewMode === "grid"
            ? {
                xs: "repeat(auto-fit, minmax(120px, 1fr))", // 2 columns with min 120px width
                sm: "repeat(auto-fit, minmax(140px, 1fr))", // 3 columns with min 140px width
                md: "repeat(auto-fit, minmax(160px, 1fr))", // 4 columns with min 160px width
                lg: "repeat(auto-fit, minmax(180px, 1fr))", // 5 columns with min 180px width
              }
            : viewMode === "list"
            ? {
                xs: "repeat(1, 1fr)", // 2 columns for extra small screens
                sm: "repeat(1, 1fr)", // 3 columns for small screens
                md: "repeat(2, 1fr)", // 4 columns for medium screens
                lg: "repeat(3, 1fr)", // 5 columns for large screens
              }
            : "none",
        paddingRight: 2,
      }}
    >
      {songs.map((song) =>
        viewMode === "list" ? (
          <RectangularSongCard
            key={song.id}
            song={song}
            onPlay={handlePlaySong}
          />
        ) : (
          <BoxSongCard key={song.id} song={song} onPlay={handlePlaySong} />
        )
      )}
    </Box>
  );
};
