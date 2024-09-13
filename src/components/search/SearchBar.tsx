import {
  TextField,
  InputAdornment,
  Box,
  Slide,
  ClickAwayListener,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { CustomButton } from "../buttons/CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";

export const SearchBar = () => {
  const { searchMode, searchQuery, setSearchQuery, toggleSearchMode } =
    useLayout();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    searchQuery.length > 0 ? setSearchQuery("") : toggleSearchMode();
  };

  const handleClickAway = () => {
    if (searchMode) {
      toggleSearchMode();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: searchMode ? 64 : "",
        }}
      >
        <TextField
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search for songs, albums..."
          variant={searchMode ? "outlined" : "standard"}
          autoFocus={searchMode}
          autoComplete="off"
          fullWidth
          InputProps={{
            endAdornment: (
              <>
                <Slide
                  direction="right"
                  in={searchQuery.length > 0 || searchMode}
                  mountOnEnter
                  unmountOnExit
                >
                  <InputAdornment position="end">
                    <CustomButton
                      padding={0}
                      borderRadius={50}
                      onClick={handleClear}
                    >
                      <CancelRoundedIcon />
                    </CustomButton>
                  </InputAdornment>
                </Slide>
                <Slide
                  direction="right"
                  in={!searchMode && searchQuery.length === 0}
                  mountOnEnter
                  unmountOnExit
                >
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                </Slide>
              </>
            ),
          }}
        />
      </Box>
    </ClickAwayListener>
  );
};
