import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class GlobalRoleId extends BaseUUID {
  constructor(id?: string) {
    super(id);
  }
}
