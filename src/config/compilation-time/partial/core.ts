import 'zod/compile';
import { z } from 'zod';

export const coreSchema = z.strictObject({
  appName: z.string().min(3).max(100),
  appVersion: z.string().min(3).max(100).startsWith('v'),
  appDescription: z.string().min(3).max(100)
});
