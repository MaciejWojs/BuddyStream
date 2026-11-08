import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class PermissionId extends BaseUUID {
  constructor(id?: string) {
    super(id);
  }
}
