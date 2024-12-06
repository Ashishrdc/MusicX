import { ReactNode } from "react";
import { SearchResult } from "../../components/search/SearchResults";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";

export interface RouteConfig {
  path: string;
  name: string;
  icon: ReactNode;
  element: ReactNode;
}

export const routes: RouteConfig[] = [
  {
    path: "/home",
    name: "Home",
    icon: <HomeIcon />,
    element: <Home />,
  },
  {
    path: "/search",
    name: "Search",
    icon: <SearchIcon />,
    element: <SearchResult />,
  },
  {
    path: "/playlist",
    name: "Playlist",
    icon: <PlaylistPlayIcon />,
    element: <NotFound />,
  },
];
