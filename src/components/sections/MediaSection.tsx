import { Box, Divider, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

interface MediaSectionProps {
  title: string;
  subtitle?: string;
  height?: string | number;
  width?: string | number;
  children?: ReactNode;
  icon?: ReactNode;
  containerStyles?: SxProps<Theme>;
}

export const MediaSection = ({
  title,
  subtitle,
  children,
  icon,
  height = "fit-content",
  width = "100%",
  containerStyles,
}: MediaSectionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height,
        width,
        p: {
          xs: 2,
          md: 2.5,
        },
        borderRadius: 5,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: "background.paper",
        backdropFilter: "blur(14px)",
        boxShadow: (theme) => theme.shadows[2],
        gap: 2,
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: (theme) => theme.shadows[6],
        },

        ...containerStyles,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {icon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: 3,
                backgroundColor: "action.hover",
              }}
            >
              {icon}
            </Box>
          )}

          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 800,
                letterSpacing: -0.4,
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 0.3,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* CONTENT */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
