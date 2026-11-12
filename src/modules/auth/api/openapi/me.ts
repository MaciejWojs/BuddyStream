import { createRoute } from '@hono/zod-openapi';

import { unauthorizedResponse } from '@/shared/api/openapi/errors/401.openapi';
import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';

import { mePayloadSchema } from '../schemas/auth.responses.schema';

export const meRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Auth'],
  summary: 'Get authenticated user info',
  security: [
    {
      AuthorizationBearer: []
    }
  ],
  responses: {
    200: {
      description: 'Authenticated user information retrieved successfully',
      content: {
        'application/json': {
          schema: mePayloadSchema
        }
      }
    },
    ...unauthorizedResponse,
    ...internalServerErrorResponse
  }
});
