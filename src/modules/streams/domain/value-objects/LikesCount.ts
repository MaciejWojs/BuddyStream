import { z } from 'zod';

import { StreamError } from '../errors/StreamErrors';

const likesCountSchema = z.compile(z.int().nonnegative().max(Number.MAX_SAFE_INTEGER));

export class LikesCount {
  private readonly count: number;

  constructor(count: number) {
    if (!likesCountSchema.validate(count)) {
      throw new StreamError('stream.likes_count.invalid');
    }
    this.count = count;
  }

  get value(): number {
    return this.count;
  }
}
