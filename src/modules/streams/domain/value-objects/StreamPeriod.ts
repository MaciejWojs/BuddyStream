import { StreamError } from '../errors/StreamErrors';

export class StreamPeriod {
  private constructor(
    readonly startedAt: Date | null,
    readonly endedAt: Date | null
  ) {}

  static create(startedAt: Date | null, endedAt: Date | null): StreamPeriod {
    if (
      (startedAt !== null && Number.isNaN(startedAt.getTime())) ||
      (endedAt !== null && Number.isNaN(endedAt.getTime()))
    ) {
      throw new StreamError('stream.period.invalid');
    }
    if (endedAt !== null && startedAt === null) {
      throw new StreamError('stream.period.ended_without_start');
    }
    if (startedAt !== null && endedAt !== null && endedAt.getTime() < startedAt.getTime()) {
      throw new StreamError('stream.period.ended_before_start');
    }
    return new StreamPeriod(startedAt, endedAt);
  }
}
