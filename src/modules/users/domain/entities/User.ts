import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Passord';
import { UserId } from '../value-objects/UserId';
import { Username } from '../value-objects/Username';

export class User {
  constructor(
    readonly userId: UserId,
    readonly username: Username,
    readonly email: Email,
    readonly password: Password,
    readonly avatarKey: string | null,
    readonly avatarPlaceholder: string | null,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  changeAvatarKey(newAvatarKey: string) {
    return this.copy({ avatarKey: newAvatarKey });
  }

  changeAvatarPlaceholder(newAvatarPlaceholder: string | null) {
    return this.copy({ avatarPlaceholder: newAvatarPlaceholder });
  }

  changeEmail(newEmail: Email) {
    return this.copy({ email: newEmail });
  }

  changePassword(newPassword: Password) {
    return this.copy({ password: newPassword });
  }

  changeUsername(newUsername: Username) {
    return this.copy({ username: newUsername });
  }

  private copy(changes: Partial<User>) {
    return new User(
      changes.userId ?? this.userId,
      changes.username ?? this.username,
      changes.email ?? this.email,
      changes.password ?? this.password,
      changes.avatarKey ?? this.avatarKey,
      changes.avatarPlaceholder ?? this.avatarPlaceholder,
      changes.createdAt ?? this.createdAt,
      changes.updatedAt ?? this.updatedAt
    );
  }
}
