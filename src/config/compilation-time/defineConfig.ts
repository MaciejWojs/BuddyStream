import { type AppConfig, configSchema } from './configSchema';

export function defineConfig<const T extends AppConfig>(config: T): T {
  const parsed = configSchema.safeParse(config);

  if (!parsed.success) {
    throw new Error(`Invalid app config: ${parsed.error.message}`);
  }

  return config;
}
