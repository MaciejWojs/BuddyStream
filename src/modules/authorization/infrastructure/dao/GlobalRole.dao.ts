import { eq } from 'drizzle-orm';

import { DatabaseClient } from '@/infrastructure/db/client';
import { globalRoles } from '@/infrastructure/db/schema/roles-and-permissions/global_roles';

import { GlobalRoleInsert, GlobalRoleSelect, IGlobalRoleDao } from './IGlobalRole.dao';

export class GlobalRoleDao implements IGlobalRoleDao {
  constructor(private readonly db: DatabaseClient) {
    this.db = db;
  }

  async create(newglobalRole: GlobalRoleInsert) {
    const [globalRole] = await this.db.insert(globalRoles).values(newglobalRole).returning();
    if (!globalRole) {
      throw new Error('Failed to create global role');
    }
    return globalRole;
  }

  async delete(id: string) {
    await this.db.delete(globalRoles).where(eq(globalRoles.id, id));
  }

  async findById(id: string) {
    const [globalRole] = await this.db.select().from(globalRoles).where(eq(globalRoles.id, id));
    return globalRole ?? null;
  }

  async findByName(name: string) {
    const [globalRole] = await this.db.select().from(globalRoles).where(eq(globalRoles.name, name));
    return globalRole ?? null;
  }

  async update(globalRole: GlobalRoleSelect) {
    const [updatedGlobalRole] = await this.db
      .update(globalRoles)
      .set(globalRole)
      .where(eq(globalRoles.id, globalRole.id))
      .returning();
    if (!updatedGlobalRole) {
      throw new Error('Failed to update global role');
    }
    return updatedGlobalRole;
  }
}
