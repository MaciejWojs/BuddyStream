import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class ChannelId extends BaseUUID {
  constructor(id?: string) {
    super(id);
  }
}
