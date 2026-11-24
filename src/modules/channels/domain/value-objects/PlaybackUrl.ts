import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { ChannelError } from '../errors/ChannelErrors';

const MAX_IVS_BINDING_LENGTH = APP_CONFIG.database.limits.channels.max_ivs_binding_length;

const playbackUrlSchema = z.compile(z.httpUrl().max(MAX_IVS_BINDING_LENGTH));

export class PlaybackUrl {
  private readonly url: string;

  constructor(url: string) {
    const normalizedUrl = url.trim();
    if (!playbackUrlSchema.validate(normalizedUrl)) {
      throw new ChannelError('channel.playback_url.invalid');
    }
    this.url = normalizedUrl;
  }

  get value(): string {
    return this.url;
  }
}
