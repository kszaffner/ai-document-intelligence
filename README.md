# ai-document-intelligence

NestJS 12 application (ESM, TypeScript strict, Vitest, oxlint, Prettier).

## Requirements

- Node.js 22 (see `.nvmrc`)
- npm

## Setup

```bash
npm install
```

## Run

```bash
npm run start       # development
npm run start:dev   # watch mode
npm run build && npm run start:prod
```

The app listens on `PORT` (default `3000`).

## Quality checks

```bash
npm test            # unit tests (*.spec.ts)
npm run test:e2e    # e2e tests (test/*.e2e-spec.ts)
npm run test:cov    # coverage
npm run lint        # oxlint (type-aware)
npm run format      # prettier
```
