import { APPLICATION_ENV, envSchema } from './env';

export class EnvProvider {
  private static instance: EnvProvider | undefined;

  private readonly env: APPLICATION_ENV;

  private constructor(environment: Record<string, string | undefined>) {
    const parsedEnvironment = envSchema.safeParse(environment);
    if (!parsedEnvironment.success) {
      throw new Error(`Invalid environment variables: ${parsedEnvironment.error.message}`);
    }
    this.env = parsedEnvironment.data;
    EnvProvider.instance = this;
  }

  static getInstance(environment: Record<string, string | undefined> = process.env): EnvProvider {
    EnvProvider.instance ??= new EnvProvider(environment);
    return EnvProvider.instance;
  }

  get<K extends keyof APPLICATION_ENV>(key: K): APPLICATION_ENV[K] {
    return this.env[key];
  }
}
