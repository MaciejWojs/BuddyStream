import { DomainError, DomainErrorKind } from '@/shared/domain/errors/DomainError';

export type ClientDomainErrorBody = {
  code: string;
  message: string;
};

export type ClientDomainError = {
  body: ClientDomainErrorBody;
  status: 401 | 404 | 409 | 422;
};

const STATUS_BY_KIND = {
  [DomainErrorKind.Conflict]: 409,
  [DomainErrorKind.NotFound]: 404,
  [DomainErrorKind.Unauthorized]: 401,
  [DomainErrorKind.Validation]: 422
} as const;

export function asClientDomainError(error: unknown): ClientDomainError | null {
  if (!(error instanceof DomainError) || error.kind === DomainErrorKind.Invariant) {
    return null;
  }

  switch (error.kind) {
    case DomainErrorKind.Conflict:
    case DomainErrorKind.NotFound:
    case DomainErrorKind.Unauthorized:
    case DomainErrorKind.Validation:
      return {
        body: { code: error.code, message: error.message },
        status: STATUS_BY_KIND[error.kind]
      };
    default:
      return null;
  }
}
