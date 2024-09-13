import React from "react";
import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useLayout } from "../../context/layout/LayoutContext";

export const SearchToggle = React.memo(() => {
  const { toggleSearchMode } = useLayout();

  return (
    <Box>
      <CustomButton onClick={toggleSearchMode}>
        <SearchRoundedIcon />
      </CustomButton>
    </Box>
  );
});
