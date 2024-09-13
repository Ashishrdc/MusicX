import { createContext, useContext } from "react";
import {
  SidebarState,
  ThemeMode,
  ThemeName,
  ViewMode,
} from "../../constants/types/common.types";

interface LayoutContextType {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  searchMode: boolean;
  themeMode: ThemeMode;
  themeName: ThemeName;
  viewMode: ViewMode;
  sidebarState: SidebarState;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebarState: (newState: SidebarState) => void;
  toggleTheme: () => void;
  selectTheme: (newTheme: ThemeName) => void;
  toggleViewMode: () => void;
  toggleSearchMode: () => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
