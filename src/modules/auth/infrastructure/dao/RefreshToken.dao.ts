import { eq } from 'drizzle-orm';

import { DatabaseClient } from '@/infrastructure/db/client';
import { refreshTokens } from '@/infrastructure/db/schema/refreshTokens';

import { IRefreshTokenDao, RefreshTokenInsert, RefreshTokenSelect } from './IRefreshToken.dao';

export class RefreshTokenDao implements IRefreshTokenDao {
  constructor(private readonly db: DatabaseClient) {
    this.db = db;
  }

  async create(data: RefreshTokenInsert) {
    const [tokens] = await this.db
      .insert(refreshTokens)
      .values({
        token_hash: data.token_hash,
        user_id: data.user_id,
        expires_at: data.expires_at,
        revoked_at: data.revoked_at,
        created_at: data.created_at,
        updated_at: data.updated_at
      })
      .returning();

    if (!tokens) {
      throw new Error('Failed to create refresh token');
    }
    return tokens;
  }

  async delete(token: string) {
    await this.db.delete(refreshTokens).where(eq(refreshTokens.token_hash, token));
  }

  async findById(id: string) {
    const [tokens] = await this.db.select().from(refreshTokens).where(eq(refreshTokens.id, id));
    return tokens ?? null;
  }

  async findByToken(token: string) {
    const [tokens] = await this.db.select().from(refreshTokens).where(eq(refreshTokens.token_hash, token));
    return tokens ?? null;
  }

  async update(data: RefreshTokenSelect) {
    const [tokens] = await this.db
      .update(refreshTokens)
      .set({
        token_hash: data.token_hash,
        user_id: data.user_id,
        expires_at: data.expires_at,
        revoked_at: data.revoked_at,
        created_at: data.created_at,
        updated_at: data.updated_at
      })
      .where(eq(refreshTokens.id, data.id))
      .returning();

    if (!tokens) {
      throw new Error('Failed to update refresh token');
    }
    return tokens;
  }
}
