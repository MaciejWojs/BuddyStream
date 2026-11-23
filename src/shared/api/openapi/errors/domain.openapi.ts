import { domainErrorResponseSchema } from '../../schemas/error.schema';

export const domainUnauthorizedResponse = {
  401: {
    description: 'Domain error: the caller is not allowed to complete this action',
    content: {
      'application/json': {
        schema: domainErrorResponseSchema
      }
    }
  }
};

export const domainNotFoundResponse = {
  404: {
    description: 'Domain error: the requested resource does not exist',
    content: {
      'application/json': {
        schema: domainErrorResponseSchema
      }
    }
  }
};

export const domainConflictResponse = {
  409: {
    description: 'Domain error: the operation conflicts with the current state',
    content: {
      'application/json': {
        schema: domainErrorResponseSchema
      }
    }
  }
};

export const domainValidationResponse = {
  422: {
    description: 'Domain error: the value breaks a domain rule',
    content: {
      'application/json': {
        schema: domainErrorResponseSchema
      }
    }
  }
};
