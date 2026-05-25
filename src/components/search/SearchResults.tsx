import { Box, Chip, Stack, Typography } from "@mui/material";
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

export const SearchResult = () => {

  const { searchQuery } = useLayout();

  {/* Added by Yugant N (05-2026) */}
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    // Clear old results when search becomes empty
    if (!searchQuery.trim()) {
      setSongs([]);
      setAlbums([]);
      setArtists([]);
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
    songs.length > 0 ||
    albums.length > 0 ||
    artists.length > 0;

  return (

  /* Modified by Yugant N (05-2026), content to display on /search instead of blank page */
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
    >
      {!searchQuery.trim() && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 3,
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
            Search for your favorite songs, artists,
            albums and playlists using the search
            bar above.
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
            {[
              "Arijit Singh",
              "KK",
              "Lofi",
              "Workout",
              "Taylor Swift",
            ].map((item) => (
              <Chip
                key={item}
                label={item}
                sx={{
                  mb: 1,
                }}
              />
            ))}
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              mx: 1,
              px: 0.5,
            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontStyle: "italic",
              }}
            >
              {`Results for "${searchQuery.trim()}"`}
            </Typography>

            <ViewToggle />

          </Box>

          {/* Songs */}
          {songs.length > 0 && (
            <SongList songs={songs} />
          )}

          {/* Albums */}
          {albums.length > 0 && (
            <Box sx={{ mt: 2 }}>

              <Typography variant="h6">
                Albums
              </Typography>

              <AlbumList albums={albums} />

            </Box>
          )}

          {/* Artists */}
          {artists.length > 0 && (
            <Box sx={{ mt: 2 }}>

              <Typography variant="h6">
                Artists
              </Typography>

              <ArtistList artists={artists} />

            </Box>
          )}

        </>
      )}

      {!loading &&
        searchQuery.trim() &&
        !hasResults && (
          <Box
            sx={{
              height: "100%",

              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",

              textAlign: "center",

              px: 2,
            }}
          >

            <Typography
              variant="h6"
            >
              No results found
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 1,
              }}
            >
              Try another search keyword
            </Typography>

          </Box>
        )}

    </Box>
  );
};