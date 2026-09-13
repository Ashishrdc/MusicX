{
  /* Added by Yugant N (05-2026), to Add PaletteSelector in App Sidebar */
}

import { Box, Tooltip, Typography, Popover } from "@mui/material";
import { useState } from "react";
import PaletteIcon from "@mui/icons-material/Palette";
import { useLayout } from "../../context/layout/LayoutContext";
import { themeColors } from "../../theme/palette";
export const PaletteSelector = () => {
  const { sidebarState, themeColor, setThemeColor } = useLayout();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isExpanded = sidebarState === "open-expanded";
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (name: string) => {
    setThemeColor(name);
    handleClose();
  };

  return (
    <>
      <Tooltip
        disableInteractive
        title={!isExpanded ? "Theme Color" : ""}
        placement="bottom"
      >
        <Box
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isExpanded ? "flex-start" : "center",
            width: "100%",
            gap: 1.5,
            cursor: "pointer",
            px: 1,
            py: 0.75,
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 24,
            }}
          >
            <PaletteIcon fontSize="small" />
          </Box>

          {isExpanded && (
            <Typography fontWeight="bold" noWrap>
              Theme
            </Typography>
          )}
        </Box>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              p: 1.5,
              borderRadius: 3,
              boxShadow: 6,
            },
          },
        }}
      >
        <Typography
          variant="caption"
          fontWeight="bold"
          color="text.secondary"
          sx={{ px: 0.5, pb: 1, display: "block", letterSpacing: 1 }}
        >
          THEME COLOR
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: 145,
            py: 0.5,
            gap: 1,
          }}
        >
          {Object.entries(themeColors).map(([name, hex]) => (
            <Tooltip
              disableInteractive
              key={name}
              title={
                <Typography variant="body1">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              }
              placement="top"
            >
              <Box
                onClick={() => handleSelect(name)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: hex,
                  cursor: "pointer",
                  flexShrink: 0,
                  border:
                    themeColor === name
                      ? "3px solid white"
                      : "3px solid transparent",
                  outline: themeColor === name ? `2px solid ${hex}` : "none",
                  transition: "all 0.2s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </>
  );
};
