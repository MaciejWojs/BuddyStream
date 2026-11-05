import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { timestamps, uuidv7 } from '../utilities';

const permissionsLimits = APP_CONFIG.database.limits.permissions;
const MAX_PERMISSION_CODE_LENGTH = permissionsLimits.max_code_length;
const MAX_PERMISSION_DESCRIPTION_LENGTH = permissionsLimits.max_description_length;

export const permissions = pgTable('permissions', {
  id: uuidv7().primaryKey(),
  code: varchar({ length: MAX_PERMISSION_CODE_LENGTH }).notNull().unique(),
  description: varchar({ length: MAX_PERMISSION_DESCRIPTION_LENGTH }),
  ...timestamps
});
