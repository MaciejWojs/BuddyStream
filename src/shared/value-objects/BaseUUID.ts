import { randomUUIDv7 } from 'bun';
import 'zod/compile';
import { z } from 'zod';

export class BaseUUID {
  constructor(private readonly id: string = randomUUIDv7()) {
    const res = z.uuid();
    if (!res.validate(id)) {
      throw new Error('Invalid UUID');
    }
  }

  get value(): string {
    return this.id;
  }
}
