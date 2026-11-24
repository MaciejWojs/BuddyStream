import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { ChannelError } from '../errors/ChannelErrors';

const MAX_IVS_BINDING_LENGTH = APP_CONFIG.database.limits.channels.max_ivs_binding_length;

const encryptedStreamKeySchema = z.compile(z.string().min(1).max(MAX_IVS_BINDING_LENGTH).regex(/^\S+$/));

const PLAINTEXT_STREAM_KEY_PREFIX = 'sk_';

export class EncryptedStreamKey {
  private readonly ciphertext: string;

  constructor(ciphertext: string) {
    if (ciphertext.trimStart().toLowerCase().startsWith(PLAINTEXT_STREAM_KEY_PREFIX)) {
      throw new ChannelError('channel.stream_key.plaintext');
    }
    if (!encryptedStreamKeySchema.validate(ciphertext)) {
      throw new ChannelError('channel.stream_key.invalid');
    }
    this.ciphertext = ciphertext;
  }

  get value(): string {
    return this.ciphertext;
  }
}
