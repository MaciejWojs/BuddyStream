import { usernameSchema } from '@/shared/schemas/base-types';

import { UserError } from '../errors/UserErrors';

export class Username {
  constructor(private readonly username: string) {
    const res = usernameSchema.validate(username);
    if (!res) {
      throw new UserError('user.username.invalid');
    }
    if (/\s/.test(username)) {
      throw new UserError('user.username.whitespace');
    }
  }

  get value(): string {
    return this.username;
  }
}
