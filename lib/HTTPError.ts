/**
 * Error class for HTTP errors
 *
 * @example
 * ```ts
 * throw new HTTPError(404, 'Not Found');
 * ```
 */
export class HTTPError extends Error {
  name = 'HTTPError';

  /**
   * Constructor for HTTPError
   * @param status - The HTTP status code
   * @param statusText - The HTTP status text
   */
  constructor(public status: number, statusText: string) {
    super(statusText);
  }
}
