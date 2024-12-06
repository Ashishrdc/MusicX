import { Box } from "@mui/material";
import { SearchResult } from "../components/search/SearchResults";
import { MediaSection } from "../components/sections/MediaSection";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <MediaSection
        title="Home"
        subtitle="My sweet home."
        containerStyles={{ height: 100 }}
      ></MediaSection>
      <SearchResult />
    </Box>
  );
};

export default Home;
