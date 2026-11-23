import { StreamerRole } from '../../domain/entities/StreamerRole';
import { AuthorizationError } from '../../domain/errors/AuthorizationErrors';
import { IStreamerRoleRepository } from '../../domain/repositories/IStreamerRole.repository';

export class CreateStreamerRole {
  constructor(private readonly streamerRoleRepository: IStreamerRoleRepository) {}

  async execute(streamerRole: StreamerRole) {
    const existingStreamerRole = await this.streamerRoleRepository.findByName(streamerRole.name.value);
    if (existingStreamerRole) {
      throw new AuthorizationError('role.streamer.already_exists');
    }
    await this.streamerRoleRepository.save(streamerRole);
  }
}
