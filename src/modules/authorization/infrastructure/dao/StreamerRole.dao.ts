import { eq } from 'drizzle-orm';

import { DatabaseClient } from '@/infrastructure/db/client';
import { streamerRoles } from '@/infrastructure/db/schema/roles-and-permissions/streamer_roles';

import { IStreamerRoleDao, StreamerRoleInsert, StreamerRoleSelect } from './IStreamerRole.dao';

export class StreamerRoleDao implements IStreamerRoleDao {
  constructor(private readonly db: DatabaseClient) {
    this.db = db;
  }

  async create(newStreamerRole: StreamerRoleInsert) {
    const [streamerRole] = await this.db.insert(streamerRoles).values(newStreamerRole).returning();
    if (!streamerRole) {
      throw new Error('Failed to create streamer role');
    }
    return streamerRole;
  }

  async delete(id: string) {
    await this.db.delete(streamerRoles).where(eq(streamerRoles.id, id));
  }

  async findById(id: string) {
    const [streamerRole] = await this.db.select().from(streamerRoles).where(eq(streamerRoles.id, id));
    return streamerRole ?? null;
  }

  async findByName(name: string) {
    const [streamerRole] = await this.db.select().from(streamerRoles).where(eq(streamerRoles.name, name));
    return streamerRole ?? null;
  }

  async update(streamerRole: StreamerRoleSelect) {
    const [updatedStreamerRole] = await this.db
      .update(streamerRoles)
      .set(streamerRole)
      .where(eq(streamerRoles.id, streamerRole.id))
      .returning();
    if (!updatedStreamerRole) {
      throw new Error('Failed to update streamer role');
    }
    return updatedStreamerRole;
  }
}
