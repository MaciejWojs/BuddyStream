import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const userErrorCatalog = {
  'user.already_exists': {
    kind: 'conflict',
    message: 'User already exists'
  },
  'user.email.invalid': {
    kind: 'validation',
    message: 'Invalid email'
  },
  'user.not_found': {
    kind: 'not_found',
    message: 'User not found'
  },
  'user.password.complexity': {
    kind: 'validation',
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
  },
  'user.password.hash_too_long': {
    kind: 'invariant',
    message: 'Password hash exceeds the configured column length'
  },
  'user.password.invalid': {
    kind: 'validation',
    message: 'Invalid password'
  },
  'user.password.too_weak': {
    kind: 'validation',
    message: 'Password is not strong enough'
  },
  'user.username.invalid': {
    kind: 'validation',
    message: 'Invalid username'
  },
  'user.username.whitespace': {
    kind: 'validation',
    message: 'Username cannot contain whitespace'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type UserErrorCode = keyof typeof userErrorCatalog;

type UserErrorDefinition<C extends UserErrorCode> = (typeof userErrorCatalog)[C];

export class UserError<C extends UserErrorCode = UserErrorCode> extends DomainError<
  C,
  UserErrorDefinition<C>['kind'],
  UserErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = userErrorCatalog[code] as UserErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
