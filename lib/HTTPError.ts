/**
 * HTTPError class
 * @description This class is used to represent an HTTP error.
 *
 * @property {number} status - The HTTP status code
 * @property {string} statusText - The HTTP status text
 * @property {string} name - The name of the error(HTTPError)
 * @property {string} message - The error message(status + statusText)
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
  constructor(public status: number, public statusText: string) {
    super(`${status} ${statusText}`);
  }
}
