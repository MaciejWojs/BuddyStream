import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MIN_USERNAME_LENGTH = APP_CONFIG.domain.limits.users.min_username_length;
const MAX_USERNAME_LENGTH = APP_CONFIG.database.limits.users.max_username_length;

const usernameSchema = z.string().min(MIN_USERNAME_LENGTH).max(MAX_USERNAME_LENGTH);

export class Username {
  constructor(private readonly username: string) {
    const res = usernameSchema.validate(username);
    if (!res) {
      throw new Error('Invalid username');
    }
    if (/\s/.test(username)) {
      throw new Error('Username cannot contain whitespace');
    }
  }

  get value(): string {
    return this.username;
  }
}
