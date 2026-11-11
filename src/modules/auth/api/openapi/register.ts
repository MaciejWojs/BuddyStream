import { createRoute } from '@hono/zod-openapi';

import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';

import { registerPayloadSchema } from '../schemas/auth.responses.schema';

export const registerRoute = createRoute({
  method: 'post',
  path: '/register',
  tags: ['Auth'],
  summary: 'Register user',
  responses: {
    200: {
      description: 'User registered successfully',
      content: {
        'application/json': {
          schema: registerPayloadSchema
        }
      }
    },
    ...internalServerErrorResponse
  }
});
