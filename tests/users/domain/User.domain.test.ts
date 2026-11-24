import { describe, expect, it } from 'bun:test';

import { User } from '@/modules/users/domain/entities/User';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Password } from '@/modules/users/domain/value-objects/Passord';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { Username } from '@/modules/users/domain/value-objects/Username';

const currentPassword = 'Ww`^5oc`CX=6#0I8#v39#x%_8Yt)1r';
const nextPassword = 'Nq7!mP$vL2@xR8&cW4#bK9z';

function userWith(password: Password) {
  return new User(
    new UserId(),
    new Username('ada'),
    new Email('Ada@Example.com'),
    password,
    null,
    'placeholder',
    new Date('2026-01-01T00:00:00.000Z'),
    null
  );
}

describe('User', () => {
  it('keeps the previous password when the password changes', async () => {
    const previous = await Password.create(currentPassword);
    const next = await Password.create(nextPassword);
    const account = userWith(previous);

    const changed = account.changePassword(next);

    expect(changed).not.toBe(account);
    expect(changed.userId.value).toBe(account.userId.value);
    expect(changed.username.value).toBe(account.username.value);
    expect(changed.email.value).toBe(account.email.value);
    expect(account.password.value).toBe(previous.value);
    expect(changed.password.value).toBe(next.value);
    expect(await changed.password.verify(nextPassword)).toBe(true);
    expect(await changed.password.verify(currentPassword)).toBe(false);
    expect(changed.updatedAt?.getTime()).toBeGreaterThan(account.createdAt.getTime());
    expect(account.updatedAt).toBeNull();
  });

  it('replaces the email and username and leaves the password in place', async () => {
    const password = await Password.create(currentPassword);
    const account = userWith(password);

    const changed = account.changeEmail(new Email('next@example.com')).changeUsername(new Username('ada_new'));

    expect(changed.email.value).toBe('next@example.com');
    expect(changed.username.value).toBe('ada_new');
    expect(changed.password.value).toBe(password.value);
    expect(account.email.value).toBe('ada@example.com');
  });

  it('replaces the avatar and clears the placeholder', async () => {
    const account = userWith(Password.fromHash('stored-hash'));

    const changed = account.changeAvatarKey('avatars/ada.png').changeAvatarPlaceholder(null);

    expect(changed.avatarKey).toBe('avatars/ada.png');
    expect(changed.avatarPlaceholder).toBeNull();
    expect(account.avatarKey).toBeNull();
    expect(account.avatarPlaceholder).toBe('placeholder');
  });
});

describe('Email', () => {
  it('trims and lowercases the address', () => {
    expect(new Email('  Ada@Example.com  ').value).toBe('ada@example.com');
  });

  it('rejects an address that is not an email', () => {
    expect(() => new Email('ada')).toThrow(
      expect.objectContaining({ code: 'user.email.invalid', message: 'Invalid email' })
    );
  });
});

describe('Username', () => {
  it('rejects a name that is too short', () => {
    expect(() => new Username('ab')).toThrow(
      expect.objectContaining({ code: 'user.username.invalid', message: 'Invalid username' })
    );
  });

  it('rejects a name that contains whitespace', () => {
    expect(() => new Username('ada lovelace')).toThrow(
      expect.objectContaining({ code: 'user.username.whitespace', message: 'Username cannot contain whitespace' })
    );
  });
});
