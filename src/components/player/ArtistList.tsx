{/* Added by Yugant N (05-2026), Add Artist List */ }

import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Artist {
  id: string;
  name: string;
  image: {
    url: string;
  }[];
}

interface ArtistListProps {
  artists: Artist[];
}

export const ArtistList = ({
  artists,
}: ArtistListProps) => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {artists.map((artist) => (
        <Box
          key={artist.id}

          onClick={() =>
            navigate(`/artist/${artist.id}`)
          }

          sx={{
            cursor: "pointer",
            width: 150,
          }}
        >
          <img
            src={artist.image[2]?.url}
            alt={artist.name}
            style={{
              width: "100%",
              borderRadius: 999,
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
          />

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {artist.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};