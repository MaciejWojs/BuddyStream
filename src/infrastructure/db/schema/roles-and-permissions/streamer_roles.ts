import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { timestamps, uuidv7 } from '../utilities';

const MAX_ROLE_NAME_LENGTH = APP_CONFIG.database.limits.roles.max_name_length;
const MAX_ROLE_CODE_LENGTH = APP_CONFIG.database.limits.roles.max_code_length;
const MAX_ROLE_DESCRIPTION_LENGTH = APP_CONFIG.database.limits.roles.max_description_length;

export const streamerRoles = pgTable('streamer_roles', {
  id: uuidv7().primaryKey(),
  name: varchar({ length: MAX_ROLE_NAME_LENGTH }).notNull().unique(),
  code: varchar({ length: MAX_ROLE_CODE_LENGTH }).notNull().unique(),
  description: varchar({ length: MAX_ROLE_DESCRIPTION_LENGTH }),
  ...timestamps
});
