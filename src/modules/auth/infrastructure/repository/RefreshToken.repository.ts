import { RefreshTokenMapper } from '@/shared/mappers/RefreshTokenMapper';

import { RefreshToken } from '../../domain/entities/RefreshToken';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshToken.repository';
import { RefreshTokenHash } from '../../domain/value-objects/RefreshTokenHash';
import { RefreshTokenId } from '../../domain/value-objects/RefreshTokenId';
import { IRefreshTokenDao } from '../dao/IRefreshToken.dao';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly refreshTokenDao: IRefreshTokenDao) {
    this.refreshTokenDao = refreshTokenDao;
  }

  async delete(refreshToken: RefreshToken) {
    const existingRefreshToken = await this.findByHash(refreshToken.tokenHash);
    if (existingRefreshToken) {
      await this.refreshTokenDao.delete(refreshToken.tokenHash.value);
    }
  }

  async findByHash(hash: RefreshTokenHash) {
    const refreshTokenPersistence = await this.refreshTokenDao.findByToken(hash.value);
    return refreshTokenPersistence ? RefreshTokenMapper.toDomain(refreshTokenPersistence) : null;
  }

  async findById(id: RefreshTokenId) {
    const refreshTokenPersistence = await this.refreshTokenDao.findById(id.value);
    return refreshTokenPersistence ? RefreshTokenMapper.toDomain(refreshTokenPersistence) : null;
  }

  async save(refreshToken: RefreshToken) {
    const refreshTokenPersistence = RefreshTokenMapper.toPersistence(refreshToken);
    await this.refreshTokenDao.create(refreshTokenPersistence);
  }
}
