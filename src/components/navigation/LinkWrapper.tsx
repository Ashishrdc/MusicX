import React, { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, SxProps, useTheme } from "@mui/material";
import { createLinearGradient } from "../../util/helperFunctions";

interface LinkWrapperProps {
  to: string;
  sx?: SxProps;
  children: React.ReactNode;
  onClick?: () => void;
}

export const LinkWrapper: FC<LinkWrapperProps> = ({
  to,
  sx,
  children,
  onClick,
}) => {
  const theme = useTheme();
  const location = useLocation();

  // Check active state in comparison with to prop
  const isActive = location.pathname === to;

  return (
    <Box
      to={to}
      component={RouterLink}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        padding: 1,
        borderRadius: 2,
        color: isActive
          ? theme.palette.secondary.contrastText
          : theme.palette.text.primary,
        backgroundColor: isActive ? theme.palette.primary.main : "transparent",
        textDecoration: "none",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          //   boxShadow: `0px 4px 10px ${theme.palette.primary.light}`,
          //   color: !isActive
          //     ? theme.palette.secondary.contrastText
          //     : theme.palette.text.primary,
          background: !isActive
            ? createLinearGradient(
                theme.palette.secondary.contrastText,
                theme.palette.primary.main
              )
            : "",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
