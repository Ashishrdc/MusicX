{
  /* Added by Yugant N (05-2026), Add Album List */
}

import { Box, Typography } from "@mui/material";
import he from "he";
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

export const AlbumList = ({ albums }: AlbumListProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:
          albums.length > 5
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
      {albums.map((album) => (
        <Box
          key={album.id}
          onClick={() => navigate(`/album/${album.id}`)}
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
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={album.image[2]?.url || "/placeholder-image.png"}
              alt={album.name}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%",
              gap: 0.5,
            }}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography noWrap variant="body2" fontWeight={600}>
                {he.decode(album.name)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
