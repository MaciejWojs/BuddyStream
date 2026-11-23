import { randomUUIDv7 } from 'bun';

import { IdError } from '../domain/errors/IdError';
import { uuidSchema } from '../scheamas/UUID';

export class BaseUUID {
  constructor(private readonly id: string = randomUUIDv7()) {
    if (!uuidSchema.validate(id)) {
      throw new IdError('id.invalid');
    }
  }

  get value(): string {
    return this.id;
  }
}
