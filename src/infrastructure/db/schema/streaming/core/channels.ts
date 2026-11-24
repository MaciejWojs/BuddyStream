import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';

const MAX_IVS_BINDING_LENGTH = APP_CONFIG.database.limits.channels.max_ivs_binding_length;

export const channels = pgTable('channels', {
  id: uuidv7().primaryKey(),
  owner_id: uuid()
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'restrict' }),
  ivs_arn: varchar({ length: MAX_IVS_BINDING_LENGTH }).unique(),
  ingest_endpoint: varchar({ length: MAX_IVS_BINDING_LENGTH }),
  playback_url: varchar({ length: MAX_IVS_BINDING_LENGTH }),
  stream_key_encrypted: varchar({ length: MAX_IVS_BINDING_LENGTH }),
  ...timestamps
});
