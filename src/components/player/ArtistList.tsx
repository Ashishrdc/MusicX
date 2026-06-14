{
  /* Added by Yugant N (05-2026), Add Artist List */
}

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

export const ArtistList = ({ artists }: ArtistListProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:
          artists.length > 5
            ? {
                xs: "repeat(auto-fit, minmax(120px, 1fr))", // 2 columns with min 120px width
                sm: "repeat(auto-fit, minmax(140px, 1fr))", // 3 columns with min 140px width
                md: "repeat(auto-fit, minmax(160px, 1fr))", // 4 columns with min 160px width
                lg: "repeat(auto-fit, minmax(180px, 1fr))", // 5 columns with min 180px width
              }
            : {
                // When there are less result
                xs: "repeat(auto-fit, minmax(120px, 1fr))", // 2/3 columns when small screens
                sm: "repeat(4, 1fr)", // 4 columns on small screens
                md: "repeat(5, 1fr)", // 5 columns on medium screens
                lg: "repeat(6, 1fr)", // 6 columns on large screens when there are few songs
              },
        transition: "all 0.3s ease",
        padding: 1,
        marginBottom: 1,
        gap: 1,
      }}
    >
      {artists.map((artist) => (
        <Box
          key={artist.id}
          onClick={() => navigate(`/artist/${artist.id}`)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            p: 0.5,
            width: "100%",
            height: "fit-content",
            overflow: "hidden",
            position: "relative",
            marginBottom: 0.5,
            borderRadius: 1,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              backgroundColor: "action.hover",
              cursor: "pointer",
            },
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
