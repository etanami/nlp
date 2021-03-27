import { checkForUrl } from '../src/client/js/urlChecker';

describe('Test that the input is a url', () => {
  test('Testing checkForUrl() function', () => {
    expect(checkForUrl('hello')).toBe(false);
  });
});
