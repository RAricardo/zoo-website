import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  sortBy: string;
  handleSortByChange: (event: SelectChangeEvent<string>) => void;
}

const sortSelectStyles = {
  color: "white",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#7B91A7" },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiSvgIcon-root": { color: "white" },
};

const SortSelect: React.FC<Props> = ({ sortBy, handleSortByChange }) => {
  return (
    <FormControl
      variant="outlined"
      style={{ marginLeft: "10px", minWidth: 150 }}
    >
      <InputLabel id="sort-by-label" sx={{ color: "white" }}>
        Sort By
      </InputLabel>
      <Select
        labelId="sort-by-label"
        value={sortBy}
        onChange={handleSortByChange}
        label="Sort By"
        sx={sortSelectStyles}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="type">Type</MenuItem>
        <MenuItem value="age">Age</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
