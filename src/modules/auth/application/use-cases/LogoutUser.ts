import { UserId } from '@/modules/users/domain/value-objects/UserId';

import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshToken.repository';
import { RefreshTokenHash } from '../../domain/value-objects/RefreshTokenHash';

export class LogoutUser {
  constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async execute(userId: UserId, refreshTokenHash: RefreshTokenHash): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findByHash(refreshTokenHash);
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }
    if (refreshToken.userId.value !== userId.value) {
      //! This should never happen!
      console.error('Invalid refresh token - user id mismatch');
      throw new Error('Invalid refresh token');
    }
    await this.refreshTokenRepository.delete(refreshToken.revoke());
  }
}
