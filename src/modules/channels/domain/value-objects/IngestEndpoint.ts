import { z } from 'zod';

import { APP_CONFIG } from '@/config/compilation-time/APP_CONFIG';

import { ChannelError } from '../errors/ChannelErrors';

const MAX_IVS_BINDING_LENGTH = APP_CONFIG.database.limits.channels.max_ivs_binding_length;

const ingestEndpointSchema = z.compile(
  z
    .string()
    .max(MAX_IVS_BINDING_LENGTH)
    .check(z.hostname())
    .regex(/^[a-z0-9.-]+\.[a-z]{2,}$/)
);

export class IngestEndpoint {
  private readonly endpoint: string;

  constructor(endpoint: string) {
    const normalizedEndpoint = endpoint.trim().toLowerCase();
    if (!ingestEndpointSchema.validate(normalizedEndpoint)) {
      throw new ChannelError('channel.ingest_endpoint.invalid');
    }
    this.endpoint = normalizedEndpoint;
  }

  get value(): string {
    return this.endpoint;
  }
}
