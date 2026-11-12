import { createRoute } from '@hono/zod-openapi';

import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';

import { registerBodySchema } from '../schemas/auth.requests.schema';
import { registerPayloadSchema } from '../schemas/auth.responses.schema';

export const registerRoute = createRoute({
  method: 'post',
  path: '/register',
  tags: ['Auth'],
  summary: 'Register user',
  request: {
    body: {
      description: 'User credentials to register',
      content: {
        'application/json': {
          schema: registerBodySchema
        }
      }
    }
  },
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
