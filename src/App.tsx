import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PlayerProvider } from "./context/player/PlayerProvider";
import { LayoutProvider } from "./context/layout/LayoutProvider";
import { MainLayout } from "./components/layout/MainLayout";
import { lazy } from "react";
import "./App.css";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <PlayerProvider>
      <LayoutProvider>
        <MainLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/playlist" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MainLayout>
      </LayoutProvider>
    </PlayerProvider>
  );
}

export default App;
