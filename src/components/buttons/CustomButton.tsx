import { useTheme } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

// CustomButton component
interface CustomButtonProps extends ButtonProps {
  hover?: boolean;
  margin?: number | string;
  padding?: number | string;
  minWidth?: number | string;
  borderRadius?: number | string;
}

export const CustomButton = ({
  hover = true,
  margin,
  padding,
  minWidth,
  borderRadius,
  ...props
}: CustomButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        minWidth: minWidth !== undefined ? minWidth : 0,
        margin: margin !== undefined ? margin : 0,
        padding: padding !== undefined ? padding : 1,
        borderRadius: borderRadius !== undefined ? borderRadius : "",
        transition: "all 0.3s ease",
        background: "primary.main",
        "&:hover": hover
          ? {
              background: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            }
          : {},
      }}
      {...props}
    />
  );
};
