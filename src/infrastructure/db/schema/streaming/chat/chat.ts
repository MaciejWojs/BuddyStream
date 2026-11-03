import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';
import { streams } from '../core/streams';

const MAX_MESSAGE_BODY_LENGTH = APP_CONFIG.database.limits.max_message_body_length;

export const chat = pgTable('chat', {
  id: uuidv7().primaryKey(),
  stream_id: uuid().references(() => streams.id, { onDelete: 'cascade' }),
  user_id: uuid().references(() => users.id, { onDelete: 'restrict' }),
  body: varchar({ length: MAX_MESSAGE_BODY_LENGTH }).notNull(),
  deleted_at: timestamp({ withTimezone: true }),
  ...timestamps
});
