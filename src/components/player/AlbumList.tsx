{/* Added by Yugant N (05-2026), Add Album List */}

import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AlbumList = ({ albums }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {albums.map((album) => (
        <Box
          key={album.id}
          onClick={() => navigate(`/album/${album.id}`)}
          sx={{ cursor: "pointer", width: 150 }}
        >
          <img src={album.image[2]?.url} style={{ width: "100%" }} />
          <div>{album.name}</div>
        </Box>
      ))}
    </Box>
  );
};