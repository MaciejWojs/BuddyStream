import { RefreshToken } from '../entities/RefreshToken';
import { RefreshTokenHash } from '../value-objects/RefreshTokenHash';
import { RefreshTokenId } from '../value-objects/RefreshTokenId';

export interface IRefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<void>;
  findByHash(hash: RefreshTokenHash): Promise<RefreshToken | null>;
  findById(id: RefreshTokenId): Promise<RefreshToken | null>;
  delete(refreshToken: RefreshToken): Promise<void>;
}
