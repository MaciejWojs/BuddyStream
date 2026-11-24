import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { StreamError } from '../errors/StreamErrors';

const MAX_EXTERNAL_REF_LENGTH = APP_CONFIG.database.limits.streams.max_external_ref_length;

const mediaConvertJobIdSchema = z.compile(z.string().min(1).max(MAX_EXTERNAL_REF_LENGTH).regex(/^\S+$/));

export class MediaConvertJobId {
  private readonly jobId: string;

  constructor(jobId: string) {
    const normalizedJobId = jobId.trim();
    if (!mediaConvertJobIdSchema.validate(normalizedJobId)) {
      throw new StreamError('stream.mediaconvert_job_id.invalid');
    }
    this.jobId = normalizedJobId;
  }

  get value(): string {
    return this.jobId;
  }
}
