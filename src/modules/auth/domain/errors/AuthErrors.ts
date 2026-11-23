import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const authErrorCatalog = {
  'auth.invalid_credentials': {
    kind: 'unauthorized',
    message: 'Invalid credentials'
  },
  'auth.refresh_token.created_in_future': {
    kind: 'invariant',
    message: 'Refresh token created in the future'
  },
  'auth.refresh_token.expired': {
    kind: 'invariant',
    message: 'Refresh token expired'
  },
  'auth.refresh_token.hash_invalid': {
    kind: 'invariant',
    message: 'Invalid refresh token hash'
  },
  'auth.refresh_token.invalid': {
    kind: 'unauthorized',
    message: 'Invalid refresh token'
  },
  'auth.refresh_token.secret_invalid': {
    kind: 'validation',
    message: 'Invalid refresh token secret'
  },
  'auth.refresh_token.updated_in_past': {
    kind: 'invariant',
    message: 'Refresh token updated in the past'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type AuthErrorCode = keyof typeof authErrorCatalog;

type AuthErrorDefinition<C extends AuthErrorCode> = (typeof authErrorCatalog)[C];

export class AuthError<C extends AuthErrorCode = AuthErrorCode> extends DomainError<
  C,
  AuthErrorDefinition<C>['kind'],
  AuthErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = authErrorCatalog[code] as AuthErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
