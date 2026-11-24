import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class StreamId extends BaseUUID {
  constructor(id: string) {
    super(id);
  }
}
