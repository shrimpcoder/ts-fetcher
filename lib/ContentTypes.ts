import { z } from 'zod';

/**
 * Zod schema for text content types
 *
 * @example
 * ```ts
 * const textContentType = textContentTypesSchema.parse('text/plain');
 * console.log(textContentType); // text/plain
 * ```
 */
export const textContentTypesSchema = z.enum([
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'text/csv',
  'application/x-www-form-urlencoded',
  'text/xml',
]);

/**
 * Zod schema for JSON content types
 *
 * @example
 * ```ts
 * const jsonContentType = jsonContentTypesSchema.parse('application/json');
 * console.log(jsonContentType); // application/json
 * ```
 */
export const jsonContentTypesSchema = z.enum(['application/json', 'application/ld+json']);

/**
 * Zod schema for form data content types
 *
 * @example
 * ```ts
 * const formDataContentType = formDataContentTypesSchema.parse('multipart/form-data');
 * console.log(formDataContentType); // multipart/form-data
 * ```
 */
export const formDataContentTypesSchema = z.enum(['multipart/form-data']);

/**
 * Zod schema for blob content types
 *
 * @example
 * ```ts
 * const blobContentType = blobContentTypesSchema.parse('image/jpeg');
 * console.log(blobContentType); // image/jpeg
 * ```
 */
export const blobContentTypesSchema = z.enum([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/zip',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/atom+xml',
  'application/rss+xml',
]);

/**
 * Zod schema for array buffer content types
 *
 * @example
 * ```ts
 * const arrayBufferContentType = arrayBufferContentTypesSchema.parse('application/octet-stream');
 * console.log(arrayBufferContentType); // application/octet-stream
 * ```
 */
export const arrayBufferContentTypesSchema = z.enum([
  'application/octet-stream',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'video/mp4',
  'video/ogg',
  'video/webm',
  'font/woff',
  'font/woff2',
  'application/font-woff',
  'application/xml',
  'application/xhtml+xml',
  'application/x-yaml',
]);

/**
 * Zod schema for all content types
 *
 * @example
 * ```ts
 * const contentType = contentTypeSchema.parse('text/plain');
 * console.log(contentType); // text/plain
 * ```
 */
export const contentTypesSchema = z.union([
  textContentTypesSchema,
  jsonContentTypesSchema,
  formDataContentTypesSchema,
  blobContentTypesSchema,
  arrayBufferContentTypesSchema,
]);

/**
 * Type for text content types
 *
 * @example
 * ```ts
 * const textContentType: TextContentType = 'text/plain';
 * console.log(textContentType); // text/plain
 * ```
 */
export type TextContentType = z.infer<typeof textContentTypesSchema>;

/**
 * Type for JSON content types
 *
 * @example
 * ```ts
 * const jsonContentType: JsonContentType = 'application/json';
 * console.log(jsonContentType); // application/json
 * ```
 */
export type JsonContentType = z.infer<typeof jsonContentTypesSchema>;
/**
 * Type for form data content types
 *
 * @example
 * ```ts
 * const formDataContentType: FormDataContentType = 'multipart/form-data';
 * console.log(formDataContentType); // multipart/form-data
 * ```
 */
export type FormDataContentType = z.infer<typeof formDataContentTypesSchema>;

/**
 * Type for blob content types
 *
 * @example
 * ```ts
 * const blobContentType: BlobContentType = 'image/jpeg';
 * console.log(blobContentType); // image/jpeg
 * ```
 */
export type BlobContentType = z.infer<typeof blobContentTypesSchema>;

/**
 * Type for array buffer content types
 *
 * @example
 * ```ts
 * const arrayBufferContentType: ArrayBufferContentType = 'application/octet-stream';
 * console.log(arrayBufferContentType); // application/octet-stream
 * ```
 */
export type ArrayBufferContentType = z.infer<typeof arrayBufferContentTypesSchema>;

/**
 * Type for content types
 *
 * @example
 * ```ts
 * const contentType: ContentType = 'text/plain';
 * console.log(contentType); // text/plain
 * ```
 */
export type ContentType = z.infer<typeof contentTypesSchema>;

/**
 * Type for parser types
 *
 * @example
 * ```ts
 * const parserType: ParserType = 'text';
 * console.log(parserType); // text
 * ```
 */
export type ParserType = 'text' | 'json' | 'formData' | 'blob' | 'arrayBuffer';

/**
 * Parse the content type from the headers
 *
 * @example
 * ```ts
 * const parserType = parseContentType(headers);
 * console.log(parserType); // text
 * ```
 * @param {Headers} headers - The headers to parse the content type from
 * @returns {ParserType} The parser type
 * @throws {Error} If the content type is not supported
 */
export const parseContentType = (headers: Headers): ParserType | undefined => {
  const contentType = (headers.get('Content-Type') ||
    headers.get('content-type')) as ContentType | null;
  if (!contentType) {
    return undefined;
  }
  if (textContentTypesSchema.safeParse(contentType).success) {
    return 'text';
  }
  if (jsonContentTypesSchema.safeParse(contentType).success) {
    return 'json';
  }
  if (formDataContentTypesSchema.safeParse(contentType).success) {
    return 'formData';
  }
  if (blobContentTypesSchema.safeParse(contentType).success) {
    return 'blob';
  }
  if (arrayBufferContentTypesSchema.safeParse(contentType).success) {
    return 'arrayBuffer';
  }
  return undefined;
};
