import { z } from 'zod';

import { StreamError } from '../errors/StreamErrors';

const recordingStatuses = ['processing', 'ready', 'failed'] as const;

const recordingStatusSchema = z.compile(z.enum(recordingStatuses));

export type RecordingStatusValue = (typeof recordingStatuses)[number];

export class RecordingStatus {
  private readonly status: RecordingStatusValue;

  constructor(status: string) {
    if (!recordingStatusSchema.validate(status)) {
      throw new StreamError('stream.recording_status.invalid');
    }
    this.status = status;
  }

  get value(): RecordingStatusValue {
    return this.status;
  }
}
