import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import { EnvProvider } from '@/config/runtime/EnvProvider';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { ENV } from '@/shared/types/HonoENV';

const envProvider = EnvProvider.getInstance();

export const injectJwtPayload = createMiddleware<ENV>(async (c, next) => {
  if (c.req.header('Authorization')) {
    const authHeader = c.req.header('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    try {
      const decodedPayload = await verify(
        token,
        envProvider.get('ACCESS_TOKEN_SECRET'),
        APP_CONFIG.security.jwt_algorithm
      );

      const userId = new UserId(decodedPayload.sub as string);

      c.set('jwt-payload', { sub: userId.value });
    } catch {
      c.set('jwt-payload', undefined);
    }
  }
  await next();
});
