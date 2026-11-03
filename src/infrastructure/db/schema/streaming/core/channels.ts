import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';

export const channels = pgTable('channels', {
  id: uuidv7().primaryKey(),
  owner_id: uuid()
    .notNull()
    .references(() => users.id),
  ivs_arn: varchar({ length: 255 }),
  ingest_endpoint: varchar({ length: 255 }),
  playback_url: varchar({ length: 255 }),
  stream_key_encrypted: varchar({ length: 255 }),
  ivs_stream_id: varchar({ length: 255 }), // maybe uuid would be better
  recording_key: varchar({ length: 255 }),
  mediaconvert_job_id: varchar({ length: 255 }),
  started_at: timestamp(),
  ended_at: timestamp(),
  ...timestamps
});
