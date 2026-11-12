import { randomBytes } from 'node:crypto';

import { sign } from 'hono/jwt';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';
import { EnvProvider } from '@/config/runtime/EnvProvider';
import { IUserRepository } from '@/modules/users/domain/repositories/IUser.repository';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Time } from '@/shared/time/Time';

import { RefreshToken } from '../../domain/entities/RefreshToken';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshToken.repository';
import { RefreshTokenHash } from '../../domain/value-objects/RefreshTokenHash';
import { RefreshTokenId } from '../../domain/value-objects/RefreshTokenId';

const REFRESH_TOKEN_SECRET_LENGTH = APP_CONFIG.security.refresh_token_secret_length;

export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async execute(
    email: Email,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string; refreshExpiresAt: Date }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await user.password.verify(password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const refreshExpiresAt = Time.expiresAt({ days: APP_CONFIG.security.refresf_token_expires_in_days });
    const accessExpiresAt = Time.expiresAt({ minutes: APP_CONFIG.security.access_token_expires_in_minutes });

    const refreshTokenSecret = randomBytes(REFRESH_TOKEN_SECRET_LENGTH / 2).toString('hex');
    const ALGORITHM = APP_CONFIG.security.jwt_algorithm;

    const now = new Date();
    const RT = RefreshToken.issue(
      new RefreshTokenId(),
      RefreshTokenHash.create(refreshTokenSecret),
      user.userId,
      null,
      refreshExpiresAt,
      now,
      now
    );
    await this.refreshTokenRepository.save(RT);

    const envProvider = EnvProvider.getInstance(process.env);

    const ACCESS_TOKEN_SECRET = envProvider.get('ACCESS_TOKEN_SECRET');

    //TODO: Add global role after DAO and Repository are implemented
    const accessToken = await sign(
      { userId: user.userId.value, exp: Time.toEpochSeconds(accessExpiresAt) },
      ACCESS_TOKEN_SECRET,
      ALGORITHM
    );

    return { accessToken: accessToken, refreshToken: refreshTokenSecret, refreshExpiresAt };
  }
}
