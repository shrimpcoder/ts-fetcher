# Fetcher

`Fetcher` is a utility class for making HTTP requests with various data formats (text, JSON, Blob, FormData, ArrayBuffer). It provides a unified interface for handling requests and responses, ensuring consistency and reusability across your codebase.

## Features

- **GET Requests**: Fetch data from a URL.
- **POST Requests**: Send text, JSON, Blob, FormData, and ArrayBuffer data to a URL.
- **Error Handling**: Throws `HTTPError` for HTTP errors and `ZodError` for schema validation errors.
- **Response Parsing**: Automatically parses responses based on content type.

## Installation

```bash
npm install ts-fetcher
```

## Usage

### GET Request

```typescript
import { Fetcher } from 'ts-fetcher';
import { URLBuilder } from 'ts-fetcher';
import { z } from 'zod';

const urlBuilder = new URLBuilder({ baseUrl: 'https://api.example.com' });
const schema = z.object({ name: z.string() });

const data = await Fetcher.get(urlBuilder, schema);
console.log(data);
```

### POST JSON Request

```typescript
import { Fetcher } from 'ts-fetcher';
import { URLBuilder } from 'ts-fetcher';
import { z } from 'zod';

const urlBuilder = new URLBuilder({ baseUrl: 'https://api.example.com' });
const schema = z.object({ name: z.string() });
const body = { name: 'example' };

const data = await Fetcher.postJson(urlBuilder, body, schema, 'application/json');
console.log(data);
```

## Testing

The project includes comprehensive tests for all functionalities. You can run the tests using:

```bash
npm test
```

> [!Warning]
> Ensure all dependencies are installed before running tests.

## License

This project is licensed under the MIT License.
