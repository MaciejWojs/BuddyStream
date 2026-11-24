import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { ChannelError } from '../errors/ChannelErrors';

const MAX_IVS_BINDING_LENGTH = APP_CONFIG.database.limits.channels.max_ivs_binding_length;

const ivsArnSchema = z.compile(
  z
    .string()
    .max(MAX_IVS_BINDING_LENGTH)
    .regex(/^arn:aws:ivs:[a-z0-9-]+:\d{12}:channel\/[a-zA-Z0-9-]+$/)
);

export class IvsArn {
  private readonly arn: string;

  constructor(arn: string) {
    const normalizedArn = arn.trim();
    if (!ivsArnSchema.validate(normalizedArn)) {
      throw new ChannelError('channel.ivs_arn.invalid');
    }
    this.arn = normalizedArn;
  }

  get value(): string {
    return this.arn;
  }
}
