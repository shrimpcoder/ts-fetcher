# Fetcher

`Fetcher` is a utility class for making HTTP requests with various data formats (text, JSON, Blob, FormData, ArrayBuffer). It provides a unified interface for handling requests and responses, ensuring consistency and reusability across your codebase.

## Features

- **GET Requests**: Fetch data from a URL.
- **POST Requests**: Send text, JSON, Blob, FormData, and ArrayBuffer data to a URL.
- **Error Handling**: Throws `HTTPError` for HTTP errors and `ZodError` for schema validation errors.
- **Response Parsing**: Automatically parses responses based on content type.
- **URL Builder**: Provides an object-oriented interface for building URLs.
- **Query Builder**: Provides an object-oriented interface for building query parameters.

## Installation

```bash
npm install @shrimpcoder/ts-fetcher
```

## Integration with Zod

`Fetcher` supports integration with Zod. You can use Zod schemas to validate responses.

> [!Note]
> You are not required to use Zod schemas.  
> If no Zod schema is specified, the response will be returned as `unknown`.

```bash
npm install zod
```

```typescript
import { Fetcher } from 'ts-fetcher';
import { URLBuilder } from 'ts-fetcher';
import { z } from 'zod';

const urlBuilder = new URLBuilder({ baseUrl: 'https://api.example.com' });
const schema = z.object({ name: z.string() });

await Fetcher.get(urlBuilder, schema); // {name: string}
await Fetcher.get(urlBuilder); // unknown
```

## Usage

For detailed usage, please refer to [here](https://shrimpcoder.github.io/ts-fetcher/).

## License

This project is licensed under the MIT License.
