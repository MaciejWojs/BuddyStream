import { randomUUIDv7 } from 'bun';
import 'zod/compile';
import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

export class BaseUUID {
  FORCE_UUID_V7 = APP_CONFIG.domain.force_uuid_v7;

  constructor(private readonly id: string = randomUUIDv7()) {
    const res = this.FORCE_UUID_V7 ? z.uuid({ version: 'v7' }) : z.uuid();
    if (!res.validate(id)) {
      throw new Error('Invalid UUID');
    }
  }

  get value(): string {
    return this.id;
  }
}
