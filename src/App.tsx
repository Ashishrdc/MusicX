import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PlayerProvider } from "./context/player/PlayerProvider";
import { LayoutProvider } from "./context/layout/LayoutProvider";
import { MainLayout } from "./components/layout/MainLayout";
import { lazy, Suspense } from "react";
import "./App.css";
import { SearchResult } from "./components/search/SearchResults";
import { CenteredFlexBox } from "./components/common/box/CenteredFlexBox";
import { getRandomAnimation } from "./util/getRandomAnimation";

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
                <Route path="/playlist" element={<NotFound />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </BrowserRouter>
      </LayoutProvider>
    </PlayerProvider>
  );
}

export default App;
