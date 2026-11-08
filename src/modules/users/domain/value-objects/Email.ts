import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MAX_EMAIL_LENGTH = APP_CONFIG.database.limits.users.max_email_length;
const emailSchema = z.compile(z.email().max(MAX_EMAIL_LENGTH));

export class Email {
  constructor(private readonly email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const res = emailSchema.validate(normalizedEmail);
    if (!res) {
      throw new Error('Invalid email');
    }
    this.email = normalizedEmail;
  }

  get value(): string {
    return this.email;
  }
}
