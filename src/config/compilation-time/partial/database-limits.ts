import 'zod/compile';
import { z } from 'zod';

const positiveInt = z.int().positive();

const describedCodeLimits = z.strictObject({
  max_code_length: positiveInt,
  max_description_length: positiveInt
});

export const databaseLimitsSchema = z.strictObject({
  roles: z.strictObject({
    ...describedCodeLimits.shape,
    max_name_length: positiveInt
  }),
  permissions: describedCodeLimits,
  users: z.strictObject({
    max_username_length: positiveInt,
    max_email_length: positiveInt
  }),
  shared: z.strictObject({
    max_hash_length: positiveInt,
    max_assets_key_length: positiveInt
  }),
  max_message_body_length: positiveInt,
  max_token_hash_length: positiveInt
});
