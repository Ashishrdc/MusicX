import { GlobalStyles, useTheme } from "@mui/material";
import { useLayout } from "../../context/layout/LayoutContext";

interface ScrollbarProps {
  width?: string | number;
  backgroundColor?: string | number;
  borderRadius?: string | number;
}

export const ScrollbarStyles = ({
  width,
  backgroundColor,
  borderRadius,
}: ScrollbarProps) => {
  const theme = useTheme();
  const { playerMode, isMobileDevice } = useLayout();

  return (
    <GlobalStyles
      styles={{
        "::-webkit-scrollbar": {
          display:
            playerMode === "fullscreen" || isMobileDevice() ? "none" : "block",
          width: width != undefined ? width : 8,
        },
        "::-webkit-scrollbar-thumb": {
          background:
            backgroundColor != undefined
              ? backgroundColor
              : theme.palette.primary.main,
          borderRadius: borderRadius != undefined ? borderRadius : 8,
        },
      }}
    />
  );
};
