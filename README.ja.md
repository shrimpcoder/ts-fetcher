# Fetcher

`Fetcher`は、テキスト、JSON、Blob、FormData、ArrayBuffer などのさまざまなデータ形式を使用して HTTP リクエストを行うためのユーティリティクラスです。リクエストとレスポンスを処理するための統一されたインターフェースを提供し、コードベース全体で一貫性と再利用性を確保します。

## 特徴

- **GET リクエスト**: URL からデータを取得します。
- **POST リクエスト**: テキスト、JSON、Blob、FormData、ArrayBuffer データを URL に送信します。
- **エラーハンドリング**: HTTP エラーには`HTTPError`、スキーマ検証エラーには`ZodError`をスローします。
- **レスポンス解析**: コンテンツタイプに基づいてレスポンスを自動的に解析します。

## インストール

```bash
npm install fetcher-ts
```

## 使用方法

### GET リクエスト

```typescript
import { Fetcher } from 'fetcher-ts';
import { URLBuilder } from 'fetcher-ts';
import { z } from 'zod';

const urlBuilder = new URLBuilder({ baseUrl: 'https://api.example.com' });
const schema = z.object({ name: z.string() });

const data = await Fetcher.get(urlBuilder, schema);
console.log(data);
```

### POST JSON リクエスト

```typescript
import { Fetcher } from 'fetcher-ts';
import { URLBuilder } from 'fetcher-ts';
import { z } from 'zod';

const urlBuilder = new URLBuilder({ baseUrl: 'https://api.example.com' });
const schema = z.object({ name: z.string() });
const body = { name: 'example' };

const data = await Fetcher.postJson(urlBuilder, body, schema, 'application/json');
console.log(data);
```

## テスト

このプロジェクトには、すべての機能に対する包括的なテストが含まれています。以下のコマンドでテストを実行できます。

```bash
npm test
```

> [!Warning]
> テストを実行する前に、すべての依存関係がインストールされていることを確認してください。

## ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています。
