import { GlobalRole } from '../../domain/entities/GlobalRole';
import { AuthorizationError } from '../../domain/errors/AuthorizationErrors';
import { GlobalRoleRepository } from '../../infrastructure/repository/GlobalRole.repository';

export class CreateGlobalRole {
  constructor(private readonly globalRoleRepository: GlobalRoleRepository) {}

  async execute(globalRole: GlobalRole) {
    const existingGlobalRole = await this.globalRoleRepository.findByName(globalRole.name.value);
    if (existingGlobalRole) {
      throw new AuthorizationError('role.global.already_exists');
    }
    await this.globalRoleRepository.save(globalRole);
  }
}
