import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const authorizationErrorCatalog = {
  'permission.code.invalid': {
    kind: 'validation',
    message: 'Invalid permission code'
  },
  'permission.description.invalid': {
    kind: 'validation',
    message: 'Invalid permission description'
  },
  'role.code.invalid': {
    kind: 'validation',
    message: 'Invalid role code'
  },
  'role.description.invalid': {
    kind: 'validation',
    message: 'Invalid role description'
  },
  'role.global.already_exists': {
    kind: 'conflict',
    message: 'Global role already exists'
  },
  'role.name.invalid': {
    kind: 'validation',
    message: 'Invalid role name'
  },
  'role.streamer.already_exists': {
    kind: 'conflict',
    message: 'Streamer role already exists'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type AuthorizationErrorCode = keyof typeof authorizationErrorCatalog;

type AuthorizationErrorDefinition<C extends AuthorizationErrorCode> = (typeof authorizationErrorCatalog)[C];

export class AuthorizationError<C extends AuthorizationErrorCode = AuthorizationErrorCode> extends DomainError<
  C,
  AuthorizationErrorDefinition<C>['kind'],
  AuthorizationErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = authorizationErrorCatalog[code] as AuthorizationErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
