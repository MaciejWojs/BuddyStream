import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MAX_ROLE_NAME_LENGTH = APP_CONFIG.database.limits.roles.max_name_length;
const MIN_ROLE_NAME_LENGTH = APP_CONFIG.domain.limits.roles.min_name_length;
const ROLE_NAME_SCHEMA = z.compile(
  z
    .string()
    .regex(/^[a-zA-Z_-]+$/)
    .min(MIN_ROLE_NAME_LENGTH)
    .max(MAX_ROLE_NAME_LENGTH)
);

export class RoleName {
  private readonly name: string;

  constructor(name: string) {
    const newName = name.trim();
    const letters = newName.replaceAll(/[_-]/g, '');
    if (letters.length === 0) {
      throw new Error('Invalid role name');
    }
    if (!ROLE_NAME_SCHEMA.validate(newName)) {
      throw new Error('Invalid role name');
    }
    this.name = newName;
  }

  public get value(): string {
    return this.name;
  }
}
