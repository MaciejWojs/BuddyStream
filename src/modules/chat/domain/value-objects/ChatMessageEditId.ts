import { BaseUUID } from '@/shared/value-objects/BaseUUID';

export class ChatMessageEditId extends BaseUUID {
  constructor(id: string) {
    super(id);
  }
}
