export const DomainErrorKind = {
  Conflict: 'conflict',
  Invariant: 'invariant',
  NotFound: 'not_found',
  Unauthorized: 'unauthorized',
  Validation: 'validation'
} as const;

export type DomainErrorKind = (typeof DomainErrorKind)[keyof typeof DomainErrorKind];

export type DomainErrorSpec = {
  readonly kind: DomainErrorKind;
  readonly message: string;
};

export class DomainError<
  C extends string = string,
  K extends DomainErrorKind = DomainErrorKind,
  M extends string = string
> extends Error {
  readonly code: C;

  readonly kind: K;

  override readonly message: M;

  protected constructor(code: C, kind: K, message: M) {
    super(message);
    this.name = new.target.name;
    this.code = code;
    this.kind = kind;
    this.message = message;
  }
}
