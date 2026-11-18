import { StreamerRole } from '@/modules/authorization/domain/entities/StreamerRole';
import { RoleCode } from '@/modules/authorization/domain/value-objects/roles/shared/RoleCode';
import { RoleDescription } from '@/modules/authorization/domain/value-objects/roles/shared/RoleDescription';
import { RoleName } from '@/modules/authorization/domain/value-objects/roles/shared/RoleName';
import { StreamerRoleId } from '@/modules/authorization/domain/value-objects/roles/StreamerRoleId';
import { StreamerRoleSelect } from '@/modules/authorization/infrastructure/dao/IStreamerRole.dao';

export class StreamerRoleMapper {
  static toDomain(streamerRolePersistence: StreamerRoleSelect) {
    return new StreamerRole(
      new StreamerRoleId(streamerRolePersistence.id),
      new RoleName(streamerRolePersistence.name),
      new RoleCode(streamerRolePersistence.code),
      new RoleDescription(streamerRolePersistence.description),
      new Date(streamerRolePersistence.created_at),
      streamerRolePersistence.updated_at
    );
  }

  static toPersistence(streamerRole: StreamerRole): StreamerRoleSelect {
    return {
      id: streamerRole.id.value,
      name: streamerRole.name.value,
      code: streamerRole.code.value,
      description: streamerRole.description.value,
      created_at: streamerRole.createdAt,
      updated_at: streamerRole.updatedAt
    };
  }
}
