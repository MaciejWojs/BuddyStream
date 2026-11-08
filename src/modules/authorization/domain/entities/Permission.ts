import { PermissionCode } from '../value-objects/permissions/PermissionCode';
import { PermissionDescription } from '../value-objects/permissions/PermissionDescription';
import { PermissionId } from '../value-objects/permissions/PermissionId';

export class Permission {
  constructor(
    readonly id: PermissionId,
    readonly code: PermissionCode,
    readonly description: PermissionDescription,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  private copy(changes: Partial<Permission>) {
    return new Permission(
      changes.id ?? this.id,
      changes.code ?? this.code,
      changes.description ?? this.description,
      changes.createdAt ?? this.createdAt,
      new Date()
    );
  }

  updateCode(code: PermissionCode) {
    return this.copy({ code });
  }

  updateDescription(description: PermissionDescription) {
    return this.copy({ description });
  }
}
