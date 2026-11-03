import { sql } from 'drizzle-orm';
import { bigint, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { timestamps, uuidv7 } from '../../utilities';
import { channels } from './channels';

const MAX_ASSETS_KEY_LENGTH = APP_CONFIG.database.limits.shared.max_assets_key_length;

export const streamRecordingStatus = pgEnum('stream_recording_status', ['processing', 'ready', 'failed']);

export const streams = pgTable(
  'streams',
  {
    id: uuidv7().primaryKey(),
    channel_id: uuid()
      .notNull()
      .references(() => channels.id, { onDelete: 'restrict' }),
    title: varchar({ length: 255 }).default('Untitled Stream').notNull(),
    description: varchar({ length: 255 }).default('Default stream description').notNull(),
    status: text().notNull().default('ready'),
    thumbnail_key: varchar({ length: MAX_ASSETS_KEY_LENGTH }),
    thumbnail_placeholder: text(),
    likes_count: bigint({ mode: 'number' }),
    ivs_stream_id: varchar({ length: 255 }),
    recording_key: varchar({ length: 255 }),
    recording_status: streamRecordingStatus(),
    duration_ms: integer(),
    mediaconvert_job_id: varchar({ length: 255 }),
    started_at: timestamp({ withTimezone: true }),
    ended_at: timestamp({ withTimezone: true }),
    ...timestamps
  },
  (table) => [
    uniqueIndex('streams_one_active_per_channel_idx')
      .on(table.channel_id)
      .where(sql`${table.status} in ('ready', 'live')`)
  ]
);
