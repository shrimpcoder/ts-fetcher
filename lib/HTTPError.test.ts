import { HTTPError } from './HTTPError';

describe('HTTPError', () => {
  it('should create an instance', () => {
    const error = new HTTPError(404, 'Not Found');
    expect(error).toBeInstanceOf(HTTPError);
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Not Found');
    expect(error.name).toBe('HTTPError');
    expect(error.message).toBe('404 Not Found');
  });
});
