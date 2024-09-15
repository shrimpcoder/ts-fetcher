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
 * Type for POST parameters
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
 * Class for fetching data from a URL
 *
 * @example
 * ```ts
 * const fetcher = new Fetcher();
 * const data = await fetcher.get('https://api.example.com', { schema: z.object({ name: z.string() }) });
 * ```
 */
export class Fetcher {
  /**
   * Fetches data from a URL
   * @param {URLBuilder} urlBuilder - The URL builder
   * @param {z.ZodSchema<T>} schema - The schema to parse the response
   * @param {RequestInit} options - The request options
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
   */
  static async get<T = unknown>({ urlBuilder, schema, options = {} }: GetParams<T>): Promise<T> {
    const response = await fetch(urlBuilder.build(), { ...options, method: 'GET' });
    const data = await this.handleResponse(response);
    return schema ? schema.parse(data) : (data as T);
  }

  /**
   * Posts text data to a URL
   * @param {URLBuilder} urlBuilder - The URL builder
   * @param {string} body - The body of the request
   * @param {z.ZodSchema<T>} schema - The schema to parse the response
   * @param {TextContentType} contentType - The content type of the request
   * @param {RequestInit} options - The request options
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
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
   * @param {URLBuilder} urlBuilder - The URL builder
   * @param {string} body - The body of the request
   * @param {z.ZodSchema<T>} schema - The schema to parse the response
   * @param {JsonContentType} contentType - The content type of the request
   * @param {RequestInit} options - The request options
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
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
   * @param {URLBuilder} urlBuilder - The URL builder
   * @param {FormData} body - The body of the request
   * @param {z.ZodSchema<T>} schema - The schema to parse the response
   * @param {FormDataContentType} contentType - The content type of the request
   * @param {RequestInit} options - The request options
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
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
   * @param {URLBuilder} urlBuilder - The URL builder
   * @param {Blob} body - The body of the request
   * @param {z.ZodSchema<T>} schema - The schema to parse the response
   * @param {BlobContentType} contentType - The content type of the request
   * @param {RequestInit} options - The request options
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
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
   * @param {URLBuilder} urlBuilder - The URL builder
   * @param {ArrayBuffer} body - The body of the request
   * @param {z.ZodSchema<T>} schema - The schema to parse the response
   * @param {ArrayBufferContentType} contentType - The content type of the request
   * @param {RequestInit} options - The request options
   * @returns The parsed response
   * @throws HTTPError if the response is not ok
   * @throws ZodError if the response is not valid
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
