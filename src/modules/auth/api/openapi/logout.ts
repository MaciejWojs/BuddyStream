import { createRoute } from '@hono/zod-openapi';

import { unauthorizedResponse } from '@/shared/api/openapi/errors/401.openapi';
import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';

import { refreshTokenCookieSchema } from '../schemas/auth.requests.schema';
import { logoutPayloadSchema } from '../schemas/auth.responses.schema';

export const logoutRoute = createRoute({
  method: 'post',
  path: '/logout',
  tags: ['Auth'],
  summary: 'Logout user',
  request: {
    cookies: refreshTokenCookieSchema
  },
  responses: {
    200: {
      description: 'User logged out successfully',
      content: {
        'application/json': {
          schema: logoutPayloadSchema
        }
      },
      headers: {
        'Set-Cookie': {
          description: 'Clears the accessToken and refreshToken cookies',
          schema: {
            type: 'object',
            required: ['accessToken', 'refreshToken'],
            properties: {
              accessToken: { type: 'string' },
              refreshToken: { type: 'string' }
            }
          },
          style: 'simple',
          explode: true,
          examples: {
            cleared: {
              dataValue: {
                accessToken: '; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax',
                refreshToken: '; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax'
              },
              serializedValue:
                'accessToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax\nrefreshToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax'
            }
          }
        }
      }
    },
    ...unauthorizedResponse,
    ...internalServerErrorResponse
  }
});
