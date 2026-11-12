import { createRoute } from '@hono/zod-openapi';

import { logoutPayloadSchema } from '../schemas/auth.responses.schema';

export const logoutRoute = createRoute({
  method: 'post',
  path: '/logout',
  tags: ['Auth'],
  summary: 'Logout user',
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
