import { GlobalRole } from '@/modules/authorization/domain/entities/GlobalRole';
import { GlobalRoleId } from '@/modules/authorization/domain/value-objects/roles/GlobalRoleId';
import { RoleCode } from '@/modules/authorization/domain/value-objects/roles/shared/RoleCode';
import { RoleDescription } from '@/modules/authorization/domain/value-objects/roles/shared/RoleDescription';
import { RoleName } from '@/modules/authorization/domain/value-objects/roles/shared/RoleName';
import { GlobalRoleSelect } from '@/modules/authorization/infrastructure/dao/IGlobalRole.dao';

export class GlobalRoleMapper {
  static toDomain(globalRole: GlobalRoleSelect): GlobalRole {
    return new GlobalRole(
      new GlobalRoleId(globalRole.id),
      new RoleName(globalRole.name),
      new RoleCode(globalRole.code),
      new RoleDescription(globalRole.description),
      globalRole.created_at,
      globalRole.updated_at
    );
  }

  static toPersistence(globalRole: GlobalRole): GlobalRoleSelect {
    return {
      id: globalRole.id.value,
      name: globalRole.name.value,
      code: globalRole.code.value,
      description: globalRole.description.value,
      created_at: globalRole.createdAt,
      updated_at: globalRole.updatedAt
    };
  }
}
