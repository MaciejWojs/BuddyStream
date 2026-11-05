import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MAX_EMAIL_LENGTH = APP_CONFIG.database.limits.users.max_email_length;
const emailSchema = z.email().max(MAX_EMAIL_LENGTH);

export class Email {
  constructor(private readonly email: string) {
    const res = emailSchema.validate(email);
    if (!res) {
      throw new Error('Invalid email');
    }
  }

  get value(): string {
    return this.email;
  }
}
