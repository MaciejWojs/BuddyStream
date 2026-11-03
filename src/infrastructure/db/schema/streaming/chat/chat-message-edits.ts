import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';
import { chat } from './chat';

const MAX_MESSAGE_BODY_LENGTH = APP_CONFIG.database.limits.max_message_body_length;

export const chatMessageEdits = pgTable('chat_message_edits', {
  id: uuidv7().primaryKey(),
  message_id: uuid()
    .notNull()
    .references(() => chat.id, { onDelete: 'cascade' }),
  previous_body: varchar({ length: MAX_MESSAGE_BODY_LENGTH }).notNull(),
  user_id: uuid()
    .notNull()
    .references(() => users.id),
  ...timestamps
});
