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
        justifyContent: "center",
        transition: "all 0.3s ease",
        width: "100%",
        height: 64,
        gap: 2,
      }}
    >
      {/* gradient="linear-gradient(90deg, orange, #ff6347)" */}
      <Box>{(!isSmallScreen && <SidebarToggle />) || <CustomTitle />}</Box>
      <Box sx={{ width: "100%" }}>{!isSmallScreen && <SearchBar />}</Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {isSmallScreen && <SearchToggle />}
        <ThemeToggle />
        {isSmallScreen && <SidebarToggle />}
      </Box>
    </Box>
  );
};
