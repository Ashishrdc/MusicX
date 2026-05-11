import React from "react";
import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";

export const SearchToggle = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Modified by Yugant N (05-2026), Navigate to search page instead of toggling UI state */}
      <CustomButton onClick={()=>navigate("/search")}>
        <SearchRoundedIcon />
      </CustomButton> 
    </Box>
  );
});
