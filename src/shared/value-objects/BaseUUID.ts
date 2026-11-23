import { randomUUIDv7 } from 'bun';

import { InvalidUuidError } from '../domain/errors/InvalidUuidError';
import { uuidSchema } from '../scheamas/UUID';

export class BaseUUID {
  constructor(private readonly id: string = randomUUIDv7()) {
    if (!uuidSchema.validate(id)) {
      throw new InvalidUuidError();
    }
  }

  get value(): string {
    return this.id;
  }
}
