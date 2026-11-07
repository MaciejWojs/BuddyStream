import { createSelectSchema } from 'drizzle-orm/zod';
import { z } from 'zod';

import { streamRecordingStatus } from '@/infrastructure/db/schema/streaming/core/streams';

export const streamRecordingStatusSchema = createSelectSchema(streamRecordingStatus);
export type StreamRecordingStatus = z.infer<typeof streamRecordingStatusSchema>;
