import { randomUUIDv7 } from 'bun';

import { uuidSchema } from '../scheamas/UUID';

export class BaseUUID {
  constructor(private readonly id: string = randomUUIDv7()) {
    if (!uuidSchema.validate(id)) {
      throw new Error('Invalid UUID');
    }
  }

  get value(): string {
    return this.id;
  }
}
