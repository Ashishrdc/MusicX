import { Box } from "@mui/material";
import { SearchBar } from "../search/SearchBar";
import { ThemeToggle } from "../buttons/ThemeToggle";
import { SidebarToggle } from "../buttons/SidebarToggle";
import { useLayout } from "../../context/layout/LayoutContext";
import { CustomTitle } from "../common/title/CustomTitle";
import { SearchToggle } from "../buttons/SearchToggle";

export const Navbar = () => {
  const { isSmallScreen } = useLayout();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        height: isSmallScreen ? 64 : "100%",
        paddingX: 0.5,
        width: "100%",
        gap: 2,
      }}
    >
      {/* SidebarToggle or Title based on screen size */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!isSmallScreen ? <SidebarToggle /> : <CustomTitle />}
      </Box>

      {/* SearchBar (hidden on small screens) */}
      {!isSmallScreen && <SearchBar />}

      {/* Right-side controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {isSmallScreen && <SearchToggle />}
        <ThemeToggle />
        {isSmallScreen && <SidebarToggle />}
      </Box>
    </Box>
  );
};
