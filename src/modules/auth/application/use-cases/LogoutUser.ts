import { AuthError } from '../../domain/errors/AuthErrors';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshToken.repository';
import { RefreshTokenHash } from '../../domain/value-objects/RefreshTokenHash';

export class LogoutUser {
  constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async execute(refreshTokenHash: RefreshTokenHash): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findByHash(refreshTokenHash);
    if (!refreshToken) {
      throw new AuthError('auth.refresh_token.invalid');
    }
    await this.refreshTokenRepository.save(refreshToken.revoke());
  }
}
