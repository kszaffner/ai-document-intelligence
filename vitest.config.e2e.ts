import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // AppModule validates env on import (ConfigModule.forRoot), so required
    // variables must exist before test files load. Dummy values only.
    env: {
      NODE_ENV: 'test',
      ANTHROPIC_API_KEY: 'test-key',
      ANTHROPIC_MODEL: 'test-model',
    },
  },
});
