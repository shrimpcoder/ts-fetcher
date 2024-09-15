import { z } from 'zod';
import {
  ArrayBufferContentType,
  BlobContentType,
  FormDataContentType,
  JsonContentType,
  parseContentType,
  TextContentType,
} from './ContentTypes';
import { HTTPError } from './HTTPError';
import { URLBuilder } from './URLBuilder';

/**
 * Type for GET parameters
 * @template T - The type of the response
 */
export type GetParams<T> = {
  urlBuilder: URLBuilder;
  schema?: z.ZodSchema<T>;
  options?: RequestInit;
};

/**
 * Type for POST text parameters
 * @template T - The type of the response
 */
export type PostTextParams<T> = {
  urlBuilder: URLBuilder;
  body: string;
  schema?: z.ZodSchema<T>;
  contentType: TextContentType;
  options?: RequestInit;
};

/**
 * Type for POST JSON parameters
 * @template T - The type of the response
 */
export type PostJsonParams<T> = {
  urlBuilder: URLBuilder;
  body: Record<string, unknown>;
  schema?: z.ZodSchema<T>;
  contentType: JsonContentType;
  options?: RequestInit;
};

/**
 * Type for POST form data parameters
 * @template T - The type of the response
 */
export type PostFormDataParams<T> = {
  urlBuilder: URLBuilder;
  body: FormData;
  schema?: z.ZodSchema<T>;
  contentType: FormDataContentType;
  options?: RequestInit;
};

/**
 * Type for POST blob parameters
 * @template T - The type of the response
 */
export type PostBlobParams<T> = {
  urlBuilder: URLBuilder;
  body: Blob;
  schema?: z.ZodSchema<T>;
  contentType: BlobContentType;
  options?: RequestInit;
};

/**
 * Type for POST array buffer parameters
 * @template T - The type of the response
 */
export type PostArrayBufferParams<T> = {
  urlBuilder: URLBuilder;
  body: ArrayBuffer;
  schema?: z.ZodSchema<T>;
  contentType: ArrayBufferContentType;
  options?: RequestInit;
};

/**
 * Fetcher class for fetching data from a URL
 *
 * This class provides methods for fetching data from a URL with different content types.
 * It uses the URLBuilder class to build the URL and the Zod schema to parse the response.
 * It also uses the fetch API to make the request.
 *
 * @example
 * ```ts
 * const data = await Fetcher.get({
 *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
 *   schema: z.object({ name: z.string() }),
 * });
 * ```
 */
export class Fetcher {
  /**
   * GET request
   *
   * Fetches data from a URL with a GET request.
   * @param {GetParams<T>} params - The parameters for the GET request
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   *
   * @example
   * ```ts
   * const data = await Fetcher.get({
   *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
   *   schema: z.object({ name: z.string() }),
   * });
   * ```
   */
  static async get<T = unknown>({ urlBuilder, schema, options = {} }: GetParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), { ...options, method: 'GET' });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * POST text data to a URL
   *
   * Posts text data to a URL with a POST request.
   * @param {PostTextParams<T>} params - The parameters for the POST request
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   *
   * @example
   * ```ts
   * const data = await Fetcher.postText({
   *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
   *   body: 'Hello, world!',
   *   schema: z.object({ name: z.string() }),
   *   contentType: 'text/plain',
   * });
   * ```
   */
  static async postText<T = unknown>({
    urlBuilder,
    body,
    schema,
    contentType,
    options = {},
  }: PostTextParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      headers: { ...options.headers, 'Content-Type': contentType },
      body,
    });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * Posts JSON data to a URL
   *
   * Posts JSON data to a URL with a POST request.
   * @param {PostJsonParams<T>} params - The parameters for the POST request
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   *
   * @example
   * ```ts
   * const data = await Fetcher.postJson({
   *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
   *   body: { name: 'example' },
   *   schema: z.object({ name: z.string() }),
   *   contentType: 'application/json',
   * });
   * ```
   */
  static async postJson<T = unknown>({
    urlBuilder,
    body,
    schema,
    contentType,
    options = {},
  }: PostJsonParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      headers: { ...options.headers, 'Content-Type': contentType },
      body: JSON.stringify(body),
    });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * Posts form data to a URL
   *
   * Posts form data to a URL with a POST request.
   * @param {PostFormDataParams<T>} params - The parameters for the POST request
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   *
   * @example
   * ```ts
   * const data = await Fetcher.postFormData({
   *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
   *   body: new FormData(),
   *   schema: z.object({ name: z.string() }),
   *   contentType: 'application/x-www-form-urlencoded',
   * });
   */
  static async postFormData<T = unknown>({
    urlBuilder,
    body,
    schema,
    contentType,
    options = {},
  }: PostFormDataParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      headers: { ...options.headers, 'Content-Type': contentType },
      body: body,
    });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * Posts blob data to a URL
   *
   * Posts blob data to a URL with a POST request.
   * @param {PostBlobParams<T>} params - The parameters for the POST request
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   *
   * @example
   * ```ts
   * const data = await Fetcher.postBlob({
   *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
   *   body: new Blob(),
   *   schema: z.object({ name: z.string() }),
   *   contentType: 'image/png',
   * });
   */
  static async postBlob<T = unknown>({
    urlBuilder,
    body,
    schema,
    contentType,
    options = {},
  }: PostBlobParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      body: body,
      headers: { ...options.headers, 'Content-Type': contentType },
    });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * Posts array buffer data to a URL
   *
   * Posts array buffer data to a URL with a POST request.
   * @param {PostArrayBufferParams<T>} params - The parameters for the POST request
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   *
   * @example
   * ```ts
   * const data = await Fetcher.postArrayBuffer({
   *   urlBuilder: new URLBuilder({ baseUrl: 'https://api.example.com' }),
   *   body: new ArrayBuffer(),
   *   schema: z.object({ name: z.string() }),
   *   contentType: 'application/octet-stream',
   * });
   */
  static async postArrayBuffer<T = unknown>({
    urlBuilder,
    body,
    schema,
    contentType,
    options = {},
  }: PostArrayBufferParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      body: body,
      headers: { ...options.headers, 'Content-Type': contentType },
    });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * Handles the response
   *
   * Checks if the response is ok and parses the response based on the content type.
   * @param {Response} response - The response to handle
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   */
  private static async handleResponse(response: Response): Promise<unknown> {
    if (!response.ok) {
      throw new HTTPError(response.status, response.statusText);
    }
    return this.parseResponse(response);
  }

  /**
   * Parses the response based on the content type
   *
   * Parses the response based on the content type.
   * @param {Response} response - The response to parse
   * @returns The parsed response
   */
  private static async parseResponse(response: Response): Promise<unknown> {
    switch (parseContentType(response.headers)) {
      case 'json':
        return response.json();
      case 'text':
        return response.text();
      case 'blob':
        return response.blob();
      case 'arrayBuffer':
        return response.arrayBuffer();
      case 'formData':
        return response.formData();
      default:
        return undefined;
    }
  }
}
