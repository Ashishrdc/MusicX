import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { SongsApiResponse } from "../../constants/interfaces/api.responses";
import { Song } from "../../constants/interfaces/song.interface";
import { ViewToggle } from "../buttons/ViewToggle";
import { SongList } from "../player/SongList";
import { useLayout } from "../../context/layout/LayoutContext";
import axiosInstance from "../../util/axios/axiosInstance";

export const SearchResult = () => {
  const { searchQuery } = useLayout();
  const [songResult, setSongResult] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axiosInstance.get<SongsApiResponse>(
          `/api/search/songs?query=${searchQuery}`
        );
        setSongResult(response.data.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    const delayTimer = setTimeout(() => {
      if (searchQuery) {
        fetchSongs();
      }
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  return (
    <Box sx={{ height: "100%", width: "100%", overflowY: "auto" }}>
      {songResult.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginX: 1,
            paddingX: 0.5,
          }}
        >
          <Typography variant="h6" sx={{ fontStyle: "italic" }}>
            {searchQuery.length > 0 && `results for ${searchQuery.trim()},`}
          </Typography>
          <ViewToggle />
        </Box>
      )}
      <SongList songs={songResult} />
    </Box>
  );
};
