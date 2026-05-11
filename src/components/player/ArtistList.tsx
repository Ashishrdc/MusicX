{/* Added by Yugant N (05-2026), Add Artist List */}

import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ArtistList = ({ artists }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {artists.map((artist) => (
        <Box
          key={artist.id}
          onClick={() => navigate(`/artist/${artist.id}`)}
          sx={{ cursor: "pointer", width: 150 }}
        >
          <img src={artist.image[2]?.url} style={{ width: "100%" }} />
          <div>{artist.name}</div>
        </Box>
      ))}
    </Box>
  );
};