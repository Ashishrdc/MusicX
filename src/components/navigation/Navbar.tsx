import { Box, Fade, Slide } from "@mui/material";
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
        width: "100%",
        gap: 2,
      }}
    >
      {/* SidebarToggle or Title based on screen size */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Fade in={!isSmallScreen} timeout={300}>
          <Box>{!isSmallScreen && <SidebarToggle />}</Box>
        </Fade>

        <Slide
          in={isSmallScreen}
          direction="right"
          timeout={450}
          mountOnEnter
          unmountOnExit
        >
          <Box>{isSmallScreen && <CustomTitle />}</Box>
        </Slide>
      </Box>

      {/* CENTER SPACE */}
      <Box sx={{ flex: 1 }} />

      {/* Right-side controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {/* Animate SearchToggle */}
        <Fade in={isSmallScreen} timeout={300}>
          <Box>{isSmallScreen && <SearchToggle />}</Box>
        </Fade>

        <ThemeToggle />

        {/* Animate SidebarToggle (small screens) */}
        <Fade in={isSmallScreen} timeout={300}>
          <Box>{isSmallScreen && <SidebarToggle />}</Box>
        </Fade>
      </Box>
    </Box>
  );
};
