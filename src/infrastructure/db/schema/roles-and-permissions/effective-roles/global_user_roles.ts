import { pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { users } from '../../users';
import { timestamps, uuidv7 } from '../../utilities';
import { globalRoles } from '../global_roles';

export const globalUserRoles = pgTable(
  'global_user_roles',
  {
    id: uuidv7().primaryKey(),
    user_id: uuid()
      .notNull()
      .references(() => users.id),
    global_role_id: uuid()
      .notNull()
      .references(() => globalRoles.id),
    ...timestamps
  },
  (table) => [unique('global_user_roles_unique').on(table.user_id, table.global_role_id)]
);
