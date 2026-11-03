import { jsonb, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';
import { chat } from './chat';

export const chatMessageEvents = pgTable('chat_message_events', {
  id: uuidv7().primaryKey(),
  message_id: uuid().references(() => chat.id, { onDelete: 'cascade' }),
  actor_id: uuid().references(() => users.id, { onDelete: 'restrict' }),
  event_type: varchar({ length: 255 }).notNull(),
  payload: jsonb().notNull(),
  ...timestamps
});
