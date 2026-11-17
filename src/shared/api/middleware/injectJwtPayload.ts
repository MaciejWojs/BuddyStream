import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { verify } from 'hono/jwt';
import {
  JwtAlgorithmMismatch,
  JwtHeaderInvalid,
  JwtTokenExpired,
  JwtTokenInvalid,
  JwtTokenIssuedAt,
  JwtTokenNotBefore,
  JwtTokenSignatureMismatched
} from 'hono/utils/jwt/types';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import { EnvProvider } from '@/config/runtime/EnvProvider';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { ENV } from '@/shared/types/HonoENV';

const envProvider = EnvProvider.getInstance();

const isRejectedAccessToken = (error: unknown): boolean =>
  error instanceof JwtTokenInvalid ||
  error instanceof JwtHeaderInvalid ||
  error instanceof JwtAlgorithmMismatch ||
  error instanceof JwtTokenNotBefore ||
  error instanceof JwtTokenExpired ||
  error instanceof JwtTokenIssuedAt ||
  error instanceof JwtTokenSignatureMismatched;

export const injectJwtPayload = createMiddleware<ENV>(async (c, next) => {
  const accessToken = getCookie(c, 'accessToken');

  if (!accessToken) {
    c.set('jwt-payload', undefined);
    return await next();
  }

  let decodedPayload;
  try {
    decodedPayload = await verify(
      accessToken,
      envProvider.get('ACCESS_TOKEN_SECRET'),
      APP_CONFIG.security.jwt_algorithm
    );
  } catch (error) {
    if (!isRejectedAccessToken(error)) {
      throw error;
    }
    c.set('jwt-payload', undefined);
    return await next();
  }

  const userId = new UserId(decodedPayload.sub as string);
  c.set('jwt-payload', { sub: userId.value });
  await next();
});
