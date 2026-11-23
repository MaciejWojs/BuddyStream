import { DomainError, DomainErrorKind } from './DomainError';

export class InvalidUuidError extends DomainError {
  readonly code = 'id.invalid';

  readonly kind = DomainErrorKind.Validation;

  constructor() {
    super('Invalid UUID');
  }
}
