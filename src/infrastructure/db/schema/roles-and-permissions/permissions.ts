import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { timestamps, uuidv7 } from '../utilities';

const MAX_PERMISSION_CODE_LENGTH = APP_CONFIG.database.limits.permissions.max_code_length;
const MAX_PERMISSION_DESCRIPTION_LENGTH = APP_CONFIG.database.limits.permissions.max_description_length;

export const permissions = pgTable('permissions', {
  id: uuidv7().primaryKey(),
  code: varchar({ length: MAX_PERMISSION_CODE_LENGTH }).notNull().unique(),
  description: varchar({ length: MAX_PERMISSION_DESCRIPTION_LENGTH }),
  ...timestamps
});
