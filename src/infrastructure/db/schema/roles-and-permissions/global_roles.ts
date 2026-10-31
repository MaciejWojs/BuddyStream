import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { timestamps, uuidv7 } from '../utilities';

const dbLimits = APP_CONFIG.database.limits;
const rolesLimits = dbLimits.roles;
const MAX_ROLE_NAME_LENGTH = rolesLimits.max_name_length;
const MAX_ROLE_CODE_LENGTH = rolesLimits.max_code_length;
const MAX_ROLE_DESCRIPTION_LENGTH = rolesLimits.max_description_length;

export const globalRoles = pgTable('global_roles', {
  id: uuidv7().primaryKey(),
  name: varchar({ length: MAX_ROLE_NAME_LENGTH }).notNull().unique(),
  code: varchar({ length: MAX_ROLE_CODE_LENGTH }).notNull().unique(),
  description: varchar({ length: MAX_ROLE_DESCRIPTION_LENGTH }),
  ...timestamps
});
