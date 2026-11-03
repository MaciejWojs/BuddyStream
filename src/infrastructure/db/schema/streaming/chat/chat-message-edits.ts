import { index, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';
import { chat } from './chat';

const MAX_MESSAGE_BODY_LENGTH = APP_CONFIG.database.limits.max_message_body_length;

export const chatMessageEdits = pgTable(
  'chat_message_edits',
  {
    id: uuidv7().primaryKey(),
    message_id: uuid()
      .notNull()
      .references(() => chat.id, { onDelete: 'cascade' }),
    previous_body: varchar({ length: MAX_MESSAGE_BODY_LENGTH }).notNull(),
    edited_by: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
    ...timestamps
  },
  (table) => [index('chat_message_edits_message_created_at_idx').on(table.message_id, table.created_at)]
);
