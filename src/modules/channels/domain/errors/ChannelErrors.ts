import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const channelErrorCatalog = {
  'channel.ingest_endpoint.invalid': {
    kind: 'validation',
    message: 'Invalid ingest endpoint'
  },
  'channel.ivs_arn.invalid': {
    kind: 'validation',
    message: 'Invalid IVS channel ARN'
  },
  'channel.ivs_binding.incomplete': {
    kind: 'invariant',
    message: 'IVS binding must include the ARN, ingest endpoint, playback URL, and encrypted stream key'
  },
  'channel.playback_url.invalid': {
    kind: 'validation',
    message: 'Invalid playback URL'
  },
  'channel.stream_key.invalid': {
    kind: 'validation',
    message: 'Invalid encrypted stream key'
  },
  'channel.stream_key.plaintext': {
    kind: 'validation',
    message: 'Stream key must already be encrypted'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type ChannelErrorCode = keyof typeof channelErrorCatalog;

type ChannelErrorDefinition<C extends ChannelErrorCode> = (typeof channelErrorCatalog)[C];

export class ChannelError<C extends ChannelErrorCode = ChannelErrorCode> extends DomainError<
  C,
  ChannelErrorDefinition<C>['kind'],
  ChannelErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = channelErrorCatalog[code] as ChannelErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
