import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class ChatMessageId extends BaseUUID {
  constructor(id: string) {
    super(id);
  }
}
