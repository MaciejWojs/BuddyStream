import { User } from '@/modules/users/domain/entities/User';
import { IUserRepository } from '@/modules/users/domain/repositories/IUser.repository';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Password } from '@/modules/users/domain/value-objects/Passord';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { Username } from '@/modules/users/domain/value-objects/Username';

export class RegisterUser {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: Email, password: Password, username: Username): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUser = new User(new UserId(), username, email, password, null, null, new Date(), new Date());
    await this.userRepository.save(newUser);
    return newUser;
  }
}
