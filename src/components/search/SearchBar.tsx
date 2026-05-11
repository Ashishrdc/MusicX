{/* Modified by Yugant N (05-2026), Minor UI Modifications */}

import {
  TextField,
  InputAdornment,
  Box,
  ClickAwayListener,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { CustomButton } from "../buttons/CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";

export const SearchBar = () => {

  const {
    searchQuery,
    setSearchQuery,
  } = useLayout();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          autoFocus
          autoComplete="off"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search songs, albums, artists..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),

            endAdornment: searchQuery.length > 0 && (
              <InputAdornment position="end">

                <CustomButton
                  padding={0}
                  borderRadius={50}
                  onClick={handleClear}
                >
                  <CancelRoundedIcon />
                </CustomButton>

              </InputAdornment>
            ),
          }}
        />
      </Box>
    </ClickAwayListener>
  );
};