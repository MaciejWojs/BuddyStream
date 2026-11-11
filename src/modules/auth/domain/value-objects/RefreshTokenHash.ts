import { timingSafeEqual } from 'node:crypto';

import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

const MIN_SECRET_LENGTH = APP_CONFIG.domain.limits.refresh_tokens.min_secret_length;
const MAX_SECRET_LENGTH = APP_CONFIG.domain.limits.refresh_tokens.max_secret_length;
const MAX_TOKEN_HASH_LENGTH = APP_CONFIG.database.limits.max_token_hash_length;
const DIGEST_HEX_LENGTH = new Bun.CryptoHasher('sha256').digest('hex').length;

if (DIGEST_HEX_LENGTH > MAX_TOKEN_HASH_LENGTH) {
  throw new Error('max_token_hash_length is shorter than the SHA-256 hex digest');
}

const secretSchema = z.compile(
  z
    .string()
    .min(MIN_SECRET_LENGTH)
    .max(MAX_SECRET_LENGTH)
    .regex(/^[A-Za-z0-9+/_=-]+$/)
);

const hashSchema = z.compile(
  z
    .string()
    .length(DIGEST_HEX_LENGTH)
    .max(MAX_TOKEN_HASH_LENGTH)
    .regex(/^[0-9a-f]+$/)
);

export class RefreshTokenHash {
  private constructor(private readonly hash: string) {}

  static create(secret: string): RefreshTokenHash {
    if (!secretSchema.validate(secret)) {
      throw new Error('Invalid refresh token secret');
    }

    const hash = new Bun.CryptoHasher('sha256').update(secret).digest('hex');
    if (!hashSchema.validate(hash)) {
      throw new Error('Invalid refresh token hash');
    }
    return new RefreshTokenHash(hash);
  }

  static fromHash(hash: string): RefreshTokenHash {
    if (!hashSchema.validate(hash)) {
      throw new Error('Invalid refresh token hash');
    }
    return new RefreshTokenHash(hash);
  }

  equals(otherHash: string): boolean {
    if (otherHash.length !== this.hash.length) {
      return false;
    }
    return timingSafeEqual(Buffer.from(this.hash, 'utf8'), Buffer.from(otherHash, 'utf8'));
  }

  get value(): string {
    return this.hash;
  }
}
