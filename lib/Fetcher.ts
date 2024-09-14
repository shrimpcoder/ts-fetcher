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
  static async get<T>(
    urlBuilder: URLBuilder,
    schema: z.ZodSchema<T>,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(urlBuilder.build(), { ...options, method: 'GET' });
    return schema.parse(await this.handleResponse(response));
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
  static async postText<T>(
    urlBuilder: URLBuilder,
    body: string,
    schema: z.ZodSchema<T>,
    contentType: TextContentType,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      headers: { ...options.headers, 'Content-Type': contentType },
      body,
    });
    return schema.parse(await this.handleResponse(response));
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
  static async postJson<T>(
    urlBuilder: URLBuilder,
    body: Record<string, unknown>,
    schema: z.ZodSchema<T>,
    contentType: JsonContentType,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      headers: { ...options.headers, 'Content-Type': contentType },
      body: JSON.stringify(body),
    });
    return schema.parse(await this.handleResponse(response));
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
  static async postFormData<T>(
    urlBuilder: URLBuilder,
    body: FormData,
    schema: z.ZodSchema<T>,
    contentType: FormDataContentType,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      headers: { ...options.headers, 'Content-Type': contentType },
      body: body,
    });
    return schema.parse(await this.handleResponse(response));
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
  static async postBlob<T>(
    urlBuilder: URLBuilder,
    body: Blob,
    schema: z.ZodSchema<T>,
    contentType: BlobContentType,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      body: body,
      headers: { ...options.headers, 'Content-Type': contentType },
    });
    return schema.parse(await this.handleResponse(response));
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
  static async postArrayBuffer<T>(
    urlBuilder: URLBuilder,
    body: ArrayBuffer,
    schema: z.ZodSchema<T>,
    contentType: ArrayBufferContentType,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(urlBuilder.build(), {
      ...options,
      method: 'POST',
      body: body,
      headers: { ...options.headers, 'Content-Type': contentType },
    });
    return schema.parse(await this.handleResponse(response));
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
