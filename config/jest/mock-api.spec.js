import nock from "nock";
import { SUGGESTIONS } from "./shared";

const request = (path) => window.fetch(`http://localhost:8050${path}`);

const fetchResults = async (path) => {
  const response = await request(path);
  const results = await response.json();
  return results;
};

/**
 * NOTE: This test suite requires the local development server to be running!
 *       Please run `npm start` or have the Docker container running prior to running these tests.
 */
describe("Mock API", () => {
  beforeAll(() => {
    nock.enableNetConnect();
  });

  describe("when requesting search endpoint", () => {
    describe("without search term", () => {
      it("should return full list of suggestions", async () => {
        const results = await fetchResults("/search");
        expect(results).toEqual(SUGGESTIONS);
      });
    });

    describe("with search term", () => {
      describe("when search term is empty", () => {
        it("should return full list of suggestions", async () => {
          const results = await fetchResults("/search?q=");
          expect(results).toEqual(SUGGESTIONS);
        });
      });

      describe("when search term matches exactly", () => {
        it("should return filtered suggestions", async () => {
          const results = await fetchResults("/search?q=Fashion");
          expect(results).toEqual(["Fashion"]);
        });
      });

      describe("when search term is different case", () => {
        it("should match and return filtered suggestions", async () => {
          const results = await fetchResults("/search?q=FOO");
          expect(results).toEqual(["Food", "Football"]);
        });
      });
  
      describe("when search term has leading/trailing spaces in it", () => {
        it("should match and return filtered suggestions", async () => {
          const results = await fetchResults("/search?q=%20travel%20%20");
          expect(results).toEqual(["Traveling"]);
        });
      });
    });

    describe("with non-existent query-param", () => {
      it("should return full list of suggestions", async () => {
        const results = await fetchResults("/search?invalid=abc");
        expect(results).toEqual(SUGGESTIONS);
      });
    });
  });

  describe("when requesting non-existent endpoint", () => {
    it("should return status 404", async () => {
      const response = await request("/foo");
      expect(response.status).toEqual(404);
    });
  });
});
