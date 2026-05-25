{/* Added by Yugant N (05-2026), Add Album List */ }

import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Album {
  id: string;
  name: string;
  image: {
    url: string;
  }[];
}

interface AlbumListProps {
  albums: Album[];
}

export const AlbumList = ({
  albums,
}: AlbumListProps) => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {albums.map((album) => (
        <Box
          key={album.id}

          onClick={() =>
            navigate(`/album/${album.id}`)
          }

          sx={{
            cursor: "pointer",
            width: 150,
          }}
        >
          <img
            src={album.image[2]?.url}
            alt={album.name}
            style={{
              width: "100%",
              borderRadius: 8,
            }}
          />

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontWeight: 500,
            }}
          >
            {album.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};