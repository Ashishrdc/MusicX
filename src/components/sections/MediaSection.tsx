import { Box, Typography, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface MediaSectionProps {
  title: string;
  subtitle?: string;
  height?: string | number;
  width?: string | number;
  children?: ReactNode;
  containerStyles?: SxProps<Theme>;
}

export const MediaSection = ({
  title,
  subtitle,
  children,
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
        padding: 2,
        gap: 1,
        ...containerStyles,
      }}
    >
      {/* Title */}
      <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>

      {/* Subtitle */}
      {subtitle && (
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {subtitle}
        </Typography>
      )}

      {/* Content */}
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
};
