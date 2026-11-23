import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { AuthorizationError } from '../../errors/AuthorizationErrors';

const MAX_CODE_LENGTH = APP_CONFIG.database.limits.permissions.max_code_length;
const MIN_CODE_LENGTH = APP_CONFIG.domain.limits.permissions.min_code_length;
const PERMISSION_CODE_SCHEMA = z.compile(
  z
    .string()
    .regex(/^[a-zA-Z_-]+$/)
    .min(MIN_CODE_LENGTH)
    .max(MAX_CODE_LENGTH)
);

export class PermissionCode {
  private readonly code: string;

  constructor(code: string) {
    const newCode = code.trim();
    const letters = newCode.replaceAll(/[_-]/g, '');
    if (letters.length === 0) {
      throw new AuthorizationError('permission.code.invalid');
    }
    if (!PERMISSION_CODE_SCHEMA.validate(newCode)) {
      throw new AuthorizationError('permission.code.invalid');
    }
    this.code = newCode.toUpperCase();
  }

  public get value() {
    return this.code;
  }
}
