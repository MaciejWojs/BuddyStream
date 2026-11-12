import { User } from '@/modules/users/domain/entities/User';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Password } from '@/modules/users/domain/value-objects/Passord';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { Username } from '@/modules/users/domain/value-objects/Username';
import { UserSelect } from '@/modules/users/infrastructure/dao/IUser.dao';

export class UserMapper {
  static toDomain(user: UserSelect): User {
    return new User(
      new UserId(user.id),
      new Username(user.username),
      new Email(user.email),
      Password.fromHash(user.password_hash),
      user.avatar_key,
      user.avatar_placeholder,
      user.created_at,
      user.updated_at
    );
  }

  static toPersistence(user: User): UserSelect {
    return UserMapper.toRaw(user);
  }

  static toRaw(user: User): UserSelect {
    return {
      id: user.userId.value,
      username: user.username.value,
      email: user.email.value,
      password_hash: user.password.value,
      avatar_key: user.avatarKey,
      avatar_placeholder: user.avatarPlaceholder,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };
  }
}
