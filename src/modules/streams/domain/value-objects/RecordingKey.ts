import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { StreamError } from '../errors/StreamErrors';

const MAX_EXTERNAL_REF_LENGTH = APP_CONFIG.database.limits.streams.max_external_ref_length;

const recordingKeySchema = z.compile(z.string().min(1).max(MAX_EXTERNAL_REF_LENGTH).regex(/^\S+$/));

export class RecordingKey {
  private readonly key: string;

  constructor(key: string) {
    const normalizedKey = key.trim();
    if (!recordingKeySchema.validate(normalizedKey)) {
      throw new StreamError('stream.recording_key.invalid');
    }
    this.key = normalizedKey;
  }

  get value(): string {
    return this.key;
  }
}
