import { StreamerRole } from '../../domain/entities/StreamerRole';
import { StreamerRoleId } from '../../domain/value-objects/roles/StreamerRoleId';

export interface IStreamerRoleRepository {
  findById(id: StreamerRoleId): Promise<StreamerRole | null>;
  findByName(name: string): Promise<StreamerRole | null>;
  save(streamerRole: StreamerRole): Promise<void>;
  delete(id: StreamerRoleId): Promise<void>;
}
