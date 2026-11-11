import { UserId } from '@/modules/users/domain/value-objects/UserId';

import { RefreshTokenHash } from '../value-objects/RefreshTokenHash';
import { RefreshTokenId } from '../value-objects/RefreshTokenId';

export class RefreshToken {
  private constructor(
    readonly id: RefreshTokenId,
    readonly tokenHash: RefreshTokenHash,
    readonly userId: UserId,
    readonly revokedAt: Date | null,
    readonly expiresAt: Date,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  static create(
    id: RefreshTokenId,
    tokenHash: RefreshTokenHash,
    userId: UserId,
    revokedAt: Date | null,
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date | null
  ): RefreshToken {
    if (expiresAt < new Date()) {
      throw new Error('Refresh token expired');
    }
    if (createdAt > expiresAt) {
      throw new Error('Refresh token created in the future');
    }
    if (updatedAt !== null && updatedAt < createdAt) {
      throw new Error('Refresh token updated in the past');
    }

    return new RefreshToken(id, tokenHash, userId, revokedAt, expiresAt, createdAt, updatedAt);
  }

  equals(otherHash: string): boolean {
    return this.tokenHash.equals(otherHash);
  }

  isActive(): boolean {
    return !this.isRevoked() && !this.isExpired();
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  isRevoked(): boolean {
    return this.revokedAt !== null;
  }

  revoke() {
    const now = new Date();
    return new RefreshToken(this.id, this.tokenHash, this.userId, now, this.expiresAt, this.createdAt, now);
  }
}
