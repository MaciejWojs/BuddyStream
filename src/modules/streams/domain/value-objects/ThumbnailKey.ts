import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { StreamError } from '../errors/StreamErrors';

const MAX_ASSETS_KEY_LENGTH = APP_CONFIG.database.limits.shared.max_assets_key_length;

const thumbnailKeySchema = z.compile(z.string().min(1).max(MAX_ASSETS_KEY_LENGTH).regex(/^\S+$/));

export class ThumbnailKey {
  private readonly key: string;

  constructor(key: string) {
    const normalizedKey = key.trim();
    if (!thumbnailKeySchema.validate(normalizedKey)) {
      throw new StreamError('stream.thumbnail_key.invalid');
    }
    this.key = normalizedKey;
  }

  get value(): string {
    return this.key;
  }
}
