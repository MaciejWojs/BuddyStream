import { DomainError, DomainErrorKind } from '@/shared/domain/errors/DomainError';

export class GlobalRoleAlreadyExistsError extends DomainError {
  readonly code = 'role.global.already_exists';

  readonly kind = DomainErrorKind.Conflict;

  constructor() {
    super('Global role already exists');
  }
}

export class StreamerRoleAlreadyExistsError extends DomainError {
  readonly code = 'role.streamer.already_exists';

  readonly kind = DomainErrorKind.Conflict;

  constructor() {
    super('Streamer role already exists');
  }
}

export class InvalidRoleNameError extends DomainError {
  readonly code = 'role.name.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid role name');
  }
}

export class InvalidRoleCodeError extends DomainError {
  readonly code = 'role.code.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid role code');
  }
}

export class InvalidRoleDescriptionError extends DomainError {
  readonly code = 'role.description.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid role description');
  }
}

export class InvalidPermissionCodeError extends DomainError {
  readonly code = 'permission.code.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid permission code');
  }
}

export class InvalidPermissionDescriptionError extends DomainError {
  readonly code = 'permission.description.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid permission description');
  }
}
