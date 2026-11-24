import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class FollowId extends BaseUUID {
  constructor(id: string) {
    super(id);
  }
}
