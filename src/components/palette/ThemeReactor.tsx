// import {
//   Box,
//   IconButton,
//   Popover,
//   Slide,
//   Tooltip,
//   Typography,
//   alpha,
// } from "@mui/material";

// import PaletteIcon from "@mui/icons-material/Palette";
// import CheckIcon from "@mui/icons-material/Check";

// import { useState } from "react";

// import { useLayout } from "../../context/layout/LayoutContext";
// import { themeColors } from "../../theme/palette";

// export const ThemeReactor = () => {
//   const { sidebarState, themeColor, setThemeColor } = useLayout();

//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const isExpanded = sidebarState === "open-expanded";

//   const activeColor = themeColors[themeColor as keyof typeof themeColors];

//   const open = Boolean(anchorEl);

//   const PalettePopover = (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={() => setAnchorEl(null)}
//       anchorOrigin={{
//         vertical: "center",
//         horizontal: "right",
//       }}
//       transformOrigin={{
//         vertical: "center",
//         horizontal: "left",
//       }}
//       slotProps={{
//         paper: {
//           sx: {
//             p: 2,
//             width: 220,

//             borderRadius: 5,

//             backdropFilter: "blur(24px)",

//             background: "rgba(20,20,20,.95)",

//             border: "1px solid rgba(255,255,255,.08)",
//           },
//         },
//       }}
//     >
//       <Typography fontWeight={700} sx={{ mb: 2 }}>
//         Theme Reactor
//       </Typography>

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(2,1fr)",
//           gap: 1,
//         }}
//       >
//         {Object.entries(themeColors).map(([name, color]) => (
//           <Box
//             key={name}
//             onClick={() => {
//               setThemeColor(name);
//               setAnchorEl(null);
//             }}
//             sx={{
//               height: 44,

//               borderRadius: 3,

//               cursor: "pointer",

//               position: "relative",

//               background: `linear-gradient(
//                   135deg,
//                   ${alpha(color, 0.95)},
//                   ${alpha(color, 0.55)}
//                 )`,

//               border:
//                 themeColor === name
//                   ? "2px solid white"
//                   : "1px solid rgba(255,255,255,.08)",

//               transition: "all .2s ease",

//               "&:hover": {
//                 transform: "translateY(-2px)",
//               },
//             }}
//           >
//             {themeColor === name && (
//               <CheckIcon
//                 sx={{
//                   position: "absolute",
//                   right: 8,
//                   top: 8,
//                   color: "#fff",
//                 }}
//               />
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Popover>
//   );

//   if (!isExpanded) {
//     return (
//       <>
//         <Tooltip title="Theme Reactor" placement="right">
//           <IconButton
//             onClick={(e) => setAnchorEl(e.currentTarget)}
//             sx={{
//               color: activeColor,

//               "&:hover": {
//                 backgroundColor: alpha(activeColor, 0.15),
//               },
//             }}
//           >
//             <PaletteIcon />
//           </IconButton>
//         </Tooltip>

//         {PalettePopover}
//       </>
//     );
//   }

//   return (
//     <>
//       <Box
//         onClick={(e) => setAnchorEl(e.currentTarget)}
//         sx={{
//           position: "relative",

//           overflow: "hidden",

//           borderRadius: 5,

//           p: 2,

//           cursor: "pointer",

//           background: `
//             linear-gradient(
//               135deg,
//               ${alpha(activeColor, 0.18)},
//               rgba(255,255,255,.02)
//             )
//           `,

//           border: `1px solid ${alpha(activeColor, 0.2)}`,

//           backdropFilter: "blur(20px)",

//           transition: "all .3s ease",

//           "&:hover": {
//             transform: "translateY(-2px)",

//             borderColor: alpha(activeColor, 0.45),
//           },
//         }}
//       >
//         {/* Glow Background */}

//         <Box
//           sx={{
//             position: "absolute",
//             width: 160,
//             height: 160,
//             top: -80,
//             right: -60,
//             borderRadius: "50%",
//             background: activeColor,
//             opacity: 0.15,
//             filter: "blur(60px)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Reactor Core */}

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",

//             mb: 2,
//           }}
//         >
//           <Box
//             sx={{
//               width: 72,
//               height: 72,

//               borderRadius: "50%",

//               display: "flex",
//               alignItems: "center",

//               justifyContent: "center",

//               background: `
//                 radial-gradient(
//                   circle,
//                   ${alpha(activeColor, 0.95)} 0%,
//                   ${alpha(activeColor, 0.25)} 70%,
//                   transparent 100%
//                 )
//               `,

//               boxShadow: `
//                 0 0 20px ${activeColor},
//                 0 0 40px ${alpha(activeColor, 0.7)}
//               `,
//             }}
//           >
//             <PaletteIcon
//               sx={{
//                 color: "#fff",
//                 fontSize: 28,
//               }}
//             />
//           </Box>
//         </Box>

//         <Slide in={isExpanded} timeout={400} mountOnEnter unmountOnExit>
//           <Typography
//             variant="caption"
//             sx={{
//               display: "block",
//               textAlign: "center",
//               letterSpacing: 2,
//               color: "text.secondary",
//             }}
//           >
//             THEME REACTOR
//           </Typography>
//         </Slide>

//         <Typography
//           sx={{
//             textAlign: "center",

//             mt: 0.5,

//             fontWeight: 800,

//             fontSize: 18,

//             textTransform: "uppercase",

//             color: activeColor,
//           }}
//         >
//           {themeColor}
//         </Typography>

//         {/* Theme Preview Strip */}

//         <Box
//           sx={{
//             mt: 2,

//             display: "flex",

//             justifyContent: "center",

//             gap: 0.75,

//             flexWrap: "wrap",
//           }}
//         >
//           {Object.entries(themeColors)
//             .slice(0, 16)
//             .map(([name, color]) => (
//               <Box
//                 key={name}
//                 sx={{
//                   width: 12,
//                   height: 12,

//                   borderRadius: "50%",

//                   bgcolor: color,

//                   border: themeColor === name ? "2px solid white" : "none",

//                   boxShadow: themeColor === name ? `0 0 10px ${color}` : "none",
//                 }}
//               />
//             ))}
//         </Box>
//       </Box>

//       {PalettePopover}
//     </>
//   );
// };

import {
  Box,
  IconButton,
  Popover,
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

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (name: string) => {
    setThemeColor(name);
    handleClose();
  };

  const PalettePopover = (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
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
            width: 240,
            p: 2,

            borderRadius: 4,

            overflow: "hidden",

            background: (theme) =>
              theme.palette.mode === "dark"
                ? alpha("#101010", 0.94)
                : alpha("#ffffff", 0.94),

            backdropFilter: "blur(24px)",

            border: `1px solid ${alpha(activeColor, 0.18)}`,

            boxShadow: `
              0 20px 50px rgba(0,0,0,.35),
              0 0 35px ${alpha(activeColor, 0.08)}
            `,
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.75,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 0.3,
            }}
          >
            Theme Reactor
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            Choose your atmosphere
          </Typography>
        </Box>

        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: activeColor,

            boxShadow: `0 0 12px ${activeColor}`,

            animation: "reactorPulse 2s ease-in-out infinite",

            "@keyframes reactorPulse": {
              "0%, 100%": {
                opacity: 0.65,
                transform: "scale(0.9)",
              },
              "50%": {
                opacity: 1,
                transform: "scale(1.15)",
              },
            },
          }}
        />
      </Box>

      {/* Theme Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
        }}
      >
        {Object.entries(themeColors).map(([name, color]) => {
          const selected = themeColor === name;

          return (
            <Box
              key={name}
              onClick={() => handleThemeChange(name)}
              sx={{
                position: "relative",

                aspectRatio: "1",

                borderRadius: 2.5,

                cursor: "pointer",

                background: `
                  linear-gradient(
                    145deg,
                    ${alpha(color, 0.95)},
                    ${alpha(color, 0.5)}
                  )
                `,

                border: selected
                  ? "2px solid rgba(255,255,255,.95)"
                  : "1px solid rgba(255,255,255,.08)",

                boxShadow: selected ? `0 0 18px ${alpha(color, 0.55)}` : "none",

                transition:
                  "transform .2s ease, box-shadow .2s ease, border-color .2s ease",

                "&:hover": {
                  transform: "scale(1.08)",
                  boxShadow: `0 0 16px ${alpha(color, 0.4)}`,
                  borderColor: alpha(color, 0.7),
                },

                "&:active": {
                  transform: "scale(0.96)",
                },
              }}
            >
              {selected && (
                <CheckIcon
                  sx={{
                    position: "absolute",
                    inset: 0,
                    margin: "auto",

                    fontSize: 18,

                    color: "#fff",

                    filter: "drop-shadow(0 1px 3px rgba(0,0,0,.5))",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Popover>
  );

  /*
   * COLLAPSED
   */
  if (!isExpanded) {
    return (
      <>
        <Tooltip title="Theme Reactor" placement="right">
          <IconButton
            onClick={handleOpen}
            sx={{
              width: 42,
              height: 42,

              color: activeColor,

              transition: "transform .2s ease, background-color .2s ease",

              "&:hover": {
                backgroundColor: alpha(activeColor, 0.12),

                transform: "scale(1.08)",
              },

              "&:active": {
                transform: "scale(0.94)",
              },
            }}
          >
            <PaletteIcon
              sx={{
                transition: "transform .4s ease",

                ".MuiIconButton-root:hover &": {
                  transform: "rotate(20deg)",
                },
              }}
            />
          </IconButton>
        </Tooltip>

        {PalettePopover}
      </>
    );
  }

  /*
   * EXPANDED
   */
  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          position: "relative",

          overflow: "hidden",

          p: 1.75,

          borderRadius: 4,

          cursor: "pointer",

          background: `
            linear-gradient(
              145deg,
              ${alpha(activeColor, 0.12)},
              rgba(255,255,255,.015)
            )
          `,

          border: `1px solid ${alpha(activeColor, 0.16)}`,

          backdropFilter: "blur(20px)",

          transition:
            "transform .25s ease, border-color .25s ease, box-shadow .25s ease",

          "&:hover": {
            transform: "translateY(-2px)",

            borderColor: alpha(activeColor, 0.4),

            boxShadow: `0 12px 35px ${alpha(activeColor, 0.1)}`,

            "& .reactor-core": {
              transform: "scale(1.06)",
            },

            "& .reactor-icon": {
              transform: "rotate(12deg) scale(1.05)",
            },
          },

          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        {/* Ambient Glow */}
        <Box
          sx={{
            position: "absolute",

            width: 180,
            height: 180,

            top: -100,
            right: -70,

            borderRadius: "50%",

            background: activeColor,

            opacity: 0.12,

            filter: "blur(55px)",

            pointerEvents: "none",

            transition: "background .4s ease",
          }}
        />

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            position: "relative",

            mb: 1.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12,

                fontWeight: 800,

                letterSpacing: 1.5,

                color: "text.secondary",

                textTransform: "uppercase",
              }}
            >
              Theme Reactor
            </Typography>

            <Typography
              sx={{
                mt: 0.35,

                fontSize: 17,

                fontWeight: 800,

                color: activeColor,

                textTransform: "capitalize",

                transition: "color .3s ease",
              }}
            >
              {themeColor}
            </Typography>
          </Box>

          {/* Mini Icon */}
          <Box
            className="reactor-core"
            sx={{
              width: 42,
              height: 42,

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              background: `
                radial-gradient(
                  circle,
                  ${alpha(activeColor, 0.9)} 0%,
                  ${alpha(activeColor, 0.25)} 60%,
                  transparent 100%
                )
              `,

              boxShadow: `
                0 0 18px ${alpha(activeColor, 0.65)}
              `,

              transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <PaletteIcon
              className="reactor-icon"
              sx={{
                color: "#fff",

                fontSize: 21,

                transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
              }}
            />
          </Box>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            height: 1,

            mb: 1.5,

            background: `linear-gradient(
              90deg,
              ${alpha(activeColor, 0.35)},
              transparent
            )`,
          }}
        />

        {/* Color Preview */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            gap: 0.65,

            flexWrap: "wrap",

            position: "relative",
          }}
        >
          {Object.entries(themeColors)
            .slice(0, 16)
            .map(([name, color]) => {
              const selected = themeColor === name;

              return (
                <Box
                  key={name}
                  sx={{
                    width: selected ? 14 : 10,
                    height: selected ? 14 : 10,

                    borderRadius: "50%",

                    bgcolor: color,

                    border: selected
                      ? "2px solid rgba(255,255,255,.95)"
                      : "1px solid rgba(255,255,255,.08)",

                    boxShadow: selected ? `0 0 10px ${color}` : "none",

                    transition:
                      "width .2s ease, height .2s ease, box-shadow .2s ease",

                    flexShrink: 0,
                  }}
                />
              );
            })}
        </Box>

        {/* Bottom Hint */}
        <Typography
          variant="subtitle2"
          sx={{
            mt: 1.5,
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          Tap to change theme
        </Typography>
      </Box>

      {PalettePopover}
    </>
  );
};
