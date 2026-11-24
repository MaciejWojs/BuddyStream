import { randomUUIDv7 } from 'bun';

import { IUserDao, type UserInsert, type UserSelect } from './IUser.dao';

export class UserDaoTest implements IUserDao {
  private readonly byId = new Map<string, UserSelect>();

  private readonly emails = new Set<string>();

  private readonly rows: UserSelect[] = [];

  private readonly usernames = new Set<string>();

  private copy(row: UserSelect | undefined) {
    return row ? { ...row } : null;
  }

  async create(data: UserInsert) {
    const row = this.materialize(data);
    if (this.byId.has(row.id) || this.usernames.has(row.username) || this.emails.has(row.email)) {
      throw new Error('Failed to create user');
    }

    this.rows.push(row);
    this.byId.set(row.id, row);
    this.usernames.add(row.username);
    this.emails.add(row.email);
    return { ...row };
  }

  async delete(id: string) {
    const current = this.byId.get(id);
    if (!current) {
      return;
    }

    this.rows.splice(this.rows.indexOf(current), 1);
    this.byId.delete(id);
    this.usernames.delete(current.username);
    this.emails.delete(current.email);
  }

  async findByEmail(email: string) {
    if (!this.emails.has(email)) {
      return null;
    }
    return this.copy(this.rows.find((row) => row.email === email));
  }

  async findById(id: string) {
    return this.copy(this.byId.get(id));
  }

  async findByUsername(username: string) {
    if (!this.usernames.has(username)) {
      return null;
    }
    return this.copy(this.rows.find((row) => row.username === username));
  }

  private materialize(data: UserInsert): UserSelect {
    return {
      id: data.id ?? randomUUIDv7(),
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      avatar_key: data.avatar_key ?? null,
      avatar_placeholder: data.avatar_placeholder ?? null,
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? null
    };
  }

  async update(data: UserSelect) {
    const current = this.byId.get(data.id);
    if (!current) {
      throw new Error('Failed to update user');
    }

    const usernameTaken = data.username !== current.username && this.usernames.has(data.username);
    const emailTaken = data.email !== current.email && this.emails.has(data.email);
    if (usernameTaken || emailTaken) {
      throw new Error('Failed to update user');
    }

    this.usernames.delete(current.username);
    this.emails.delete(current.email);
    this.usernames.add(data.username);
    this.emails.add(data.email);

    const next = { ...data };
    this.rows[this.rows.indexOf(current)] = next;
    this.byId.set(next.id, next);
    return { ...next };
  }
}
