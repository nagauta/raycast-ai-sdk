# Raycast AI SDK

Raycast AI SDK for integrating everything for Raycast Pro subscribers

## Installation

```bash
yarn add raycast-ai-sdk
```

## Usage

```typescript
import { askAI } from 'raycast-ai-sdk';

async function main() {
    const result = await askAI("Content you want to ask the AI");
    console.log(result);
}
```

### Sample
`yarn tsx sample/sample.ts`

### Options

You can set the following options when asking the AI:

- `creativity`: "high" | "medium" | "low"
- `model`: AI model to use (default: "openai-gpt-4")

## Prerequisites

- Raycast must be installed
- Raycast Pro subscription is requiredd
- [Raycast Port](https://www.raycast.com/litomore/raycast-port) must be installed
- callbackExec option must be enabled in Raycast Port


## Development

### Setup

```bash
yarn install
```

### Scripts

- `yarn build` - Compile TypeScript
- `yarn test` - Run tests
- `yarn lint` - Static code analysis
- `yarn format` - Format code

## License

MIT 