import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { StreamError } from '../errors/StreamErrors';

const MAX_TITLE_LENGTH = APP_CONFIG.database.limits.streams.max_title_length;

const titleSchema = z.compile(z.string().min(1).max(MAX_TITLE_LENGTH));

export class StreamTitle {
  private readonly title: string;

  constructor(title: string) {
    const normalizedTitle = title.trim();
    if (!titleSchema.validate(normalizedTitle)) {
      throw new StreamError('stream.title.invalid');
    }
    this.title = normalizedTitle;
  }

  get value(): string {
    return this.title;
  }
}
