import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  ANTHROPIC_API_KEY: z.string().trim().min(1),

  ANTHROPIC_MODEL: z.string().trim().min(1),

  AI_TIMEOUT: z.coerce.number().int().positive().max(120000).default(30000),

  AI_MAX_TOKENS: z.coerce.number().int().positive().default(2048),
});

export type Env = z.infer<typeof envSchema>;
