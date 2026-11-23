import { DomainError, DomainErrorKind } from '@/shared/domain/errors/DomainError';

export class InvalidCredentialsError extends DomainError {
  readonly code = 'auth.invalid_credentials';

  readonly kind = DomainErrorKind.Unauthorized;

  constructor() {
    super('Invalid credentials');
  }
}

export class InvalidRefreshTokenError extends DomainError {
  readonly code = 'auth.refresh_token.invalid';

  readonly kind = DomainErrorKind.Unauthorized;

  constructor() {
    super('Invalid refresh token');
  }
}

export class RefreshTokenExpiredError extends DomainError {
  readonly code = 'auth.refresh_token.expired';

  readonly kind = DomainErrorKind.Invariant;

  constructor() {
    super('Refresh token expired');
  }
}

export class RefreshTokenCreatedInFutureError extends DomainError {
  readonly code = 'auth.refresh_token.created_in_future';

  readonly kind = DomainErrorKind.Invariant;

  constructor() {
    super('Refresh token created in the future');
  }
}

export class RefreshTokenUpdatedInPastError extends DomainError {
  readonly code = 'auth.refresh_token.updated_in_past';

  readonly kind = DomainErrorKind.Invariant;

  constructor() {
    super('Refresh token updated in the past');
  }
}

export class InvalidRefreshTokenSecretError extends DomainError {
  readonly code = 'auth.refresh_token.secret_invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid refresh token secret');
  }
}

export class InvalidRefreshTokenHashError extends DomainError {
  readonly code = 'auth.refresh_token.hash_invalid';

  readonly kind = DomainErrorKind.Invariant;

  constructor() {
    super('Invalid refresh token hash');
  }
}
