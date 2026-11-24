import { DomainError, type DomainErrorSpec } from '@/shared/domain/errors/DomainError';

const streamErrorCatalog = {
  'stream.description.invalid': {
    kind: 'validation',
    message: 'Invalid stream description'
  },
  'stream.duration.invalid': {
    kind: 'validation',
    message: 'Invalid recording duration'
  },
  'stream.ivs_stream_id.invalid': {
    kind: 'validation',
    message: 'Invalid IVS stream id'
  },
  'stream.likes_count.invalid': {
    kind: 'validation',
    message: 'Invalid likes count'
  },
  'stream.mediaconvert_job_id.invalid': {
    kind: 'validation',
    message: 'Invalid MediaConvert job id'
  },
  'stream.period.ended_before_start': {
    kind: 'validation',
    message: 'Stream cannot end before it starts'
  },
  'stream.period.ended_without_start': {
    kind: 'invariant',
    message: 'Stream cannot have an end time without a start time'
  },
  'stream.period.invalid': {
    kind: 'validation',
    message: 'Invalid stream time'
  },
  'stream.recording_key.invalid': {
    kind: 'validation',
    message: 'Invalid recording key'
  },
  'stream.recording_status.invalid': {
    kind: 'validation',
    message: 'Invalid recording status'
  },
  'stream.status.invalid': {
    kind: 'validation',
    message: 'Invalid stream status'
  },
  'stream.thumbnail_key.invalid': {
    kind: 'validation',
    message: 'Invalid thumbnail key'
  },
  'stream.title.invalid': {
    kind: 'validation',
    message: 'Invalid stream title'
  }
} as const satisfies Record<string, DomainErrorSpec>;

type StreamErrorCode = keyof typeof streamErrorCatalog;

type StreamErrorDefinition<C extends StreamErrorCode> = (typeof streamErrorCatalog)[C];

export class StreamError<C extends StreamErrorCode = StreamErrorCode> extends DomainError<
  C,
  StreamErrorDefinition<C>['kind'],
  StreamErrorDefinition<C>['message']
> {
  constructor(code: C) {
    const definition = streamErrorCatalog[code] as StreamErrorDefinition<C>;
    super(code, definition.kind, definition.message);
  }
}
