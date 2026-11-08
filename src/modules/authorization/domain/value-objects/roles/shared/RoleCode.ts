import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MAX_CODE_LENGTH = APP_CONFIG.database.limits.roles.max_code_length;
const MIN_CODE_LENGTH = APP_CONFIG.domain.limits.roles.min_code_length;
const ROLE_CODE_SCHEMA = z
  .string()
  .regex(/^[a-zA-Z_-]+$/)
  .min(MIN_CODE_LENGTH)
  .max(MAX_CODE_LENGTH);

export class RoleCode {
  constructor(readonly code: string) {
    const newCode = code.trim();
    const letters = newCode.replaceAll(/[_-]/g, '');
    if (letters.length === 0) {
      throw new Error('Invalid role code');
    }
    if (!ROLE_CODE_SCHEMA.validate(newCode)) {
      throw new Error('Invalid role code');
    }
    this.code = newCode.toUpperCase();
  }

  public get value(): string {
    return this.code;
  }
}
