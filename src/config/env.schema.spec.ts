import { envSchema } from './env.schema.js';

const baseEnv = {
  NODE_ENV: 'development',
  ANTHROPIC_API_KEY: 'test-key',
  ANTHROPIC_MODEL: 'test-model',
  AI_TIMEOUT: '5000',
  AI_MAX_TOKENS: '2048',
};

describe('envSchema', () => {
  it('should convert PORT to number', () => {
    const result = envSchema.parse({ ...baseEnv, PORT: '3000' });

    expect(result.PORT).toBe(3000);
    expect(typeof result.PORT).toBe('number');
  });

  it('should reject invalid PORT', () => {
    const result = envSchema.safeParse({ ...baseEnv, PORT: 'invalid' });

    expect(result.success).toBe(false);
  });

  it('should default PORT to 3000 when missing', () => {
    const result = envSchema.parse(baseEnv);

    expect(result.PORT).toBe(3000);
  });

  it('should reject PORT above 65535', () => {
    const result = envSchema.safeParse({ ...baseEnv, PORT: '65536' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['PORT']);
  });

  it('should convert AI_MAX_TOKENS to number', () => {
    const result = envSchema.parse({ ...baseEnv, AI_MAX_TOKENS: '4096' });

    expect(result.AI_MAX_TOKENS).toBe(4096);
    expect(typeof result.AI_MAX_TOKENS).toBe('number');
  });

  it('should reject empty ANTHROPIC_API_KEY', () => {
    const result = envSchema.safeParse({ ...baseEnv, ANTHROPIC_API_KEY: '' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['ANTHROPIC_API_KEY']);
  });

  it.each(['ANTHROPIC_API_KEY', 'ANTHROPIC_MODEL'])(
    'should reject whitespace-only %s',
    (key) => {
      const result = envSchema.safeParse({ ...baseEnv, [key]: '   ' });

      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.path).toEqual([key]);
    },
  );

  it('should trim surrounding whitespace from ANTHROPIC_MODEL', () => {
    const result = envSchema.parse({
      ...baseEnv,
      ANTHROPIC_MODEL: '  test-model  ',
    });

    expect(result.ANTHROPIC_MODEL).toBe('test-model');
  });
});
