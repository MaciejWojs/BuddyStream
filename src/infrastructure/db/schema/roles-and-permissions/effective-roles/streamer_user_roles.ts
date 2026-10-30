import { sql } from 'drizzle-orm';
import { check, pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';
import { streamerRoles } from '../streamer_roles';

export const streamerUserRoles = pgTable(
  'streamer_user_roles',
  {
    id: uuidv7().primaryKey(),
    streamer_id: uuid()
      .notNull()
      .references(() => users.id),
    user_id: uuid()
      .notNull()
      .references(() => users.id),
    streamer_role_id: uuid()
      .notNull()
      .references(() => streamerRoles.id),
    ...timestamps
  },
  (table) => [
    unique('streamer_user_roles_unique').on(table.streamer_id, table.user_id, table.streamer_role_id),
    check('streamer_is_not_user', sql`${table.streamer_id} != ${table.user_id}`)
  ]
);
