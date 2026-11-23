import { DomainError, DomainErrorKind } from '@/shared/domain/errors/DomainError';

export type ClientDomainErrorBody = {
  code: string;
  message: string;
};

export type ClientDomainError = {
  body: ClientDomainErrorBody;
  status: 401 | 404 | 409 | 422;
};

export function asClientDomainError(error: unknown): ClientDomainError | null {
  if (!(error instanceof DomainError)) {
    return null;
  }

  const body = { code: error.code, message: error.message };

  switch (error.kind) {
    case DomainErrorKind.Conflict:
      return { body, status: 409 };
    case DomainErrorKind.NotFound:
      return { body, status: 404 };
    case DomainErrorKind.Unauthorized:
      return { body, status: 401 };
    case DomainErrorKind.Validation:
      return { body, status: 422 };
    case DomainErrorKind.Invariant:
      return null;
    default:
      return null;
  }
}
