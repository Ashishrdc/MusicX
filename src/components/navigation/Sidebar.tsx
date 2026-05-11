import { Box, Slide, Typography, Tooltip } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";
import { routes } from "../../constants/routes/NavRoutes";
import { CustomTitle } from "../common/title/CustomTitle";
import { LinkWrapper } from "./LinkWrapper";
import { PaletteSelector } from "../palette/PaletteSelector";

export const Sidebar = () => {
  const { sidebarState, isSmallScreen, toggleSidebarState } = useLayout();

  const isExpanded = sidebarState === "open-expanded";

  const handleClick = () => {
    if (isSmallScreen) {
      toggleSidebarState("closed");
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          textAlign: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CustomTitle />
      </Box>

      {/* Sidebar Navigation */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isExpanded ? "flex-start" : "center",
          flexGrow: 1,
          padding: 2,
          gap: 1.5,
        }}
      >
        {routes.map(({ path, name, icon }) => (

          /* Added by Yugant N (05-2026), to Add Tooltip in Sidebar Toggle */
          <Tooltip
            key={name}
            title={!isExpanded ? name : ""}
            placement="right"
            arrow
          >
            <Box width="100%">
              <LinkWrapper
                to={path}
                onClick={handleClick}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      isExpanded
                        ? "flex-start"
                        : "center",
                    width: "100%",
                    gap: 1.5,
                  }}
                >

                  {/* ICON */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      width: 24,
                    }}
                  >
                    {icon}
                  </Box>

                  {/* TEXT */}
                  <Slide
                    in={isExpanded}
                    direction="right"
                    mountOnEnter
                    unmountOnExit
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {name}
                    </Typography>
                  </Slide>
                </Box>
              </LinkWrapper>
            </Box>
          </Tooltip>

        ))}

        <Box
          sx={{
            width: "100%",
            mt: 1,
          }}
        >

          {/* Added by Yugant N (05-2026), to Add PaletteSelector in Sidebar */}
          <PaletteSelector />
        </Box>
      </Box>

      {/* Sidebar Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            opacity: isExpanded ? 1 : 0,
            transition: "all 0.8s ease",
          }}
        >
          {isExpanded ? "Made with ❤️" : "❤️"}
        </Typography>
      </Box>
    </Box>
  );
};
