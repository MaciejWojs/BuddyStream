import { GlobalRole } from '../../domain/entities/GlobalRole';
import { StreamerRole } from '../../domain/entities/StreamerRole';
import { GlobalRoleId } from '../../domain/value-objects/roles/GlobalRoleId';
import { RoleCode } from '../../domain/value-objects/roles/shared/RoleCode';
import { RoleDescription } from '../../domain/value-objects/roles/shared/RoleDescription';
import { RoleName } from '../../domain/value-objects/roles/shared/RoleName';
import { StreamerRoleId } from '../../domain/value-objects/roles/StreamerRoleId';
import { CreateGlobalRole } from '../use-cases/CreateGlobalRole';
import { CreateStreamerRole } from '../use-cases/CreateStreamerRole';

export class AuthorizationSeed {
  constructor(
    private readonly createGlobalRole: CreateGlobalRole,
    private readonly createStreamerRole: CreateStreamerRole
  ) {}

  private async createGlobal(name: string, code: string, description: string) {
    try {
      await this.createGlobalRole.execute(
        new GlobalRole(
          new GlobalRoleId(),
          new RoleName(name),
          new RoleCode(code),
          new RoleDescription(description),
          new Date(),
          null
        )
      );
    } catch (error) {
      this.ignoreExisting(error, 'Global role already exists');
    }
  }

  private async createStreamer(name: string, code: string, description: string) {
    try {
      await this.createStreamerRole.execute(
        new StreamerRole(
          new StreamerRoleId(),
          new RoleName(name),
          new RoleCode(code),
          new RoleDescription(description),
          new Date(),
          null
        )
      );
    } catch (error) {
      this.ignoreExisting(error, 'Streamer role already exists');
    }
  }

  async execute() {
    await this.createGlobal('user', 'platform_user', 'Konto platformy. Z tą rolą użytkownik nadaje.');
    await this.createGlobal('admin', 'platform_admin', 'Administrator platformy.');
    await this.createStreamer('moderator', 'moderator', 'Moderator kanału.');
  }

  private ignoreExisting(error: unknown, alreadyExistsMessage: string) {
    if (error instanceof Error && error.message === alreadyExistsMessage) {
      return;
    }
    throw error;
  }
}
