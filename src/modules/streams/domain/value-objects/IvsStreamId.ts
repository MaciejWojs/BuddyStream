import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { StreamError } from '../errors/StreamErrors';

const MAX_EXTERNAL_REF_LENGTH = APP_CONFIG.database.limits.streams.max_external_ref_length;

const ivsStreamIdSchema = z.compile(z.string().min(1).max(MAX_EXTERNAL_REF_LENGTH).regex(/^\S+$/));

export class IvsStreamId {
  private readonly id: string;

  constructor(id: string) {
    const normalizedId = id.trim();
    if (!ivsStreamIdSchema.validate(normalizedId)) {
      throw new StreamError('stream.ivs_stream_id.invalid');
    }
    this.id = normalizedId;
  }

  get value(): string {
    return this.id;
  }
}
