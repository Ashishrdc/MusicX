// import { Box, Slide, Typography, Tooltip } from "@mui/material";

// import { useLayout } from "../../context/layout/LayoutContext";
// import { routes } from "../../constants/routes/NavRoutes";

// import { CustomTitle } from "../common/title/CustomTitle";
// import { LinkWrapper } from "./LinkWrapper";
// import { ThemeReactor } from "../palette/ThemeReactor";

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
//         overflow: "hidden",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           textAlign: "center",
//           cursor: "pointer",
//           transition: "transform .3s ease",
//           flexShrink: 0,

//           "&:hover": {
//             transform: "scale(1.05)",
//           },
//         }}
//       >
//         <CustomTitle />
//       </Box>

//       {/* Navigation */}
//       <Box
//         sx={{
//           flex: 1,
//           minHeight: 0,

//           overflowY: "auto",
//           overflowX: "hidden",

//           display: "flex",
//           flexDirection: "column",

//           alignItems: isExpanded ? "flex-start" : "center",

//           px: 2,
//           py: 1,
//           gap: 1.5,

//           "&::-webkit-scrollbar": {
//             width: 4,
//           },

//           "&::-webkit-scrollbar-thumb": {
//             borderRadius: 999,
//             backgroundColor: "rgba(255,255,255,.15)",
//           },
//         }}
//       >
//         {routes.map(({ path, name, icon }) => (
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

//                   <Slide
//                     in={isExpanded}
//                     direction="right"
//                     timeout={400}
//                     // mountOnEnter
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
//       </Box>

//       {/* Theme Panel */}
//       {isExpanded ? (
//         <Slide
//           in={isExpanded}
//           direction="left"
//           timeout={400}
//           mountOnEnter
//           unmountOnExit
//         >
//           <Box
//             sx={{
//               px: 2,
//               pb: 1,
//               flexShrink: 0,
//             }}
//           >
//             <ThemeReactor />
//           </Box>
//         </Slide>
//       ) : (
//         <Box
//           sx={{
//             px: 2,
//             pb: 1.5,
//             flexShrink: 0,
//           }}
//         >
//           <ThemeReactor />
//         </Box>
//       )}

//       {/* Footer */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",
//           p: 2,
//           flexShrink: 0,
//         }}
//       >
//         {isExpanded ? (
//           <Typography
//             variant="body2"
//             sx={{
//               fontWeight: "bold",
//             }}
//           >
//             Made with ❤️ by
//             <br />
//             Ashish Chaurasiya
//           </Typography>
//         ) : (
//           <Typography
//             variant="body2"
//             sx={{
//               fontWeight: "bold",
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

  const expandEase = "cubic-bezier(0.22, 1, 0.36, 1)";
  const collapseEase = "cubic-bezier(0.4, 0, 1, 1)";

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
      {/* =====================================================
          Header
      ====================================================== */}

      <Box
        sx={{
          textAlign: "center",

          cursor: "pointer",

          flexShrink: 0,

          transition: `
            transform 350ms ${expandEase}
          `,

          "&:hover": {
            transform: "scale(1.03)",
          },

          "&:active": {
            transform: "scale(.98)",
          },
        }}
      >
        <CustomTitle />
      </Box>

      {/* =====================================================
          Navigation
      ====================================================== */}

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

          transition: `
            align-items 450ms ${expandEase}
          `,

          "&::-webkit-scrollbar": {
            width: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            borderRadius: 999,

            backgroundColor: "rgba(255,255,255,.15)",
          },
        }}
      >
        {routes.map(({ path, name, icon }, index) => (
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

                    transition: `
                      gap 400ms ${expandEase}
                    `,
                  }}
                >
                  {/* =================================================
                      Icon
                  ================================================== */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "center",
                      justifyContent: "center",

                      flexShrink: 0,

                      width: isSmallScreen ? 24 : 50,

                      transition: `
                        transform 350ms ${expandEase},
                        width 400ms ${expandEase}
                      `,

                      "&:hover": {
                        transform: "scale(1.06)",
                      },
                    }}
                  >
                    {icon}
                  </Box>

                  {/* =================================================
                      Navigation Label
                  ================================================== */}

                  <Slide
                    in={isExpanded}
                    direction="right"
                    timeout={{
                      enter: 320,
                      exit: 220,
                    }}
                    easing={{
                      enter: expandEase,
                      exit: collapseEase,
                    }}
                    style={{
                      transitionDelay: isExpanded ? `${index * 30}ms` : "0ms",
                    }}
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        display: "flex",

                        width: "100%",

                        alignItems: "center",
                        justifyContent: "flex-start",

                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",

                          whiteSpace: "nowrap",

                          overflow: "hidden",

                          textOverflow: "ellipsis",
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

      {/* =====================================================
          Theme Panel
      ====================================================== */}

      {isExpanded ? (
        <Slide
          in={isExpanded}
          direction="left"
          timeout={{
            enter: 400,
            exit: 250,
          }}
          easing={{
            enter: expandEase,
            exit: collapseEase,
          }}
          mountOnEnter
          unmountOnExit
        >
          <Box
            sx={{
              px: 2,
              pb: 1,

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

            transition: `
              padding 400ms ${expandEase}
            `,
          }}
        >
          <ThemeReactor />
        </Box>
      )}

      {/* =====================================================
          Footer
      ====================================================== */}

      <Box
        sx={{
          position: "relative",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",

          p: 2,

          flexShrink: 0,

          minHeight: 58,

          overflow: "hidden",
        }}
      >
        {/* Expanded Footer */}

        <Typography
          variant="body2"
          sx={{
            position: "absolute",

            fontWeight: "bold",

            whiteSpace: "nowrap",

            opacity: isExpanded ? 1 : 0,

            transform: isExpanded ? "translateY(0)" : "translateY(8px)",

            transition: `
              opacity 220ms ease,
              transform 320ms ${expandEase}
            `,

            pointerEvents: "none",
          }}
        >
          Made with ❤️ by
          <br />
          Ashish Chaurasiya
        </Typography>

        {/* Collapsed Footer */}

        <Typography
          variant="body2"
          sx={{
            position: "absolute",

            fontWeight: "bold",

            opacity: isExpanded ? 0 : 1,

            transform: isExpanded ? "scale(.75)" : "scale(1)",

            transition: `
              opacity 180ms ease,
              transform 280ms ${expandEase}
            `,

            pointerEvents: "none",
          }}
        >
          ❤️
        </Typography>
      </Box>
    </Box>
  );
};
