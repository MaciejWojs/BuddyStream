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
      }
    },
    ...unauthorizedResponse,
    ...internalServerErrorResponse
  }
});
