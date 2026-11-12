import { User } from '../domain/entities/User';
import { IUserRepository } from '../domain/repositories/IUser.repository';
import { UserId } from '../domain/value-objects/UserId';

export class GetUserInformation {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: UserId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
