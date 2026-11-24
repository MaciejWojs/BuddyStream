import { z } from 'zod';

import { StreamError } from '../errors/StreamErrors';

const POSTGRES_INTEGER_MAX = 2_147_483_647;

const durationSchema = z.compile(z.int().nonnegative().max(POSTGRES_INTEGER_MAX));

export class DurationMs {
  private readonly duration: number;

  constructor(duration: number) {
    if (!durationSchema.validate(duration)) {
      throw new StreamError('stream.duration.invalid');
    }
    this.duration = duration;
  }

  get value(): number {
    return this.duration;
  }
}
