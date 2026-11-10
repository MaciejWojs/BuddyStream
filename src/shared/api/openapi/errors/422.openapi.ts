import { validationErrorResponseSchema } from '../../schemas/error.schema';

export const unprocessableEntityResponse = {
  422: {
    description: 'Validation error',
    content: {
      'application/json': {
        schema: validationErrorResponseSchema
      }
    }
  }
};
