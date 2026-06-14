import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";

import { useLayout } from "../../context/layout/LayoutContext";
import { themeColors } from "../../theme/palette";

export const ThemeAccordion = () => {
  const { sidebarState, themeColor, setThemeColor } = useLayout();

  const isExpandedSidebar = sidebarState === "open-expanded";
  const activeColor =
    themeColors[themeColor as keyof typeof themeColors] ?? "#1976d2";

  return (
    <Accordion
      disableGutters
      elevation={0}
      square={false}
      sx={{
        background: "transparent",
        color: "inherit",
        borderRadius: 3,
        overflow: "hidden",

        "&::before": {
          display: "none",
        },

        "&.Mui-expanded": {
          my: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: activeColor,
            }}
          />
        }
        sx={{
          minHeight: 48,

          "&.Mui-expanded": {
            minHeight: 48,
          },

          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            gap: 1.5,
            margin: "12px 0",
          },

          "&.Mui-expanded .MuiAccordionSummary-content": {
            margin: "12px 0",
          },

          borderRadius: 2,
          transition: "all .25s ease",

          "&:hover": {
            backgroundColor: alpha(activeColor, 0.08),
          },
        }}
      >
        <Box
          sx={{
            width: 24,
            display: "flex",
            justifyContent: "center",
            color: activeColor,
          }}
        >
          <PaletteIcon fontSize="small" />
        </Box>

        {isExpandedSidebar && <Typography fontWeight={700}>Themes</Typography>}
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 1.5,
          pb: 1.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mb: 1.5,
            fontWeight: 700,
            letterSpacing: 1,
            color: "text.secondary",
          }}
        >
          COLOR PALETTES
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
            gap: 1.25,
          }}
        >
          {Object.entries(themeColors).map(([name, hex]) => {
            const selected = themeColor === name;

            return (
              <Tooltip
                key={name}
                title={name.charAt(0).toUpperCase() + name.slice(1)}
                placement="top"
              >
                <Box
                  onClick={() => setThemeColor(name)}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    bgcolor: hex,
                    cursor: "pointer",
                    position: "relative",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    transition: "all .25s ease",

                    border: selected
                      ? "2px solid white"
                      : "2px solid transparent",

                    outline: selected ? `3px solid ${alpha(hex, 0.6)}` : "none",

                    boxShadow: selected
                      ? `0 0 18px ${alpha(hex, 0.45)}`
                      : "none",

                    "&:hover": {
                      transform: "translateY(-2px) scale(1.08)",
                      boxShadow: `0 8px 20px ${alpha(hex, 0.35)}`,
                    },
                  }}
                >
                  {selected && (
                    <CheckIcon
                      sx={{
                        fontSize: 18,
                        color: "#fff",
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        <Box
          sx={{
            mt: 2,
            p: 1.25,
            borderRadius: 2,
            background: `linear-gradient(135deg,
              ${alpha(activeColor, 0.18)} 0%,
              ${alpha(activeColor, 0.05)} 100%)`,
            border: `1px solid ${alpha(activeColor, 0.15)}`,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: activeColor,
            }}
          >
            Active Theme
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {themeColor}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
