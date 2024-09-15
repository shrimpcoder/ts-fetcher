# Fetcher

`Fetcher`は、テキスト、JSON、Blob、FormData、ArrayBuffer などのさまざまなデータ形式を使用して HTTP リクエストを行うためのユーティリティクラスです。リクエストとレスポンスを処理するための統一されたインターフェースを提供し、コードベース全体で一貫性と再利用性を確保します。

## 特徴

- **GET リクエスト**: URL からデータを取得します。
- **POST リクエスト**: テキスト、JSON、Blob、FormData、ArrayBuffer データを URL に送信します。
- **エラーハンドリング**: HTTP エラーには`HTTPError`、スキーマ検証エラーには`ZodError`をスローします。
- **レスポンス解析**: コンテンツタイプに基づいてレスポンスを自動的に解析します。
- **URL ビルダー**: URL をビルドするためのオブジェクト指向なインターフェースを提供します。
- **クエリビルダー**: クエリパラメータをビルドするためのオブジェクト指向なインターフェースを提供します。

## インストール

```bash
npm install ts-fetcher
```

## Zod との統合

`Fetcher` は Zod との統合をサポートしています。Zod スキーマを使用してレスポンスを検証することができます。

> [!Note]
> 必ず Zod スキーマを使用しなければならないわけではありません。  
> Zod スキーマを指定しない場合、レスポンスは `unknown` として返されます。

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

## 使用方法

具体的な使用方法は[こちら](https://shrimpcoder.github.io/ts-fetcher/)を参照してください。

## ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています。
