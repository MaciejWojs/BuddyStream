import { DomainError, DomainErrorKind } from '@/shared/domain/errors/DomainError';

export class InvalidEmailError extends DomainError {
  readonly code = 'user.email.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid email');
  }
}

export class InvalidUsernameError extends DomainError {
  readonly code = 'user.username.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid username');
  }
}

export class UsernameWhitespaceError extends DomainError {
  readonly code = 'user.username.whitespace';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Username cannot contain whitespace');
  }
}

export class InvalidPasswordError extends DomainError {
  readonly code = 'user.password.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid password');
  }
}

export class PasswordTooWeakError extends DomainError {
  readonly code = 'user.password.too_weak';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Password is not strong enough');
  }
}

export class PasswordComplexityError extends DomainError {
  readonly code = 'user.password.complexity';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
    );
  }
}

export class PasswordHashTooLongError extends DomainError {
  readonly code = 'user.password.hash_too_long';

  readonly kind = DomainErrorKind.Invariant;

  constructor() {
    super('Password hash exceeds the configured column length');
  }
}

export class UserAlreadyExistsError extends DomainError {
  readonly code = 'user.already_exists';

  readonly kind = DomainErrorKind.Conflict;

  constructor() {
    super('User already exists');
  }
}

export class UserNotFoundError extends DomainError {
  readonly code = 'user.not_found';

  readonly kind = DomainErrorKind.NotFound;

  constructor() {
    super('User not found');
  }
}
