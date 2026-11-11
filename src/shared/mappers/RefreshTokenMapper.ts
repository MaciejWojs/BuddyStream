import { RefreshToken } from '@/modules/auth/domain/entities/RefreshToken';
import { RefreshTokenHash } from '@/modules/auth/domain/value-objects/RefreshTokenHash';
import { RefreshTokenId } from '@/modules/auth/domain/value-objects/RefreshTokenId';
import { RefreshTokenSelect } from '@/modules/auth/infrastructure/dao/IRefreshToken.dao';
import { UserId } from '@/modules/users/domain/value-objects/UserId';

export class RefreshTokenMapper {
  static toDomain(refreshToken: RefreshTokenSelect): RefreshToken {
    return RefreshToken.reconstitute(
      new RefreshTokenId(refreshToken.id),
      RefreshTokenHash.fromHash(refreshToken.token_hash),
      new UserId(refreshToken.user_id),
      refreshToken.revoked_at,
      refreshToken.expires_at,
      refreshToken.created_at,
      refreshToken.updated_at
    );
  }

  static toPersistence(refreshToken: RefreshToken): RefreshTokenSelect {
    return {
      id: refreshToken.id.value,
      token_hash: refreshToken.tokenHash.value,
      user_id: refreshToken.userId.value,
      revoked_at: refreshToken.revokedAt,
      expires_at: refreshToken.expiresAt,
      created_at: refreshToken.createdAt,
      updated_at: refreshToken.updatedAt
    };
  }
}
