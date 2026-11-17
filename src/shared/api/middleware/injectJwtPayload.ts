import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import { EnvProvider } from '@/config/runtime/EnvProvider';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { ENV } from '@/shared/types/HonoENV';

const envProvider = EnvProvider.getInstance();

export const injectJwtPayload = createMiddleware<ENV>(async (c, next) => {
  const accessToken = getCookie(c, 'accessToken');
  if (accessToken) {
    const decodedPayload = await verify(
      accessToken,
      envProvider.get('ACCESS_TOKEN_SECRET'),
      APP_CONFIG.security.jwt_algorithm
    );
    const userId = new UserId(decodedPayload.sub as string);
    c.set('jwt-payload', { sub: userId.value });
  } else {
    c.set('jwt-payload', undefined);
  }
  await next();
});
