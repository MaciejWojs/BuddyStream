import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const followErrorCatalog = {
  'follow.self': {
    kind: 'invariant',
    message: 'User cannot follow themselves'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type FollowErrorCode = keyof typeof followErrorCatalog;

type FollowErrorDefinition<C extends FollowErrorCode> = (typeof followErrorCatalog)[C];

export class FollowError<C extends FollowErrorCode = FollowErrorCode> extends DomainError<
  C,
  FollowErrorDefinition<C>['kind'],
  FollowErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = followErrorCatalog[code] as FollowErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
