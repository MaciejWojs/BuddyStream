import { StreamerRoleMapper } from '@/shared/mappers/StreamerRoleMapper';

import { StreamerRole } from '../../domain/entities/StreamerRole';
import { AuthorizationError } from '../../domain/errors/AuthorizationErrors';
import { IStreamerRoleRepository } from '../../domain/repositories/IStreamerRole.repository';
import { StreamerRoleId } from '../../domain/value-objects/roles/StreamerRoleId';
import { StreamerRoleDao } from '../dao/StreamerRole.dao';

export class StreamerRoleRepository implements IStreamerRoleRepository {
  constructor(private readonly streamerRoleDao: StreamerRoleDao) {}

  async delete(id: StreamerRoleId) {
    await this.streamerRoleDao.delete(id.value);
  }

  async findById(id: StreamerRoleId) {
    const streamerRole = await this.streamerRoleDao.findById(id.value);
    if (!streamerRole) {
      return null;
    }
    return StreamerRoleMapper.toDomain(streamerRole);
  }

  async findByName(name: string) {
    const streamerRole = await this.streamerRoleDao.findByName(name);
    if (!streamerRole) {
      return null;
    }
    return StreamerRoleMapper.toDomain(streamerRole);
  }

  async save(streamerRole: StreamerRole) {
    const existingStreamerRole = await this.findByName(streamerRole.name.value);
    if (existingStreamerRole) {
      throw new AuthorizationError('role.streamer.already_exists');
    }
    const streamerRolePersistence = StreamerRoleMapper.toPersistence(streamerRole);
    await this.streamerRoleDao.create(streamerRolePersistence);
  }
}
