import { StreamId } from '@/modules/streams/domain/value-objects/StreamId';
import { UserId } from '@/modules/users/domain/value-objects/UserId';

import { ChatError } from '../errors/ChatErrors';
import { ChatMessageBody } from '../value-objects/ChatMessageBody';
import { ChatMessageEditId } from '../value-objects/ChatMessageEditId';
import { ChatMessageId } from '../value-objects/ChatMessageId';
import { ChatMessageEdit } from './ChatMessageEdit';

export class ChatMessage {
  constructor(
    readonly id: ChatMessageId,
    readonly streamId: StreamId,
    readonly authorId: UserId,
    readonly body: ChatMessageBody,
    readonly deletedAt: Date | null,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  edit(
    nextBody: ChatMessageBody,
    editedBy: UserId,
    editId: ChatMessageEditId
  ): { message: ChatMessage; edit: ChatMessageEdit } {
    if (this.deletedAt !== null) {
      throw new ChatError('chat.message.deleted');
    }

    const editedAt = new Date();
    return {
      message: new ChatMessage(this.id, this.streamId, this.authorId, nextBody, null, this.createdAt, editedAt),
      edit: new ChatMessageEdit(editId, this.id, this.body, editedBy, editedAt, null)
    };
  }

  remove(): ChatMessage {
    if (this.deletedAt !== null) {
      return this;
    }

    const deletedAt = new Date();
    return new ChatMessage(this.id, this.streamId, this.authorId, this.body, deletedAt, this.createdAt, deletedAt);
  }
}
