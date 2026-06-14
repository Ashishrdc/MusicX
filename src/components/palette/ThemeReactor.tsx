import {
  Box,
  IconButton,
  Popover,
  Slide,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";

import { useState } from "react";

import { useLayout } from "../../context/layout/LayoutContext";
import { themeColors } from "../../theme/palette";

export const ThemeReactor = () => {
  const { sidebarState, themeColor, setThemeColor } = useLayout();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isExpanded = sidebarState === "open-expanded";

  const activeColor = themeColors[themeColor as keyof typeof themeColors];

  const open = Boolean(anchorEl);

  const PalettePopover = (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      slotProps={{
        paper: {
          sx: {
            p: 2,
            width: 220,

            borderRadius: 5,

            backdropFilter: "blur(24px)",

            background: "rgba(20,20,20,.95)",

            border: "1px solid rgba(255,255,255,.08)",
          },
        },
      }}
    >
      <Typography fontWeight={700} sx={{ mb: 2 }}>
        Theme Reactor
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 1,
        }}
      >
        {Object.entries(themeColors).map(([name, color]) => (
          <Box
            key={name}
            onClick={() => {
              setThemeColor(name);
              setAnchorEl(null);
            }}
            sx={{
              height: 44,

              borderRadius: 3,

              cursor: "pointer",

              position: "relative",

              background: `linear-gradient(
                  135deg,
                  ${alpha(color, 0.95)},
                  ${alpha(color, 0.55)}
                )`,

              border:
                themeColor === name
                  ? "2px solid white"
                  : "1px solid rgba(255,255,255,.08)",

              transition: "all .2s ease",

              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            {themeColor === name && (
              <CheckIcon
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "#fff",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Popover>
  );

  if (!isExpanded) {
    return (
      <>
        <Tooltip title="Theme Reactor" placement="right">
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              color: activeColor,

              "&:hover": {
                backgroundColor: alpha(activeColor, 0.15),
              },
            }}
          >
            <PaletteIcon />
          </IconButton>
        </Tooltip>

        {PalettePopover}
      </>
    );
  }

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          position: "relative",

          overflow: "hidden",

          borderRadius: 5,

          p: 2,

          cursor: "pointer",

          background: `
            linear-gradient(
              135deg,
              ${alpha(activeColor, 0.18)},
              rgba(255,255,255,.02)
            )
          `,

          border: `1px solid ${alpha(activeColor, 0.2)}`,

          backdropFilter: "blur(20px)",

          transition: "all .3s ease",

          "&:hover": {
            transform: "translateY(-2px)",

            borderColor: alpha(activeColor, 0.45),
          },
        }}
      >
        {/* Glow Background */}

        <Box
          sx={{
            position: "absolute",
            width: 160,
            height: 160,
            top: -80,
            right: -60,
            borderRadius: "50%",
            background: activeColor,
            opacity: 0.15,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Reactor Core */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",

              justifyContent: "center",

              background: `
                radial-gradient(
                  circle,
                  ${alpha(activeColor, 0.95)} 0%,
                  ${alpha(activeColor, 0.25)} 70%,
                  transparent 100%
                )
              `,

              boxShadow: `
                0 0 20px ${activeColor},
                0 0 40px ${alpha(activeColor, 0.7)}
              `,
            }}
          >
            <PaletteIcon
              sx={{
                color: "#fff",
                fontSize: 28,
              }}
            />
          </Box>
        </Box>

        <Slide in={isExpanded} timeout={400} mountOnEnter unmountOnExit>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              letterSpacing: 2,
              color: "text.secondary",
            }}
          >
            THEME REACTOR
          </Typography>
        </Slide>

        <Typography
          sx={{
            textAlign: "center",

            mt: 0.5,

            fontWeight: 800,

            fontSize: 18,

            textTransform: "uppercase",

            color: activeColor,
          }}
        >
          {themeColor}
        </Typography>

        {/* Theme Preview Strip */}

        <Box
          sx={{
            mt: 2,

            display: "flex",

            justifyContent: "center",

            gap: 0.75,

            flexWrap: "wrap",
          }}
        >
          {Object.entries(themeColors)
            .slice(0, 16)
            .map(([name, color]) => (
              <Box
                key={name}
                sx={{
                  width: 12,
                  height: 12,

                  borderRadius: "50%",

                  bgcolor: color,

                  border: themeColor === name ? "2px solid white" : "none",

                  boxShadow: themeColor === name ? `0 0 10px ${color}` : "none",
                }}
              />
            ))}
        </Box>
      </Box>

      {PalettePopover}
    </>
  );
};
