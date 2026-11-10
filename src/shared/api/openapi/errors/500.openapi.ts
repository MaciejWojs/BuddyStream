import { internalServerErrorResponseSchema } from '../../schemas/error.schema';

export const internalServerErrorResponse = {
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: internalServerErrorResponseSchema
      }
    }
  }
};
