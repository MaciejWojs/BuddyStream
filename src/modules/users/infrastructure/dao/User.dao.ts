import { eq } from 'drizzle-orm';

import { DatabaseClient } from '@/infrastructure/db/client';
import { users } from '@/infrastructure/db/schema/users';

import { IUserDao, UserInsert, UserSelect } from './IUser.dao';

export class UserDao implements IUserDao {
  constructor(private readonly db: DatabaseClient) {
    this.db = db;
  }

  async create(data: UserInsert) {
    const [user] = await this.db.insert(users).values(data).returning();
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async delete(id: string) {
    await this.db.delete(users).where(eq(users.id, id));
  }

  async findByEmail(email: string) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user ?? null;
  }

  async findById(id: string) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user ?? null;
  }

  async findByUsername(username: string) {
    const [user] = await this.db.select().from(users).where(eq(users.username, username));
    return user ?? null;
  }

  async update(data: UserSelect) {
    const [user] = await this.db.update(users).set(data).where(eq(users.id, data.id)).returning();
    if (!user) {
      throw new Error('Failed to update user');
    }
    return user;
  }
}
