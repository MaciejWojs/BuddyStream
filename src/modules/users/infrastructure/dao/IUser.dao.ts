import { users } from '@/infrastructure/db/schema/users';

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export interface IUserDao {
  findById(id: string): Promise<UserSelect | null>;
  findByUsername(username: string): Promise<UserSelect | null>;
  findByEmail(email: string): Promise<UserSelect | null>;
  create(user: UserInsert): Promise<UserSelect>;
  update(user: UserSelect): Promise<UserSelect>;
  delete(id: string): Promise<void>;
}
