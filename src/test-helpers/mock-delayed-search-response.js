import fetchMock from "jest-fetch-mock";

const createDelayedSearchResponseMocker = () => {
  fetchMock.enableMocks();
  beforeEach(
    () => void fetch.mockResponse(() => Promise.resolve(JSON.stringify([])))
  );
  afterEach(() => void fetch.mockReset());
  return (value, delay = 1000) => {
    const queue = [];
    let done = 0;
    fetch.mockResponse(() =>
      new Promise((resolve) =>
        setTimeout(() => resolve(JSON.stringify(value)), delay)
      ).finally(() => {
        queue.shift()?.();
        done++;
      })
    );
    function* responsePromiseGenerator() {
      let generated = 0;
      while (true) {
        generated++;
        if (done >= generated) {
          yield Promise.resolve();
        } else {
          yield new Promise((resolve) => void queue.push(resolve));
        }
      }
    }
    return responsePromiseGenerator();
  };
};

export default createDelayedSearchResponseMocker;
