import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const chatErrorCatalog = {
  'chat.message.body.invalid': {
    kind: 'validation',
    message: 'Invalid chat message body'
  },
  'chat.message.deleted': {
    kind: 'invariant',
    message: 'Deleted chat message cannot be edited'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type ChatErrorCode = keyof typeof chatErrorCatalog;

type ChatErrorDefinition<C extends ChatErrorCode> = (typeof chatErrorCatalog)[C];

export class ChatError<C extends ChatErrorCode = ChatErrorCode> extends DomainError<
  C,
  ChatErrorDefinition<C>['kind'],
  ChatErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = chatErrorCatalog[code] as ChatErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
