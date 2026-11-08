import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MAX_PERMISSION_DESCRIPTION_LENGTH = APP_CONFIG.database.limits.permissions.max_description_length;
const PERMISSION_DESCRIPTION_SCHEMA = z.compile(z.string().max(MAX_PERMISSION_DESCRIPTION_LENGTH).optional());

export class PermissionDescription {
  private readonly description: string | null;

  constructor(description: string | null = null) {
    const newDescription = description?.trim() ?? null;

    if (!newDescription) {
      this.description = null;
      return;
    }

    if (!PERMISSION_DESCRIPTION_SCHEMA.validate(newDescription)) {
      throw new Error('Invalid permission description');
    }

    this.description = newDescription;
  }

  public get value() {
    return this.description;
  }
}
