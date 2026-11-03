import { pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

import { users } from '../../users';
import { uuidv7 } from '../../utilities';
import { streams } from './streams';

export const streamVodLikes = pgTable(
  'stream_vod_likes',
  {
    id: uuidv7().primaryKey(),
    stream_id: uuid()
      .notNull()
      .references(() => streams.id, { onDelete: 'cascade' }),
    user_id: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull()
  },
  (table) => [unique('stream_vod_likes_stream_user_unique').on(table.stream_id, table.user_id)]
);
