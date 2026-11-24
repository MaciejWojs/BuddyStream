import { describe, expect, it } from 'bun:test';

import { User } from '@/modules/users/domain/entities/User';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Password } from '@/modules/users/domain/value-objects/Passord';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { Username } from '@/modules/users/domain/value-objects/Username';
import { UserDaoTest } from '@/modules/users/infrastructure/dao/User.dao.test';
import { UserRepository } from '@/modules/users/infrastructure/repository/User.repository';

function repository() {
  return new UserRepository(new UserDaoTest());
}

function user(username = 'ada', email = 'ada@example.com') {
  return new User(
    new UserId(),
    new Username(username),
    new Email(email),
    Password.fromHash('stored-hash'),
    null,
    null,
    new Date('2026-01-01T00:00:00.000Z'),
    null
  );
}

describe('UserRepository', () => {
  it('returns null when the user does not exist', async () => {
    const users = repository();
    const missing = user();

    expect(await users.findById(missing.userId)).toBeNull();
    expect(await users.findByUsername(missing.username)).toBeNull();
    expect(await users.findByEmail(missing.email)).toBeNull();
  });

  it('saves a user and finds the same row by id, username, and email', async () => {
    const users = repository();
    const created = user();

    await users.save(created);

    const byId = await users.findById(created.userId);
    const byUsername = await users.findByUsername(created.username);
    const byEmail = await users.findByEmail(created.email);

    expect(byId?.userId.value).toBe(created.userId.value);
    expect(byUsername?.username.value).toBe('ada');
    expect(byEmail?.email.value).toBe('ada@example.com');
    expect(byId?.password.value).toBe('stored-hash');
  });

  it('updates an existing user on the next save', async () => {
    const users = repository();
    const created = user();
    await users.save(created);

    const renamed = created.changeUsername(new Username('ada_new'));
    await users.save(renamed);

    expect(await users.findByUsername(created.username)).toBeNull();
    expect((await users.findById(created.userId))?.username.value).toBe('ada_new');
  });

  it('deletes a user', async () => {
    const users = repository();
    const created = user();
    await users.save(created);

    await users.delete(created.userId);

    expect(await users.findById(created.userId)).toBeNull();
  });
});
