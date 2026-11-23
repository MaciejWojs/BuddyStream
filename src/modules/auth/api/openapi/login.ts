import { createRoute } from '@hono/zod-openapi';

import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';
import { domainUnauthorizedResponse, domainValidationResponse } from '@/shared/api/openapi/errors/domain.openapi';

import { loginBodySchema } from '../schemas/auth.requests.schema';
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
          schema: loginBodySchema
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
      },
      headers: {
        'Set-Cookie': {
          description: 'Authentication cookies: accessToken and refreshToken',
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
            tokens: {
              dataValue: {
                accessToken: '<jwt>; HttpOnly; Secure; SameSite=Lax; Path=/',
                refreshToken: '<token>; HttpOnly; Secure; SameSite=Lax; Path=/'
              },
              serializedValue:
                'accessToken=<jwt>; HttpOnly; Secure; SameSite=Lax; Path=/\nrefreshToken=<token>; HttpOnly; Secure; SameSite=Lax; Path=/'
            }
          }
        }
      }
    },
    ...domainUnauthorizedResponse,
    ...domainValidationResponse,
    ...internalServerErrorResponse
  }
});
