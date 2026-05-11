{/* Added by Yugant N (05-2026), Artist Page */}

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../util/axios/axiosInstance";
import { AlbumList } from "../components/player/AlbumList";
import {
  Box,
  Typography,
  Skeleton,
  alpha,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import { useLayout } from "../context/layout/LayoutContext";

interface Album {
  id: string;
  name: string;
  image: { url: string }[];
  year?: number;
}

export const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artistName, setArtistName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isSmallScreen } = useLayout();

  useEffect(() => {
    const fetchAlbums = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/artists/${id}/albums`);
        const data = res.data?.data;
        setAlbums(data?.albums || []);
        // grab artist name if the API returns it
        setArtistName(data?.name || data?.artistName || "");
      } catch (error) {
        console.error("Error fetching artist albums:", error);
        setAlbums([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [id]);

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 }, maxWidth: 900, mx: "auto" }}>

      {/* Back */}
      <Tooltip title="Go back">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mb: 2, "&:hover": { color: "primary.main" } }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
      </Tooltip>

      {/* Header */}
      <Box
        sx={{
          mb: 3,
          pb: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          letterSpacing={2}
          color="primary"
          sx={{ textTransform: "uppercase" }}
        >
          Artist
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mt: 0.5, flexWrap: "wrap" }}>
          <Typography variant={isSmallScreen ? "h5" : "h4"} fontWeight={800} letterSpacing={-0.5}>
            {artistName || "Albums"}
          </Typography>

          {!loading && albums.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              {albums.length} {albums.length === 1 ? "album" : "albums"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Content */}
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i}>
              <Skeleton
                variant="rounded"
                sx={{ width: "100%", aspectRatio: "1/1", borderRadius: 3 }}
              />
              <Skeleton variant="text" width="70%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="40%" />
            </Box>
          ))}
        </Box>
      ) : albums.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 10,
            gap: 2,
            opacity: 0.4,
          }}
        >
          <AlbumRoundedIcon sx={{ fontSize: 64 }} />
          <Typography variant="body1" fontWeight={600}>
            No albums found
          </Typography>
        </Box>
      ) : (
        <AlbumList albums={albums} />
      )}
    </Box>
  );
};