import { emailSchema } from '@/shared/schemas/base-types';

import { UserError } from '../errors/UserErrors';

export class Email {
  constructor(private readonly email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const res = emailSchema.validate(normalizedEmail);
    if (!res) {
      throw new UserError('user.email.invalid');
    }
    this.email = normalizedEmail;
  }

  get value(): string {
    return this.email;
  }
}
