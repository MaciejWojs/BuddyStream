import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { ChatError } from '../errors/ChatErrors';

const MAX_MESSAGE_BODY_LENGTH = APP_CONFIG.database.limits.max_message_body_length;

const messageBodySchema = z.compile(z.string().min(1).max(MAX_MESSAGE_BODY_LENGTH));

export class ChatMessageBody {
  private readonly body: string;

  constructor(body: string) {
    const normalizedBody = body.trim();
    if (!messageBodySchema.validate(normalizedBody)) {
      throw new ChatError('chat.message.body.invalid');
    }
    this.body = normalizedBody;
  }

  get value(): string {
    return this.body;
  }
}
