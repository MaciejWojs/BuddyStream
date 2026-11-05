import { randomUUIDv7 } from 'bun';
import { z } from 'zod';

export class BaseUUID {
  constructor(private id: string = randomUUIDv7()) {
    const res = z.uuid().safeParse(id);
    if (!res.success) {
      throw new Error('Invalid UUID');
    }
  }

  get value(): string {
    return this.id;
  }
}
