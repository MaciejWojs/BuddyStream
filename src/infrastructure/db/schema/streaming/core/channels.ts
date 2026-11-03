import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';

export const channels = pgTable('channels', {
  id: uuidv7().primaryKey(),
  owner_id: uuid()
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'restrict' }),
  ivs_arn: varchar({ length: 255 }).unique(),
  ingest_endpoint: varchar({ length: 255 }),
  playback_url: varchar({ length: 255 }),
  stream_key_encrypted: varchar({ length: 255 }),
  ...timestamps
});
