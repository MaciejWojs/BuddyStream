import { StreamerRole } from '../../domain/entities/StreamerRole';
import { StreamerRoleAlreadyExistsError } from '../../domain/errors/AuthorizationErrors';
import { IStreamerRoleRepository } from '../../domain/repositories/IStreamerRole.repository';

export class CreateStreamerRole {
  constructor(private readonly streamerRoleRepository: IStreamerRoleRepository) {}

  async execute(streamerRole: StreamerRole) {
    const existingStreamerRole = await this.streamerRoleRepository.findByName(streamerRole.name.value);
    if (existingStreamerRole) {
      throw new StreamerRoleAlreadyExistsError();
    }
    await this.streamerRoleRepository.save(streamerRole);
  }
}
