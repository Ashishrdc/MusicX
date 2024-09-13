import { Box } from "@mui/material";
import { SearchResult } from "../components/search/SearchResults";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* <SearchResult /> */}
      <SearchResult />
    </Box>
  );
};

export default Home;
