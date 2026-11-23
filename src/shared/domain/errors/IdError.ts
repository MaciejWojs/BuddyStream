import { DomainError, type DomainErrorSpec } from './DomainError';

const idErrorCatalog = {
  'id.invalid': {
    kind: 'validation',
    message: 'Invalid UUID'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type IdErrorCode = keyof typeof idErrorCatalog;

type IdErrorDefinition<C extends IdErrorCode> = (typeof idErrorCatalog)[C];

export class IdError<C extends IdErrorCode = IdErrorCode> extends DomainError<
  C,
  IdErrorDefinition<C>['kind'],
  IdErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = idErrorCatalog[code] as IdErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
