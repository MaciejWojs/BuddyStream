import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MIN_USERNAME_LENGTH = APP_CONFIG.domain.limits.users.min_username_length;
const MAX_USERNAME_LENGTH = APP_CONFIG.database.limits.users.max_username_length;
const MAX_EMAIL_LENGTH = APP_CONFIG.database.limits.users.max_email_length;
const MIN_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.min_password_length;
const MAX_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.max_password_length;
const FORCE_UUID_V7 = APP_CONFIG.domain.force_uuid_v7;

export const baseTypeRegistry = z.registry<{ id: string }>();

export const usernameSchema = z
  .compile(z.string().min(MIN_USERNAME_LENGTH).max(MAX_USERNAME_LENGTH))
  .register(baseTypeRegistry, { id: 'Username' });

export const emailSchema = z.compile(z.email().max(MAX_EMAIL_LENGTH)).register(baseTypeRegistry, { id: 'Email' });

export const passwordSchema = z
  .compile(z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH))
  .register(baseTypeRegistry, { id: 'Password' });

export const uuidSchema = z
  .compile(FORCE_UUID_V7 ? z.uuid({ version: 'v7' }) : z.uuid())
  .register(baseTypeRegistry, { id: 'Uuid' });
