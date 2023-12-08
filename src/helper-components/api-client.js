const apiClient = {
  /**
   * @param {string} query Input to request suggestions for
   * @param {Object} options Optional options object
   * @param {string} options.path Optional path to direct requests to
   * @param {boolean} options.race Optional setting for enabling race conditions
   * @returns {Promise<string[]>} Suggestions as unique strings
   */
  search: (query, { path = '', race = false } = {}) =>
    fetch(`/search${path}?q=${query}`, {
      headers: {
        'X-Enable-Race-Conditions': race
      }
    }).then((res) => res.json()),
};

export default apiClient;
