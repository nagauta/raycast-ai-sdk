# my-typescript-package

TypeScriptで作成されたnpmパッケージの雛形です。

## インストール

```bash
npm install my-typescript-package
```

## 使用方法

```typescript
import { greet, add } from 'my-typescript-package';

console.log(greet('世界')); // こんにちは、世界さん！
console.log(add(1, 2)); // 3
```

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