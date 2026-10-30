import { pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from '../../utilities';
import { permissions } from '../permissions';
import { streamerRoles } from '../streamer_roles';

export const streamerRolePermissions = pgTable(
  'streamer_role_permissions',
  {
    id: uuidv7().primaryKey(),
    streamer_role_id: uuid()
      .notNull()
      .references(() => streamerRoles.id),
    permission_id: uuid()
      .notNull()
      .references(() => permissions.id),
    ...timestamps
  },

  (table) => [unique('streamer_role_permissions_unique').on(table.streamer_role_id, table.permission_id)]
);
