import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

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
      throw new Error('Invalid permission code');
    }
    if (!PERMISSION_CODE_SCHEMA.validate(newCode)) {
      throw new Error('Invalid permission code');
    }
    this.code = newCode.toUpperCase();
  }

  public get value() {
    return this.code;
  }
}
