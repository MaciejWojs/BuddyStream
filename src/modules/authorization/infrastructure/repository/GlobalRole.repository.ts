import { GlobalRoleMapper } from '@/shared/mappers/GlobalRoleMapper';

import { GlobalRole } from '../../domain/entities/GlobalRole';
import { IGlobalRoleRepository } from '../../domain/repositories/IGlobalRole.repository';
import { GlobalRoleId } from '../../domain/value-objects/roles/GlobalRoleId';
import { GlobalRoleDao } from '../dao/GlobalRole.dao';

export class GlobalRoleRepository implements IGlobalRoleRepository {
  constructor(private readonly globalRoleDao: GlobalRoleDao) {
    this.globalRoleDao = globalRoleDao;
  }

  async delete(id: GlobalRoleId) {
    await this.globalRoleDao.delete(id.value);
  }

  async findById(id: GlobalRoleId) {
    const globalRole = await this.globalRoleDao.findById(id.value);
    return globalRole ? GlobalRoleMapper.toDomain(globalRole) : null;
  }

  async findByName(name: string) {
    const globalRole = await this.globalRoleDao.findByName(name);
    return globalRole ? GlobalRoleMapper.toDomain(globalRole) : null;
  }

  async save(globalRole: GlobalRole) {
    const existingGlobalRole = await this.findById(globalRole.id);
    const globalRolePersistence = GlobalRoleMapper.toPersistence(globalRole);
    if (existingGlobalRole) {
      await this.globalRoleDao.update(globalRolePersistence);
    } else {
      await this.globalRoleDao.create(globalRolePersistence);
    }
  }
}
