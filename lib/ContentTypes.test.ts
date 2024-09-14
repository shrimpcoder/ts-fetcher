import {
  arrayBufferContentTypesSchema,
  blobContentTypesSchema,
  contentTypesSchema,
  formDataContentTypesSchema,
  jsonContentTypesSchema,
  parseContentType,
  textContentTypesSchema,
} from './ContentTypes';

describe('ContentTypes', () => {
  describe('textContentTypesSchema', () => {
    it('should be able to create a text content type', () => {
      const textContentType = textContentTypesSchema.parse('text/plain');
      expect(textContentType).toBe('text/plain');
    });
  });
  describe('jsonContentTypesSchema', () => {
    it('should be able to create a json content type', () => {
      const jsonContentType = jsonContentTypesSchema.parse('application/json');
      expect(jsonContentType).toBe('application/json');
    });
  });
  describe('arrayBufferContentTypesSchema', () => {
    it('should be able to create a arrayBuffer content type', () => {
      const arrayBufferContentType = arrayBufferContentTypesSchema.parse(
        'application/octet-stream'
      );
      expect(arrayBufferContentType).toBe('application/octet-stream');
    });
  });
  describe('blobContentTypesSchema', () => {
    it('should be able to create a blob content type', () => {
      const blobContentType = blobContentTypesSchema.parse('image/jpeg');
      expect(blobContentType).toBe('image/jpeg');
    });
  });
  describe('contentTypesSchema', () => {
    it('should be able to create a content type', () => {
      const contentType = contentTypesSchema.parse('application/json');
      expect(contentType).toBe('application/json');
    });
  });
  describe('formDataContentTypesSchema', () => {
    it('should be able to create a formData content type', () => {
      const formDataContentType = formDataContentTypesSchema.parse('multipart/form-data');
      expect(formDataContentType).toBe('multipart/form-data');
    });
  });
  describe('parseContentType', () => {
    it('should return text if the content type is text/plain', () => {
      const contentType = parseContentType(new Headers({ 'Content-Type': 'text/plain' }));
      expect(contentType).toBe('text');
    });
    it('should return json if the content type is application/json', () => {
      const contentType = parseContentType(new Headers({ 'Content-Type': 'application/json' }));
      expect(contentType).toBe('json');
    });
    it('should return blob if the content type is image/jpeg', () => {
      const contentType = parseContentType(new Headers({ 'Content-Type': 'image/jpeg' }));
      expect(contentType).toBe('blob');
    });
    it('should return arrayBuffer if the content type is application/octet-stream', () => {
      const contentType = parseContentType(
        new Headers({ 'Content-Type': 'application/octet-stream' })
      );
      expect(contentType).toBe('arrayBuffer');
    });
    it('should return formData if the content type is multipart/form-data', () => {
      const contentType = parseContentType(new Headers({ 'Content-Type': 'multipart/form-data' }));
      expect(contentType).toBe('formData');
    });
    it('should return undefined if the content type is not set', () => {
      const contentType = parseContentType(new Headers());
      expect(contentType).toBeUndefined();
    });
    it('should return undefined if the content type is not supported', () => {
      const contentType = parseContentType(new Headers({ 'Content-Type': 'invalid' }));
      expect(contentType).toBeUndefined();
    });
  });
});
