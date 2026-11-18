import { streamerRoles } from '@/infrastructure/db/schema/roles-and-permissions/streamer_roles';

export type StreamerRoleSelect = typeof streamerRoles.$inferSelect;
export type StreamerRoleInsert = typeof streamerRoles.$inferInsert;

export interface IStreamerRoleDao {
  findById(id: string): Promise<StreamerRoleSelect | null>;
  findByName(name: string): Promise<StreamerRoleSelect | null>;
  create(streamerRole: StreamerRoleInsert): Promise<StreamerRoleSelect>;
  update(streamerRole: StreamerRoleSelect): Promise<StreamerRoleSelect>;
  delete(id: string): Promise<void>;
}
