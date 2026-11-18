import { StreamerRole } from '../../domain/entities/StreamerRole';
import { IStreamerRoleRepository } from '../../domain/repositories/IStreamerRole.repository';

export class CreateStreamerRole {
  constructor(private readonly streamerRoleRepository: IStreamerRoleRepository) {}

  async execute(streamerRole: StreamerRole) {
    const existingStreamerRole = await this.streamerRoleRepository.findByName(streamerRole.name.value);
    if (existingStreamerRole) {
      throw new Error('Streamer role already exists');
    }
    await this.streamerRoleRepository.save(streamerRole);
  }
}
