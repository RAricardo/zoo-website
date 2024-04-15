import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Animal } from "../types/Animal";

interface Props {
  animals: Animal[];
  selectedType: string | null;
  handleTypeChange: (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => void;
}

const autocompleteStyles = {
  color: "white",
  minWidth: 200,
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#7B91A7", // Default border color
  },
  "& .MuiSvgIcon-root": { color: "white" },
};

const AutocompleteFilter: React.FC<Props> = ({
  animals,
  selectedType,
  handleTypeChange,
}) => {
  return (
    <Autocomplete
      value={selectedType}
      onChange={handleTypeChange}
      options={Array.from(new Set(animals.map((animal) => animal.type)))}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filter by type"
          variant="outlined"
          InputLabelProps={{ sx: { color: "white" } }}
          InputProps={{ ...params.InputProps, style: { color: "white" } }}
          sx={autocompleteStyles}
        />
      )}
    />
  );
};

export default AutocompleteFilter;
