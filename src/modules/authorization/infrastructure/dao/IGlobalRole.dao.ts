import { globalRoles } from '@/infrastructure/db/schema/roles-and-permissions/global_roles';

export type GlobalRoleSelect = typeof globalRoles.$inferSelect;
export type GlobalRoleInsert = typeof globalRoles.$inferInsert;

export interface IGlobalRoleDao {
  findById(id: string): Promise<GlobalRoleSelect | null>;
  findByName(name: string): Promise<GlobalRoleSelect | null>;
  create(globalRole: GlobalRoleInsert): Promise<GlobalRoleSelect>;
  update(globalRole: GlobalRoleSelect): Promise<GlobalRoleSelect>;
  delete(id: string): Promise<void>;
}
