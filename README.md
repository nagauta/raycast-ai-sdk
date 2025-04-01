# raycast-ai-sdk

RaycastのAI機能をプログラムから利用するためのTypeScriptパッケージです。

## インストール

```bash
npm install raycast-ai-sdk
```

## 使用方法

```typescript
import { askAI } from 'raycast-ai-sdk';

async function main() {
    const result = await askAI("AIに質問したい内容");
    console.log(result);
}
```

### sample
`npx tsx sample/sample.ts`

### オプション

AIへの質問時に以下のオプションを設定できます：

- `creativity`: "high" | "medium" | "low"
- `model`: 使用するAIモデル（デフォルト: "openai-gpt-4"）

## 前提条件

- Raycastがインストールされていること
- Raycast AI機能が利用可能な状態であること

## 開発

### セットアップ

```bash
npm install
```

### スクリプト

- `npm run build` - TypeScriptのコンパイル
- `npm run test` - テストの実行
- `npm run lint` - コードの静的解析
- `npm run format` - コードのフォーマット

## ライセンス

MIT 