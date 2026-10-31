import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { APP_CONFIG } from '@/config/APP_CONFIG';

import { timestamps, uuidv7 } from './utilities';

const MAX_USERNAME_LENGTH = APP_CONFIG.database.limits.users.max_username_length;
const MAX_EMAIL_LENGTH = APP_CONFIG.database.limits.users.max_email_length;
const MAX_HASH_LENGTH = APP_CONFIG.database.limits.shared.max_hash_length;
const MAX_PLACEHOLDER_LENGTH = APP_CONFIG.database.limits.shared.max_placeholder_length;
const MAX_ASSETS_KEY_LENGTH = APP_CONFIG.database.limits.shared.max_assets_key_length;

export const users = pgTable('users', {
  id: uuidv7().primaryKey(),
  username: varchar({ length: MAX_USERNAME_LENGTH }).notNull().unique(),
  email: varchar({ length: MAX_EMAIL_LENGTH }).notNull().unique(),
  password_hash: varchar({ length: MAX_HASH_LENGTH }).notNull(),
  avatar_key: varchar({ length: MAX_ASSETS_KEY_LENGTH }),
  avatar_placeholder: varchar({ length: MAX_PLACEHOLDER_LENGTH }),
  ...timestamps
});
