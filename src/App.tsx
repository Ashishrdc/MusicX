import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PlayerProvider } from "./context/player/PlayerProvider";
import { LayoutProvider } from "./context/layout/LayoutProvider";
import { MainLayout } from "./components/layout/MainLayout";
import { lazy, Suspense } from "react";
import "./App.css";
import { SearchResult } from "./components/search/SearchResults";
import { CenteredFlexBox } from "./components/common/box/CenteredFlexBox";
import { getRandomAnimation } from "./util/getRandomAnimation";
import { AlbumPage } from "./pages/AlbumPage";
import { ArtistPage } from "./pages/ArtistPage";
import { PlaylistPage } from "./pages/PlaylistPage";
import { PlaylistDetailPage } from "./pages/PlaylistDetailPage";
// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <PlayerProvider>
      <LayoutProvider>
        <BrowserRouter>
          <MainLayout>
            <Suspense
              fallback={
                <CenteredFlexBox>{getRandomAnimation()}</CenteredFlexBox>
              }
            >
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />

                {/* Added by Yugant N (05-2026), to Add new Playlist Page in App */}
                <Route path="/playlist" element={<PlaylistPage />} /> 

                {/* Added by Yugant N (05-2026), to Add new Playlist Detail Page in App (for dynamic routing) */}
                <Route path="/playlist/:id" element={<PlaylistDetailPage/>} />
                
                <Route path="/search" element={<SearchResult />} />
                <Route path="*" element={<NotFound />} />

                {/* Added by Yugant N (05-2026), to Add new Album Page in App */}
                <Route path="/album/:id" element={<AlbumPage/>} />

                {/* Added by Yugant N (05-2026), to Add new Artist Page in App */}
                <Route path="/artist/:id" element={<ArtistPage/>} />
              </Routes>
            </Suspense>
          </MainLayout>
        </BrowserRouter>
      </LayoutProvider>
    </PlayerProvider>
  );
}

export default App;
