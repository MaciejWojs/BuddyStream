import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from '../../utilities';
import { channels } from './channels';

export const streamRecordingStatus = pgEnum('stream_recording_status', [
  'pending',
  'processing',
  'completed',
  'failed'
]);

export const streams = pgTable('streams', {
  id: uuidv7().primaryKey(),
  channel_id: uuid().references(() => channels.id),
  title: varchar({ length: 255 }).default('Untitled Stream').notNull(),
  description: varchar({ length: 255 }).default('Default stream description').notNull(),
  thumbnail_key: varchar({ length: 255 }),
  thumbnail_placeholder: varchar({ length: 255 }),
  recording_status: streamRecordingStatus(),
  ...timestamps
});
