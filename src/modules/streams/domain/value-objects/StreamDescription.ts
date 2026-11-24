import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { StreamError } from '../errors/StreamErrors';

const MAX_DESCRIPTION_LENGTH = APP_CONFIG.database.limits.streams.max_description_length;

const descriptionSchema = z.compile(z.string().min(1).max(MAX_DESCRIPTION_LENGTH));

export class StreamDescription {
  private readonly description: string;

  constructor(description: string) {
    const normalizedDescription = description.trim();
    if (!descriptionSchema.validate(normalizedDescription)) {
      throw new StreamError('stream.description.invalid');
    }
    this.description = normalizedDescription;
  }

  get value(): string {
    return this.description;
  }
}
