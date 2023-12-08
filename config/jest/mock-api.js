const { SUGGESTIONS } = require("./shared");

const filterSuggestions = (searchTerm) =>
  SUGGESTIONS.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

/*
 * Make response times dynamic based on the searchTerm length.
 * The shorter the search term, the longer the response, and vice versa.
 * This makes it possible to reproduce race-conditions while developing.
 */
const getResponseDelay = (searchTerm) => {
  const minDelay = 100;
  const maxDelay = 1000;

  if (searchTerm.length <= 1) {
    return maxDelay;
  }

  const multiplier = 200;
  const delay = maxDelay - (searchTerm.length * multiplier);
  return delay < minDelay ? minDelay : delay;
};

const mockApi = {
  "GET /search": (req, res) => {
    const { q: searchTerm = "" } = req.query;
    const useDynamicDelay = req.header('X-Enable-Race-Conditions') === 'true';
    const delay = useDynamicDelay ? getResponseDelay(searchTerm) : 750;

    const results = searchTerm.length
      ? filterSuggestions(searchTerm)
      : SUGGESTIONS;

    setTimeout(() => res.json(results), delay);
  }
};

module.exports = mockApi
