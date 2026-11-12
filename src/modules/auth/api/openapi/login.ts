import { createRoute } from '@hono/zod-openapi';

import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';

import { loginPayloadSchema } from '../schemas/auth.responses.schema';

export const loginRoute = createRoute({
  method: 'post',
  path: '/login',
  tags: ['Auth'],
  summary: 'Login user',
  request: {
    body: {
      description: 'User credentials to login',
      content: {
        'application/json': {
          schema: loginPayloadSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'User logged in successfully',
      content: {
        'application/json': {
          schema: loginPayloadSchema
        }
      }
    },
    ...internalServerErrorResponse
  }
});
