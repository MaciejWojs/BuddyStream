import { UserId } from '@/modules/users/domain/value-objects/UserId';

export class RefreshToken {
  private constructor(
    readonly tokenHash: string,
    readonly userId: UserId,
    readonly revokedAt: Date | null,
    readonly expiresAt: Date,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  static create(
    secret: string,
    userId: UserId,
    revokedAt: Date | null,
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    const newHash = RefreshToken.hashRaw(secret);
    return new RefreshToken(newHash, userId, revokedAt, expiresAt, createdAt, updatedAt);
  }

  static fromHash(
    hash: string,
    userId: UserId,
    revokedAt: Date | null,
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date
  ): RefreshToken {
    return new RefreshToken(hash, userId, revokedAt, expiresAt, createdAt, updatedAt);
  }

  static hashRaw(raw: string): string {
    return new Bun.CryptoHasher('sha256').update(raw).digest('hex');
  }

  equals(otherHash: string): boolean {
    return this.tokenHash === otherHash;
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
    return new RefreshToken(this.tokenHash, this.userId, now, this.expiresAt, this.createdAt, now);
  }
}
