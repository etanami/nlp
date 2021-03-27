import { handleSubmit } from '../src/client/js/formHandler';

describe('Testing submit functionality', () => {
  test('Testing handleSubmit() function', () => {
    expect(handleSubmit).toBeDefined();
  });
});
