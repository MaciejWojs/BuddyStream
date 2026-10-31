import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { timestamps, uuidv7 } from '../../utilities';
import { channels } from './channels';

const dbLimits = APP_CONFIG.database.limits;
const MAX_PLACEHOLDER_LENGTH = dbLimits.shared.max_placeholder_length;
const MAX_ASSETS_KEY_LENGTH = dbLimits.shared.max_assets_key_length;

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
  thumbnail_key: varchar({ length: MAX_ASSETS_KEY_LENGTH }),
  thumbnail_placeholder: varchar({ length: MAX_PLACEHOLDER_LENGTH }),
  recording_status: streamRecordingStatus(),
  ...timestamps
});
