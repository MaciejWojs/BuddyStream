import { RoleCode } from '../value-objects/roles/shared/RoleCode';
import { RoleDescription } from '../value-objects/roles/shared/RoleDescription';
import { RoleName } from '../value-objects/roles/shared/RoleName';
import { StreamerRoleId } from '../value-objects/roles/StreamerRoleId';

export class StreamerRole {
  constructor(
    readonly id: StreamerRoleId,
    readonly name: RoleName,
    readonly code: RoleCode,
    readonly description: RoleDescription,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  private copy(changes: Partial<StreamerRole>) {
    return new StreamerRole(
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
