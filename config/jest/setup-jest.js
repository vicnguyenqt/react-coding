import "whatwg-fetch";
import nock from "nock";

// Monkeypatch from https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

// Monkeypatch to resolve https://github.com/testing-library/dom-testing-library/issues/875
const removeReactInternalInstance = element => {
  const keys = Object.keys(element);
  const reactInternalInstanceKey = keys.find(key => /^__reactInternalInstance/.test(key));
  if (reactInternalInstanceKey != null) delete element[reactInternalInstanceKey];
};
const { expect } = window;
window.expect = (actual, ...rest) => {
  if (typeof actual === 'object' && actual !== null) {
    if (Array.isArray(actual)) {
      actual.forEach(removeReactInternalInstance);
    } else {
      removeReactInternalInstance(actual);
    }
  }
  return expect(actual, ...rest);
};
Object.entries(expect).forEach(([key, value]) => window.expect[key] = value);

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
