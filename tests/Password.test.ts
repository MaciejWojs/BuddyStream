import { describe, expect, it } from 'bun:test';

import { Password } from '@/modules/users/domain/value-objects/Passord';

const strongRawPassword = 'Ww`^5oc`CX=6#0I8#v39#x%_8Yt)1r';

describe('Password', () => {
  it('should create a new Password object from a raw password', async () => {
    const password = await Password.create(strongRawPassword);
    expect(password).toBeInstanceOf(Password);
  });

  it('should verify a password against the hashed password', async () => {
    const password = await Password.create(strongRawPassword);
    const result = await password.verify(strongRawPassword);
    expect(result).toBe(true);
  });
});

describe('Password', () => {
  it('should create a new Password object from a hash', async () => {
    const password = (await Password.create(strongRawPassword)).value;
    const result = await Password.fromHash(password);
    expect(result).toBeInstanceOf(Password);
  });
});
