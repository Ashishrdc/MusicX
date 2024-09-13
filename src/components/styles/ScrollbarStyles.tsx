import { GlobalStyles, useTheme } from "@mui/material";

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

  return (
    <GlobalStyles
      styles={{
        "::-webkit-scrollbar": {
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
