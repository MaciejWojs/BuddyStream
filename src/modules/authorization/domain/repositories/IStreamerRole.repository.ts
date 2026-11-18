import { StreamerRole } from '../entities/StreamerRole';
import { StreamerRoleId } from '../value-objects/roles/StreamerRoleId';

export interface IStreamerRoleRepository {
  findById(id: StreamerRoleId): Promise<StreamerRole | null>;
  findByName(name: string): Promise<StreamerRole | null>;
  create(streamerRole: StreamerRole): Promise<void>;
  update(streamerRole: StreamerRole): Promise<void>;
  delete(id: StreamerRoleId): Promise<void>;
}
