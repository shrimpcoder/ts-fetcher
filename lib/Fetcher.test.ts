import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { Fetcher } from '../lib/Fetcher';
import { URLBuilder } from '../lib/URLBuilder';
import { HTTPError } from './HTTPError';

describe('Fetcher', () => {
  const mockUrl = 'https://api.example.com/';
  const mockSchema = z.object({ name: z.string() });
  const mockResponse = { name: 'example' };

  beforeEach(() => {
    // @ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
    ) as unknown as typeof fetch;
  });
  describe('get', () => {
    it('should fetch data with GET method', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const data = await Fetcher.get({ urlBuilder, schema: mockSchema });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'GET',
      });
    });
  });

  describe('postText', () => {
    it('should post text data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = 'example text';
      const contentType = 'text/plain';

      const data = await Fetcher.postText({ urlBuilder, body, schema: mockSchema, contentType });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
      });
    });
  });

  describe('postJson', () => {
    it('should post JSON data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = { key: 'value' };
      const contentType = 'application/json';

      const data = await Fetcher.postJson({ urlBuilder, body, schema: mockSchema, contentType });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body: JSON.stringify(body),
      });
    });
  });

  describe('postBlob', () => {
    it('should post blob data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = new Blob(['example blob'], { type: 'text/plain' });
      const contentType = 'image/jpeg';

      const data = await Fetcher.postBlob({ urlBuilder, body, schema: mockSchema, contentType });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
      });
    });
  });

  describe('postArrayBuffer', () => {
    it('should post array buffer data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = new ArrayBuffer(8);
      const contentType = 'application/octet-stream';

      const data = await Fetcher.postArrayBuffer({
        urlBuilder,
        body,
        schema: mockSchema,
        contentType,
      });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
      });
    });
  });

  describe('postFormData', () => {
    it('should post form data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = new FormData();

      body.append('key', 'value');
      const contentType = 'multipart/form-data';

      const data = await Fetcher.postFormData({
        urlBuilder,
        body,
        schema: mockSchema,
        contentType,
      });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
      });
    });
  });
  describe('postBlob', () => {
    it('should post blob data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = new Blob(['example blob'], { type: 'text/plain' });
      const contentType = 'image/jpeg';

      const data = await Fetcher.postBlob({ urlBuilder, body, schema: mockSchema, contentType });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
      });
    });
  });
  describe('postArrayBuffer', () => {
    it('should post array buffer data', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const body = new ArrayBuffer(8);
      const contentType = 'application/octet-stream';

      const data = await Fetcher.postArrayBuffer({
        urlBuilder,
        body,
        schema: mockSchema,
        contentType,
      });

      expect(data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body,
      });
    });
  });
  describe('handleResponse', () => {
    it('should throw HTTPError if response is not ok', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const response = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };

      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      await expect(Fetcher.get({ urlBuilder, schema: mockSchema })).rejects.toThrow(
        new HTTPError(404, 'Not Found')
      );
    });
  });

  describe('parseResponse', () => {
    it('should parse json response', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const response = {
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      };
      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      const data = await Fetcher.get({ urlBuilder, schema: mockSchema });

      expect(data).toEqual(mockResponse);
    });
    it('should parse text response', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const textSchema = z.string();
      const response = {
        ok: true,
        text: () => Promise.resolve('example text'),
        headers: new Headers({ 'Content-Type': 'text/plain' }),
      };
      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      const data = await Fetcher.get({ urlBuilder, schema: textSchema });

      expect(data).toEqual('example text');
    });
    it('should parse blob response', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const blobSchema = z.instanceof(Blob);
      const response = {
        ok: true,
        blob: () => Promise.resolve(new Blob(['example blob'], { type: 'text/plain' })),
        headers: new Headers({ 'Content-Type': 'image/jpeg' }),
      };
      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      const data = await Fetcher.get({ urlBuilder, schema: blobSchema });

      expect(data).toEqual(new Blob(['example blob'], { type: 'text/plain' }));
    });
    it('should parse array buffer response', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const arrayBufferSchema = z.instanceof(ArrayBuffer);
      const response = {
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
        headers: new Headers({ 'Content-Type': 'application/octet-stream' }),
      };
      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      const data = await Fetcher.get({ urlBuilder, schema: arrayBufferSchema });

      expect(data).toEqual(new ArrayBuffer(8));
    });
    it('should parse form data response', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const formDataSchema = z.instanceof(FormData);
      const response = {
        ok: true,
        formData: () => Promise.resolve(new FormData()),
        headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
      };
      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      const data = await Fetcher.get({ urlBuilder, schema: formDataSchema });

      expect(data).toEqual(new FormData());
    });
    it('should parse undefined response', async () => {
      const urlBuilder = new URLBuilder({ baseUrl: mockUrl });
      const undefinedSchema = z.undefined();
      const response = {
        ok: true,
        headers: new Headers(),
      };
      // @ts-ignore
      global.fetch = vi.fn(() => Promise.resolve(response)) as unknown as typeof fetch;

      const data = await Fetcher.get({ urlBuilder, schema: undefinedSchema });

      expect(data).toEqual(undefined);
    });
  });
});
