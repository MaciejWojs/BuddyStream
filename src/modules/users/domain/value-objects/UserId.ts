import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class UserId extends BaseUUID {
  constructor(id?: string) {
    super(id);
  }
}
