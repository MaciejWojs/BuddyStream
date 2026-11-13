import { createRoute } from '@hono/zod-openapi';

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
    }
  }
});
