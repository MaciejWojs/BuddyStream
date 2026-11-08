import { GlobalRoleId } from '../value-objects/roles/GlobalRoleId';
import { RoleCode } from '../value-objects/roles/shared/RoleCode';
import { RoleDescription } from '../value-objects/roles/shared/RoleDescription';
import { RoleName } from '../value-objects/roles/shared/RoleName';

export class GlobalRole {
  constructor(
    readonly id: GlobalRoleId,
    readonly name: RoleName,
    readonly code: RoleCode,
    readonly description: RoleDescription,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  private copy(changes: Partial<GlobalRole>) {
    return new GlobalRole(
      changes.id ?? this.id,
      changes.name ?? this.name,
      changes.code ?? this.code,
      changes.description ?? this.description,
      changes.createdAt ?? this.createdAt,
      new Date()
    );
  }

  updateCode(code: RoleCode) {
    return this.copy({ code });
  }

  updateDescription(description: RoleDescription) {
    return this.copy({ description });
  }

  updateName(name: RoleName) {
    return this.copy({ name });
  }
}
