import { createRoute } from '@hono/zod-openapi';

import { unauthorizedResponse } from '@/shared/api/openapi/errors/401.openapi';
import { internalServerErrorResponse } from '@/shared/api/openapi/errors/500.openapi';
import { domainNotFoundResponse, domainValidationResponse } from '@/shared/api/openapi/errors/domain.openapi';

import { accessTokenCookieSchema } from '../schemas/auth.requests.schema';
import { mePayloadSchema } from '../schemas/auth.responses.schema';

export const meRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Auth'],
  summary: 'Get authenticated user info',
  security: [
    {
      AccessTokenCookie: []
    }
  ],
  request: {
    //! This enforces the use of the accessToken cookie if not present, the request will be rejected with a 422 validation error
    cookies: accessTokenCookieSchema
  },
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
    ...domainNotFoundResponse,
    ...domainValidationResponse,
    ...internalServerErrorResponse
  }
});
