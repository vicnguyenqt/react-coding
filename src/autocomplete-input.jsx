import React from "react";
import AutocompleteTextbox from "./helper-components/autocomplete-textbox";
import AutocompleteSuggestion from "./helper-components/autocomplete-suggestion";
import apiClient from "./helper-components/api-client";

const AutocompleteInput = () => {
  const [suggestions, setSuggestions] = React.useState([]);

  return (
    <div>
      <AutocompleteTextbox
        onChange={ (event) => {
          // TODO: fetch suggestions with apiClient.search
          if(event.target.value === "") {
            setSuggestions([]);
            return;
          }

          apiClient.search(event.target.value).then((response) => {
            setSuggestions(response);
          });
        }}
      />
      {/* TODO: render suggestions here with AutocompleteSuggestion */}
      <div>
      {suggestions.map((suggestion) => (
        <AutocompleteSuggestion key={suggestion}>{suggestion}</AutocompleteSuggestion>
      ))}
    
      </div>
    
    </div>
  );
};

export default AutocompleteInput;
