import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MAX_ROLE_DESCRIPTION_LENGTH = APP_CONFIG.database.limits.roles.max_description_length;
const ROLE_DESCRIPTION_SCHEMA = z.string().max(MAX_ROLE_DESCRIPTION_LENGTH).optional();

export class RoleDescription {
  private readonly description: string | null;

  constructor(description: string | null = null) {
    const newDescription = description?.trim() ?? null;

    if (!newDescription) {
      this.description = null;
      return;
    }

    if (!ROLE_DESCRIPTION_SCHEMA.validate(newDescription)) {
      throw new Error('Invalid role description');
    }

    this.description = newDescription;
  }

  public get value() {
    return this.description;
  }
}
