import { alpha, Box, Chip, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Song } from "../../constants/api/interfaces/song";

import { ViewToggle } from "../buttons/ViewToggle";
import { SongList } from "../player/SongList";
import { ArtistList } from "../player/ArtistList";
import { AlbumList } from "../player/AlbumList";

import { useLayout } from "../../context/layout/LayoutContext";

import axiosInstance from "../../util/axios/axiosInstance";

import { CenteredFlexBox } from "../common/box/CenteredFlexBox";
import { Equalizer } from "../common/loading";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AlbumIcon from "@mui/icons-material/Album";
import MicIcon from "@mui/icons-material/Mic";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Album } from "../../constants/api/interfaces/album";
import { Artist } from "../../constants/api/interfaces/artist";

export const SearchResult = () => {
  const { searchQuery } = useLayout();

  {
    /* Added by Yugant N (05-2026) Edited & fixed minor bugs by Ashish*/
  }
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCompleted, setSearchCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Clear old results when search becomes empty
    if (!searchQuery.trim()) {
      setSongs([]);
      setAlbums([]);
      setArtists([]);
      setSearchCompleted(false); // Added to show conent once a search is fully completed
      return;
    }

    const fetchAll = async () => {
      try {
        setLoading(true);

        const [songsRes, albumsRes, artistsRes] = await Promise.all([
          axiosInstance.get(`/api/search/songs?query=${searchQuery}`),
          axiosInstance.get(`/api/search/albums?query=${searchQuery}`),
          axiosInstance.get(`/api/search/artists?query=${searchQuery}`),
        ]);

        setSongs(songsRes.data.data.results || []);
        setAlbums(albumsRes.data.data.results || []);
        setArtists(artistsRes.data.data.results || []);
      } catch (error) {
        console.log("Search Error:", error);
      } finally {
        setLoading(false);
        setSearchCompleted(true);
      }
    };

    // Debounce search requests
    const delayTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchAll();
      }
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  const hasResults =
    songs.length > 0 || albums.length > 0 || artists.length > 0;

  return (
    /* Modified by Yugant N (05-2026), content to display on /search instead of blank page */
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
        p: 1.5,
      }}
    >
      {!searchCompleted && !loading && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Search Music
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "500px",
              width: "100%",
              textAlign: "center",
              mb: 4,
            }}
          >
            Search for your favorite songs, artists, albums and playlists using
            the search bar above.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
            sx={{
              maxWidth: "600px",
            }}
          >
            {["Arijit Singh", "KK", "Lofi", "Workout", "Taylor Swift"].map(
              (item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    mb: 1,
                  }}
                />
              ),
            )}
          </Stack>
        </Box>
      )}

      {loading && (
        <CenteredFlexBox>
          <Equalizer />
        </CenteredFlexBox>
      )}

      {!loading && hasResults && (
        <>
          {/* Search Header */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              mb: 4,
              p: 3,
              borderRadius: 8,
              background: (theme) =>
                `linear-gradient(
            135deg,
            ${alpha(theme.palette.primary.main, 0.18)},
            ${alpha(theme.palette.primary.main, 0.04)}
          )`,
              border: (theme) =>
                `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: (theme) => alpha(theme.palette.primary.main, 0.12),
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: "text.secondary",
                  }}
                >
                  SEARCH RESULTS
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mt: 0.5,
                  }}
                >
                  {searchQuery.trim()}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.75 }}
                >
                  {songs.length + albums.length + artists.length} matches found
                </Typography>
              </Box>

              <ViewToggle />
            </Box>
          </Box>

          {/* Songs */}
          {songs.length > 0 && (
            <Box
              sx={{
                mb: 4,
                overflow: "hidden",
                borderRadius: 6,
                border: (theme) =>
                  `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                background: (theme) =>
                  `linear-gradient(
              180deg,
              ${alpha(theme.palette.primary.main, 0.08)},
              transparent
            )`,
                backdropFilter: "blur(12px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 2,
                  borderBottom: (theme) =>
                    `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                }}
              >
                <MusicNoteIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  Songs
                </Typography>
              </Box>

              <Box sx={{ p: 1 }}>
                <SongList songs={songs} />
              </Box>
            </Box>
          )}

          {/* Albums */}
          {albums.length > 0 && (
            <Box
              sx={{
                mb: 4,
                overflow: "hidden",
                borderRadius: 6,
                border: (theme) =>
                  `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
                background: (theme) =>
                  `linear-gradient(
              180deg,
              ${alpha(theme.palette.secondary.main, 0.08)},
              transparent
            )`,
                backdropFilter: "blur(12px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 2,
                  borderBottom: (theme) =>
                    `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                }}
              >
                <AlbumIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  Albums
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                <AlbumList albums={albums} />
              </Box>
            </Box>
          )}

          {/* Artists */}
          {artists.length > 0 && (
            <Box
              sx={{
                mb: 4,
                overflow: "hidden",
                borderRadius: 6,
                border: (theme) =>
                  `1px solid ${alpha(theme.palette.info.main, 0.15)}`,
                background: (theme) =>
                  `linear-gradient(
              180deg,
              ${alpha(theme.palette.info.main, 0.08)},
              transparent
            )`,
                backdropFilter: "blur(12px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 3,
                  py: 2,
                  borderBottom: (theme) =>
                    `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                }}
              >
                <MicIcon />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                  }}
                >
                  Artists
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                <ArtistList artists={artists} />
              </Box>
            </Box>
          )}
        </>
      )}

      {searchCompleted && !loading && !hasResults && (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: 520,
              width: "100%",
              textAlign: "center",
              p: 5,
              borderRadius: 8,
              background: (theme) =>
                `linear-gradient(
            180deg,
            ${alpha(theme.palette.background.paper, 0.95)},
            ${alpha(theme.palette.background.paper, 0.75)}
          )`,
              border: (theme) =>
                `1px solid ${alpha(theme.palette.divider, 0.7)}`,
              backdropFilter: "blur(20px)",
            }}
          >
            <ManageSearchIcon fontSize="large" sx={{ mb: 1 }} />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
              }}
            >
              Nothing found
            </Typography>

            <Typography variant="body1" color="text.secondary">
              We couldn't find anything matching{" "}
              <strong>"{searchQuery.trim()}"</strong>.
              <br />
              Try searching for another song, album, or artist.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
