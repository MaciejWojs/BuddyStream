import { password as bunPassword } from 'bun';
import { z } from 'zod';
import zxcvbn from 'zxcvbn';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { UserError } from '../errors/UserErrors';

const hashAlgorithm = APP_CONFIG.security.hash_algorithm;
const MIN_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.min_password_length;
const MAX_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.max_password_length;
const MIN_PASSWORD_STRENGTH = APP_CONFIG.domain.limits.users.min_password_strength;
const MAX_HASH_LENGTH = APP_CONFIG.database.limits.shared.max_hash_length;

const passwordSchema = z.compile(z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH));

export class Password {
  private constructor(private readonly hashedPass: string) {}

  private static checkPasswordRequirements(password: string): void {
    const res = passwordSchema.validate(password);
    if (!res) {
      throw new UserError('user.password.invalid');
    }
    const { score } = zxcvbn(password);
    if (score < MIN_PASSWORD_STRENGTH) {
      throw new UserError('user.password.too_weak');
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasLower || !hasUpper || !hasDigit || !hasSpecialChar) {
      throw new UserError('user.password.complexity');
    }
  }

  /**
   * Create a new Password object from a raw password
   *
   * @param rawPassword - The raw password to create the Password object from
   * @returns A new Password object
   * @throws {UserError} If the password breaks a domain rule
   */
  static async create(rawPassword: string): Promise<Password> {
    const trimmedPassword = rawPassword.trim();
    this.checkPasswordRequirements(trimmedPassword);

    const hashed = await bunPassword.hash(trimmedPassword, {
      algorithm: hashAlgorithm
    });
    if (hashed.length > MAX_HASH_LENGTH) {
      throw new UserError('user.password.hash_too_long');
    }
    return new Password(hashed);
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  get value(): string {
    return this.hashedPass;
  }

  async verify(pass: string): Promise<boolean> {
    return bunPassword.verify(pass, this.hashedPass);
  }
}
