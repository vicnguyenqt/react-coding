/**
 * The helper apiClient can fetch suggestions from a server using the method
 * search. Pass a string parameter to fetch suggestions for that parameter,
 * e.g. apiClient.search('cars'). The method returns a promise of an array of
 * strings; Promise<string[]>.
 *
 * The helper component AutocompleteTextbox renders an input element. When that
 * input is not empty AutocompleteInput should fetch suggestions.
 *
 * The suggestions for the current input value should be displayed when they
 * are fetched from the server. Each suggestion should be rendered as text
 * content of an option.
 *
 * The helper component AutocompleteSuggestion can be used to render an option,
 * e.g. <AutocompleteSuggestion>{suggestion}</AutocompleteSuggestion>.
 */

import React from "react";
import AutocompleteInput from "./autocomplete-input";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  flushEventLoop,
  createDelayedSearchResponseMocker,
} from "./test-helpers";

const mockDelayedSearchResponse = createDelayedSearchResponseMocker();

const last = (array) => array[array.length - 1];

describe("AutocompleteInput", () => {
  let element;

  beforeEach(() => {
    element = render(<AutocompleteInput />);
  });

  it("requests suggestions for user input", async () => {
    mockDelayedSearchResponse([], 0);
    const autocompleteInput = element.getByLabelText("Search for an option");
    fireEvent.change(autocompleteInput, {
      target: { value: "cars" },
    });
    await waitFor(() => expect(fetch).toHaveBeenCalled(), {
      timeout: 1000,
    });
    const firstArgumentOfLastCall = last(fetch.mock.calls)[0];
    expect(firstArgumentOfLastCall).toMatch(/\/search\/?\?q=cars/);
    await flushEventLoop();
  });

  it("only requests suggestions when input is non-empty", async () => {
    expect(fetch).not.toHaveBeenCalled();
    mockDelayedSearchResponse([], 0);
    const autocompleteInput = element.getByLabelText("Search for an option");
    fireEvent.change(autocompleteInput, {
      target: { value: "cars" },
    });
    await waitFor(() => expect(fetch).toHaveBeenCalled(), {
      timeout: 1000,
    });
    fetch.mockClear();
    fireEvent.change(autocompleteInput, {
      target: { value: "" },
    });
    await flushEventLoop();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("displays suggestions returned by api client", async () => {
    const autocompleteInput = element.getByLabelText("Search for an option");
    mockDelayedSearchResponse(["cars", "racing", "scars"], 0);
    fireEvent.change(autocompleteInput, {
      target: { value: "cars" },
    });
    const options = await element.findAllByRole("option").catch(() => []);
    expect(options).toHaveLength(3);
    expect(options).toContainEqual(
      expect.objectContaining({ textContent: "cars" })
    );
    expect(options).toContainEqual(
      expect.objectContaining({ textContent: "racing" })
    );
    expect(options).toContainEqual(
      expect.objectContaining({ textContent: "scars" })
    );
  });

  it("when input value is cleared shows no suggestions", async () => {
    const autocompleteInput = element.getByLabelText("Search for an option");
    mockDelayedSearchResponse(["cars", "racing", "scars"], 0);

    fireEvent.change(autocompleteInput, {
      target: { value: "cars" },
    });
    // Wait for suggestions to be populated, if they are to ever be populated.
    await element.findAllByRole("option").catch(() => {});
    fireEvent.change(autocompleteInput, {
      target: { value: "" },
    });
    await flushEventLoop();

    const options = element.queryAllByRole("option");
    expect(options).toEqual([]);
  });
});
