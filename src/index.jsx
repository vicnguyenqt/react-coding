import React from "react";
import { render } from "react-dom";
import AutocompleteInput from "./autocomplete-input";
import { useSuggestionKeyboardAccessibility } from "./use-suggestion-keyboard-accessibility";
import "./index.css";

const Root = () => (
  useSuggestionKeyboardAccessibility(), (<AutocompleteInput />)
);

render(<Root />, document.getElementById("root"));
