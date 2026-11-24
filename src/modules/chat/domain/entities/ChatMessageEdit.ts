import { UserId } from '@/modules/users/domain/value-objects/UserId';

import { ChatMessageBody } from '../value-objects/ChatMessageBody';
import { ChatMessageEditId } from '../value-objects/ChatMessageEditId';
import { ChatMessageId } from '../value-objects/ChatMessageId';

export class ChatMessageEdit {
  constructor(
    readonly id: ChatMessageEditId,
    readonly messageId: ChatMessageId,
    readonly previousBody: ChatMessageBody,
    readonly editedBy: UserId,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}
}
