import { randomUUIDv7 } from 'bun';
import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const FORCE_UUID_V7 = APP_CONFIG.domain.force_uuid_v7;
const uuidSchema = z.compile(FORCE_UUID_V7 ? z.uuid({ version: 'v7' }) : z.uuid());

export class BaseUUID {
  constructor(private readonly id: string = randomUUIDv7()) {
    if (!uuidSchema.validate(id)) {
      throw new Error('Invalid UUID');
    }
  }

  get value(): string {
    return this.id;
  }
}
