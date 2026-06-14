// import { Box, Slide, Typography, Tooltip } from "@mui/material";
// import { useLayout } from "../../context/layout/LayoutContext";
// import { routes } from "../../constants/routes/NavRoutes";
// import { CustomTitle } from "../common/title/CustomTitle";
// import { LinkWrapper } from "./LinkWrapper";
// import { PaletteSelector } from "../palette/PaletteSelector";
// import { ThemeAccordion } from "../palette/ThemeAccordion";

// export const Sidebar = () => {
//   const { sidebarState, isSmallScreen, toggleSidebarState } = useLayout();

//   const isExpanded = sidebarState === "open-expanded";

//   const handleClick = () => {
//     if (isSmallScreen) {
//       toggleSidebarState("closed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       {/* Sidebar Header */}
//       <Box
//         sx={{
//           textAlign: "center",
//           cursor: "pointer",
//           transition: "transform 0.3s ease",
//           "&:hover": {
//             transform: "scale(1.05)",
//           },
//         }}
//       >
//         <CustomTitle />
//       </Box>

//       {/* Sidebar Navigation */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: isExpanded ? "flex-start" : "center",
//           flexGrow: 1,
//           padding: 2,
//           gap: 1.5,
//         }}
//       >
//         {routes.map(({ path, name, icon }) => (
//           /* Added by Yugant N (05-2026), to Add Tooltip in Sidebar Toggle */
//           <Tooltip
//             key={name}
//             title={!isExpanded ? name : ""}
//             placement="right"
//             disableInteractive
//           >
//             <Box width="100%">
//               <LinkWrapper to={path} onClick={handleClick}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: isExpanded ? "flex-start" : "center",
//                     width: "100%",
//                     gap: 2,
//                   }}
//                 >
//                   {/* ICON */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       flexShrink: 0,
//                       width: isSmallScreen ? 24 : 50,
//                     }}
//                   >
//                     {icon}
//                   </Box>

//                   {/* TEXT */}

//                   <Slide
//                     in={isExpanded}
//                     direction="right"
//                     mountOnEnter
//                     unmountOnExit
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         width: "100%",
//                         alignItems: "center",
//                         justifyContent: "flex-start",
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontWeight: "bold",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {name}
//                       </Typography>
//                     </Box>
//                   </Slide>
//                 </Box>
//               </LinkWrapper>
//             </Box>
//           </Tooltip>
//         ))}

//         <Box
//           sx={{
//             width: "100%",
//           }}
//         >
//           {/* Added by Yugant N (05-2026), to Add PaletteSelector in Sidebar */}
//           <PaletteSelector />
//           <ThemeAccordion />
//         </Box>
//       </Box>

//       {/* Sidebar Footer */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           padding: 2,
//         }}
//       >
//         {isExpanded ? (
//           <Typography
//             variant="body2"
//             sx={{
//               fontWeight: "bold",
//               opacity: isExpanded ? 1 : 0,
//               transition: "all 0.8s ease",
//             }}
//           >
//             Made with ❤️ by <br />
//             Ashish Chaurasiya
//           </Typography>
//         ) : (
//           <Typography
//             variant="body2"
//             sx={{
//               fontWeight: "bold",
//               transition: "all 0.8s ease",
//             }}
//           >
//             ❤️
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

import { Box, Slide, Typography, Tooltip } from "@mui/material";

import { useLayout } from "../../context/layout/LayoutContext";
import { routes } from "../../constants/routes/NavRoutes";

import { CustomTitle } from "../common/title/CustomTitle";
import { LinkWrapper } from "./LinkWrapper";
import { ThemeReactor } from "../palette/ThemeReactor";

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
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          cursor: "pointer",
          transition: "transform .3s ease",
          flexShrink: 0,

          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CustomTitle />
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,

          overflowY: "auto",
          overflowX: "hidden",

          display: "flex",
          flexDirection: "column",

          alignItems: isExpanded ? "flex-start" : "center",

          px: 2,
          py: 1,
          gap: 1.5,

          "&::-webkit-scrollbar": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,.15)",
          },
        }}
      >
        {routes.map(({ path, name, icon }) => (
          <Tooltip
            key={name}
            title={!isExpanded ? name : ""}
            placement="right"
            disableInteractive
          >
            <Box width="100%">
              <LinkWrapper to={path} onClick={handleClick}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    justifyContent: isExpanded ? "flex-start" : "center",

                    width: "100%",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      flexShrink: 0,

                      width: isSmallScreen ? 24 : 50,
                    }}
                  >
                    {icon}
                  </Box>

                  <Slide
                    in={isExpanded}
                    direction="right"
                    mountOnEnter
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-start",
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
                </Box>
              </LinkWrapper>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* Theme Panel */}
      {isExpanded ? (
        <Slide in={isExpanded} direction="down" timeout={500} unmountOnExit>
          <Box
            sx={{
              px: 2,
              pb: 1.5,
              flexShrink: 0,
            }}
          >
            <ThemeReactor />
          </Box>
        </Slide>
      ) : (
        <Box
          sx={{
            px: 2,
            pb: 1.5,
            flexShrink: 0,
          }}
        >
          <ThemeReactor />
        </Box>
      )}

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
          flexShrink: 0,
        }}
      >
        {isExpanded ? (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
            }}
          >
            Made with ❤️ by
            <br />
            Ashish Chaurasiya
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
            }}
          >
            ❤️
          </Typography>
        )}
      </Box>
    </Box>
  );
};
