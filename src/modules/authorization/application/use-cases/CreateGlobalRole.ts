import { GlobalRole } from '../../domain/entities/GlobalRole';
import { GlobalRoleRepository } from '../../infrastructure/repository/GlobalRole.repository';

export class CreateGlobalRole {
  constructor(private readonly globalRoleRepository: GlobalRoleRepository) {}

  async execute(globalRole: GlobalRole) {
    const existingGlobalRole = await this.globalRoleRepository.findByName(globalRole.name.value);
    if (existingGlobalRole) {
      throw new Error('Global role already exists');
    }
    await this.globalRoleRepository.save(globalRole);
  }
}
