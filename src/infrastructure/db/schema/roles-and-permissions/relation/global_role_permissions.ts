import { pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from '../../utilities';
import { globalRoles } from '../global_roles';
import { permissions } from '../permissions';

export const globalRolePermissions = pgTable(
  'global_role_permissions',
  {
    id: uuidv7().primaryKey(),
    global_role_id: uuid()
      .notNull()
      .references(() => globalRoles.id, { onDelete: 'cascade' }),
    permission_id: uuid()
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
    ...timestamps
  },
  (table) => [unique('global_role_permissions_unique').on(table.global_role_id, table.permission_id)]
);
