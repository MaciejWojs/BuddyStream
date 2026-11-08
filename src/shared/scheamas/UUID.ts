import { z } from '@hono/zod-openapi';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const FORCE_UUID_V7 = APP_CONFIG.domain.force_uuid_v7;
export const uuidSchema = z.compile(FORCE_UUID_V7 ? z.uuid({ version: 'v7' }) : z.uuid()).openapi({
  description: 'UUID of the resource',
  example: '123e4567-e89b-12d3-a456-426614174000'
});
