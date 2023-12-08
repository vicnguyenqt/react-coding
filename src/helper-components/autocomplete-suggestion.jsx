import React from "react";

/**
 * @param {Record<string, unknown> & { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLDivElement> }} props
 * @param {React.ReactNode} props.children Autocomplete suggestion as text
 * @param {React.MouseEventHandler<HTMLDivElement>} props.onClick Handler for suggestion being selected
 * @returns {JSX.IntrinsicElements.div}
 */
const AutocompleteSuggestion = (props) => (
  <div className="autocomplete-item" role="option" tabIndex={-1} {...props} />
);

export default AutocompleteSuggestion;
