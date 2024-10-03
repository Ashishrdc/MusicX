import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface CenteredBoxProps extends BoxProps {
  children: ReactNode;
}

export const CenteredFlexBox = ({
  children,
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "center",
  ...boxProps
}: CenteredBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: flexDirection,
        alignItems: alignItems,
        justifyContent: justifyContent,
        height: "100%",
        width: "100%",
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};
