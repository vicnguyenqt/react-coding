import React from "react";

/**
 * @param {Record<string, unknown> & {
 *  value?: string;
 *  onChange?: React.ChangeEventHandler<HTMLInputElement>
 * }} props
 * @returns {JSX.IntrinsicElements.input}
 */
const AutocompleteTextbox = (props) => (
  <div>
    <label>
      Search for an option
      <input {...props} />
    </label>
  </div>
);
AutocompleteTextbox.defaultProps = {
  type: "text",
  placeholder: "Search...",
  className: "autocomplete-input",
};

export default AutocompleteTextbox;
