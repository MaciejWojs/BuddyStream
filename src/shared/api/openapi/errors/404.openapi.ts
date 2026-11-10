import { notFoundErrorResponseSchema } from '../../schemas/error.schema';

export const notFoundResponse = {
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: notFoundErrorResponseSchema
      }
    }
  }
};
