import { z } from 'zod';

import { StreamError } from '../errors/StreamErrors';

const ACTIVE_STREAM_STATUSES = new Set(['ready', 'live']);

const statusSchema = z.compile(z.string().min(1).regex(/^\S+$/));

export class StreamStatus {
  private readonly status: string;

  constructor(status: string) {
    const normalizedStatus = status.trim().toLowerCase();
    if (!statusSchema.validate(normalizedStatus)) {
      throw new StreamError('stream.status.invalid');
    }
    this.status = normalizedStatus;
  }

  get isActive(): boolean {
    return ACTIVE_STREAM_STATUSES.has(this.status);
  }

  get value(): string {
    return this.status;
  }
}
