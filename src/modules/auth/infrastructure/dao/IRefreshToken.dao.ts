import { refreshTokens } from '@/infrastructure/db/schema/refreshTokens';

export type RefreshTokenSelect = typeof refreshTokens.$inferSelect;

export type RefreshTokenInsert = typeof refreshTokens.$inferInsert;

export interface IRefreshTokenDao {
  findByToken(token: string): Promise<RefreshTokenSelect | null>;
  findById(id: string): Promise<RefreshTokenSelect | null>;
  create(data: RefreshTokenInsert): Promise<RefreshTokenSelect>;
  update(data: RefreshTokenSelect): Promise<RefreshTokenSelect>;
  delete(token: string): Promise<void>;
}
