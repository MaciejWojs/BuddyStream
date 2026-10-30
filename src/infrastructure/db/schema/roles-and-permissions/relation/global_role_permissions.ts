import { pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { timestamps, uuidv7 } from '../../utilities';
import { globalRoles } from '../global_roles';
import { permissions } from '../permissions';

export const globalRolePermissions = pgTable(
  'global_role_permissions',
  {
    id: uuidv7().primaryKey(),
    role_id: uuid()
      .notNull()
      .references(() => globalRoles.id),
    permission_id: uuid()
      .notNull()
      .references(() => permissions.id),
    ...timestamps
  },
  (table) => [unique('global_role_permissions_unique').on(table.role_id, table.permission_id)]
);
