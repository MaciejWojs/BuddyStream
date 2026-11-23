export const DomainErrorKind = {
  Conflict: 'conflict',
  Invariant: 'invariant',
  NotFound: 'not_found',
  Unauthorized: 'unauthorized',
  Validation: 'validation'
} as const;

export type DomainErrorKind = (typeof DomainErrorKind)[keyof typeof DomainErrorKind];

export abstract class DomainError extends Error {
  abstract readonly code: string;

  abstract readonly kind: DomainErrorKind;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
