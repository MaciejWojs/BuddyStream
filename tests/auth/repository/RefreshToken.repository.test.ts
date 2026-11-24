import { describe, expect, it } from 'bun:test';

import { RefreshToken } from '@/modules/auth/domain/entities/RefreshToken';
import { RefreshTokenHash } from '@/modules/auth/domain/value-objects/RefreshTokenHash';
import { RefreshTokenId } from '@/modules/auth/domain/value-objects/RefreshTokenId';
import { RefreshTokenDaoTest } from '@/modules/auth/infrastructure/dao/RefreshToken.dao.test';
import { RefreshTokenRepository } from '@/modules/auth/infrastructure/repository/RefreshToken.repository';
import { UserId } from '@/modules/users/domain/value-objects/UserId';

function repository() {
  return new RefreshTokenRepository(new RefreshTokenDaoTest());
}

function token() {
  const createdAt = new Date();
  return RefreshToken.issue(
    new RefreshTokenId(),
    RefreshTokenHash.create('a'.repeat(32)),
    new UserId(),
    null,
    new Date(createdAt.getTime() + 60_000),
    createdAt,
    null
  );
}

describe('RefreshTokenRepository', () => {
  it('returns null when the token does not exist', async () => {
    const tokens = repository();
    const missing = token();

    expect(await tokens.findById(missing.id)).toBeNull();
    expect(await tokens.findByHash(missing.tokenHash)).toBeNull();
  });

  it('saves a token and finds it by id and hash', async () => {
    const tokens = repository();
    const created = token();

    await tokens.save(created);

    const byId = await tokens.findById(created.id);
    const byHash = await tokens.findByHash(created.tokenHash);

    expect(byId?.id.value).toBe(created.id.value);
    expect(byHash?.tokenHash.value).toBe(created.tokenHash.value);
    expect(byHash?.isActive()).toBe(true);
  });

  it('updates an existing token on the next save', async () => {
    const tokens = repository();
    const created = token();
    await tokens.save(created);

    await tokens.save(created.revoke());

    const stored = await tokens.findByHash(created.tokenHash);
    expect(stored?.isRevoked()).toBe(true);
    expect(stored?.isActive()).toBe(false);
  });

  it('deletes a stored token and ignores a missing one', async () => {
    const tokens = repository();
    const created = token();
    await tokens.save(created);

    await tokens.delete(created);
    await tokens.delete(created);

    expect(await tokens.findById(created.id)).toBeNull();
  });
});
