import { describe, expect, it } from 'bun:test';
import crypto from 'node:crypto';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import { Password } from '@/modules/users/domain/value-objects/Passord';

const strongRawPassword = 'Ww`^5oc`CX=6#0I8#v39#x%_8Yt)1r';

const MIN_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.min_password_length;
const MAX_PASSWORD_LENGTH = APP_CONFIG.domain.limits.users.max_password_length;
describe('Password', () => {
  describe('create', () => {
    it('should create a new Password object from a raw password', async () => {
      const password = await Password.create(strongRawPassword);
      expect(password).toBeInstanceOf(Password);
    });

    it('should verify a password against the hashed password', async () => {
      const password = await Password.create(strongRawPassword);
      const result = await password.verify(strongRawPassword);
      expect(result).toBe(true);
    });

    it('should create a new Password object from a hash', async () => {
      const password = (await Password.create(strongRawPassword)).value;
      const result = await Password.fromHash(password);
      expect(result).toBeInstanceOf(Password);
    });
  });
  describe('length', () => {
    it('Password minimal length should be met', async () => {
      const invalidPassword = strongRawPassword.slice(0, MIN_PASSWORD_LENGTH - 1);
      await expect(Password.create(invalidPassword)).rejects.toThrow('Invalid password');
    });
    it('Password maximum length should be enforced', async () => {
      const invalidPassword = `${crypto.randomBytes(MAX_PASSWORD_LENGTH + 1).toString('hex')}#12354`;
      await expect(Password.create(invalidPassword)).rejects.toThrow('Invalid password');
    });
  });

  describe('strength', () => {
    it('Password strength should be met', async () => {
      const invalidPassword = 'a'.repeat(MIN_PASSWORD_LENGTH);
      await expect(Password.create(invalidPassword)).rejects.toThrow('Password is not strong enough');
    });
  });
});
