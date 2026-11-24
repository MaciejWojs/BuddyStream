import { randomUUIDv7 } from 'bun';

import { IRefreshTokenDao, type RefreshTokenInsert, type RefreshTokenSelect } from './IRefreshToken.dao';

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export class RefreshTokenDaoTest implements IRefreshTokenDao {
  private readonly byId = new Map<string, RefreshTokenSelect>();

  private readonly hashes = new Set<string>();

  private readonly rows: RefreshTokenSelect[] = [];

  private copy(row: RefreshTokenSelect | undefined) {
    return row ? { ...row } : null;
  }

  async create(data: RefreshTokenInsert) {
    const row = this.materialize(data);
    if (this.byId.has(row.id) || this.hashes.has(row.token_hash)) {
      throw new Error('Failed to create refresh token');
    }

    this.rows.push(row);
    this.byId.set(row.id, row);
    this.hashes.add(row.token_hash);
    return { ...row };
  }

  async delete(token: string) {
    if (!this.hashes.has(token)) {
      return;
    }

    const index = this.rows.findIndex((row) => row.token_hash === token);
    const current = this.rows[index];
    if (!current) {
      return;
    }

    this.rows.splice(index, 1);
    this.byId.delete(current.id);
    this.hashes.delete(token);
  }

  async findById(id: string) {
    return this.copy(this.byId.get(id));
  }

  async findByToken(token: string) {
    if (!this.hashes.has(token)) {
      return null;
    }
    return this.copy(this.rows.find((row) => row.token_hash === token));
  }

  private materialize(data: RefreshTokenInsert): RefreshTokenSelect {
    return {
      id: data.id ?? randomUUIDv7(),
      user_id: data.user_id,
      token_hash: data.token_hash,
      revoked_at: data.revoked_at ?? null,
      expires_at: data.expires_at ?? new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? null
    };
  }

  async update(data: RefreshTokenSelect) {
    const current = this.byId.get(data.id);
    if (!current) {
      throw new Error('Failed to update refresh token');
    }

    const hashTaken = data.token_hash !== current.token_hash && this.hashes.has(data.token_hash);
    if (hashTaken) {
      throw new Error('Failed to update refresh token');
    }

    this.hashes.delete(current.token_hash);
    this.hashes.add(data.token_hash);

    const next = { ...data };
    this.rows[this.rows.indexOf(current)] = next;
    this.byId.set(next.id, next);
    return { ...next };
  }
}
