import { Box, Slide, Typography } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";
import { routes } from "../../constants/routes/NavRoutes";
import { CustomTitle } from "../common/title/CustomTitle";
import { LinkWrapper } from "./LinkWrapper";

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
          <LinkWrapper key={name} to={path} onClick={handleClick}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
            <Slide
              in={isExpanded}
              direction={"right"}
              mountOnEnter
              unmountOnExit
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </Slide>
          </LinkWrapper>
        ))}
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
