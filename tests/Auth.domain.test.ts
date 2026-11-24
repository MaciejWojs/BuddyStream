import { describe, expect, it } from 'bun:test';

import { RefreshToken } from '@/modules/auth/domain/entities/RefreshToken';
import { RefreshTokenHash } from '@/modules/auth/domain/value-objects/RefreshTokenHash';
import { RefreshTokenId } from '@/modules/auth/domain/value-objects/RefreshTokenId';
import { UserId } from '@/modules/users/domain/value-objects/UserId';

const secret = 'a'.repeat(32);
const otherSecret = 'b'.repeat(32);

function tokenAt(createdAt: Date, expiresAt: Date, revokedAt: Date | null = null, updatedAt: Date | null = null) {
  return RefreshToken.issue(
    new RefreshTokenId(),
    RefreshTokenHash.create(secret),
    new UserId(),
    revokedAt,
    expiresAt,
    createdAt,
    updatedAt
  );
}

describe('RefreshToken', () => {
  it('issues an active token', () => {
    const createdAt = new Date();
    const issued = tokenAt(createdAt, new Date(createdAt.getTime() + 60_000));

    expect(issued.isExpired()).toBe(false);
    expect(issued.isRevoked()).toBe(false);
    expect(issued.isActive()).toBe(true);
    expect(issued.equals(issued.tokenHash.value)).toBe(true);
    expect(issued.equals(RefreshTokenHash.create(otherSecret).value)).toBe(false);
  });

  it('rejects an expired token at issue time', () => {
    const createdAt = new Date(Date.now() - 120_000);

    expect(() => tokenAt(createdAt, new Date(createdAt.getTime() + 60_000))).toThrow(
      expect.objectContaining({ code: 'auth.refresh_token.expired', message: 'Refresh token expired' })
    );
  });

  it('rejects a token created after it expires', () => {
    const expiresAt = new Date(Date.now() + 60_000);

    expect(() => tokenAt(new Date(expiresAt.getTime() + 1_000), expiresAt)).toThrow(
      expect.objectContaining({
        code: 'auth.refresh_token.created_in_future',
        message: 'Refresh token created in the future'
      })
    );
  });

  it('rejects an update that precedes creation', () => {
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 60_000);

    expect(() => tokenAt(createdAt, expiresAt, null, new Date(createdAt.getTime() - 1_000))).toThrow(
      expect.objectContaining({
        code: 'auth.refresh_token.updated_in_past',
        message: 'Refresh token updated in the past'
      })
    );
  });

  it('reconstitutes an expired token and reports it inactive', () => {
    const createdAt = new Date(Date.now() - 120_000);
    const expiresAt = new Date(createdAt.getTime() + 60_000);
    const stored = RefreshToken.reconstitute(
      new RefreshTokenId(),
      RefreshTokenHash.create(secret),
      new UserId(),
      null,
      expiresAt,
      createdAt,
      null
    );

    expect(stored.isExpired()).toBe(true);
    expect(stored.isActive()).toBe(false);
  });

  it('revokes an active token and keeps its identity', () => {
    const createdAt = new Date();
    const issued = tokenAt(createdAt, new Date(createdAt.getTime() + 60_000));

    const revoked = issued.revoke();

    expect(revoked).not.toBe(issued);
    expect(revoked.id.value).toBe(issued.id.value);
    expect(revoked.tokenHash.value).toBe(issued.tokenHash.value);
    expect(revoked.userId.value).toBe(issued.userId.value);
    expect(revoked.isRevoked()).toBe(true);
    expect(revoked.isActive()).toBe(false);
    expect(issued.isRevoked()).toBe(false);
    expect(revoked.updatedAt?.getTime()).toBeGreaterThanOrEqual(createdAt.getTime());
  });
});

describe('RefreshTokenHash', () => {
  it('hashes a secret and accepts that hash back', () => {
    const hash = RefreshTokenHash.create(secret);

    expect(RefreshTokenHash.fromHash(hash.value).value).toBe(hash.value);
    expect(hash.equals(hash.value)).toBe(true);
    expect(hash.equals('short')).toBe(false);
  });

  it('rejects a secret outside the allowed shape', () => {
    expect(() => RefreshTokenHash.create('short')).toThrow(
      expect.objectContaining({
        code: 'auth.refresh_token.secret_invalid',
        message: 'Invalid refresh token secret'
      })
    );
  });

  it('rejects a hash that is not a digest', () => {
    expect(() => RefreshTokenHash.fromHash('not-a-digest')).toThrow(
      expect.objectContaining({
        code: 'auth.refresh_token.hash_invalid',
        message: 'Invalid refresh token hash'
      })
    );
  });
});
