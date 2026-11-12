import { unauthorizedResponseSchema } from '../../schemas/error.schema';

export const unauthorizedResponse = {
  401: {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: unauthorizedResponseSchema
      }
    }
  }
};
