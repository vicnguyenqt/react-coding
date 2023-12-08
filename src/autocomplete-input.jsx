import React from "react";
import AutocompleteTextbox from "./helper-components/autocomplete-textbox";
import AutocompleteSuggestion from "./helper-components/autocomplete-suggestion";
import apiClient from "./helper-components/api-client";

const AutocompleteInput = () => {
  return (
    <div>
      <AutocompleteTextbox
        onChange={(event) => {
          // TODO: fetch suggestions with apiClient.search
        }}
      />
      {/* TODO: render suggestions here with AutocompleteSuggestion */}
    </div>
  );
};

export default AutocompleteInput;
