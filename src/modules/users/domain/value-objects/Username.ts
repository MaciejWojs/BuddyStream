import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { InvalidUsernameError, UsernameWhitespaceError } from '../errors/UserErrors';

const MIN_USERNAME_LENGTH = APP_CONFIG.domain.limits.users.min_username_length;
const MAX_USERNAME_LENGTH = APP_CONFIG.database.limits.users.max_username_length;

const usernameSchema = z.compile(z.string().min(MIN_USERNAME_LENGTH).max(MAX_USERNAME_LENGTH));

export class Username {
  constructor(private readonly username: string) {
    const res = usernameSchema.validate(username);
    if (!res) {
      throw new InvalidUsernameError();
    }
    if (/\s/.test(username)) {
      throw new UsernameWhitespaceError();
    }
  }

  get value(): string {
    return this.username;
  }
}
