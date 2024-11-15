import Typography from "@mui/material/Typography";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import { Box, useTheme } from "@mui/material";
import { useLayout } from "../../../context/layout/LayoutContext";
import { createGradient } from "../../../util/helperFunctions";

interface CustomTitleProps {
  title?: number | string;
  gradient?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
}

export const CustomTitle = ({
  title,
  gradient,
  fontSize,
  fontWeight,
}: CustomTitleProps) => {
  const theme = useTheme();
  const { sidebarState, isSmallScreen } = useLayout();

  return (
    <Box
      sx={{
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.3s ease",
        "&:hover":
          sidebarState != "open-mini"
            ? {
                transform: "scale(1.05)",
              }
            : {},
      }}
    >
      {/* Full state version */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 70,
          opacity: sidebarState === "open-expanded" || isSmallScreen ? 1 : 0,
          visibility:
            sidebarState === "open-expanded" || isSmallScreen
              ? "visible"
              : "hidden",
          transition: "opacity 0.5s ease, visibility 0.5s ease",
        }}
      >
        <MusicNoteRoundedIcon
          sx={{
            m: 0,
            p: 0,
            fontWeight: fontWeight ? fontWeight : 800,
            fontSize: fontSize ? fontSize : 30,
            transition: "color 0.8s ease",
          }}
        />
        <Typography
          style={{
            userSelect: "none",
            background: gradient ? gradient : "none",
            WebkitBackgroundClip: gradient ? "text" : "none",
            WebkitTextFillColor: gradient ? "transparent" : "none",
            fontWeight: fontWeight ? fontWeight : 800,
            fontSize: fontSize ? fontSize : 25,
            transition: "color 0.4s ease",
          }}
        >
          {title ? title : "MusicX"}
        </Typography>
      </Box>

      {/* Mini state version */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          height: 70,
          inset: 0,
          opacity: sidebarState === "open-mini" ? 1 : 0,
          visibility: sidebarState === "open-mini" ? "visible" : "hidden",
          transition: "opacity 1s ease, visibility 0.5s ease",
        }}
      >
        <Box
          sx={{
            display: isSmallScreen ? "none" : "flex",
            background: createGradient(theme.palette.primary.main),
            position: "absolute",
            inset: 0,
          }}
        />
        <MusicNoteRoundedIcon
          sx={{
            m: 0,
            p: 0,
            fontSize: 30,
            zIndex: 5,
          }}
        />
      </Box>
    </Box>
  );
};
