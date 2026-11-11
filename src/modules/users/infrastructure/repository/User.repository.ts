import { UserMapper } from '@/shared/mappers/UserMapper';

import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUser.repository';
import { Email } from '../../domain/value-objects/Email';
import { UserId } from '../../domain/value-objects/UserId';
import { Username } from '../../domain/value-objects/Username';
import { UserDao } from '../dao/User.dao';

export class UserRepository implements IUserRepository {
  constructor(private readonly userDao: UserDao) {
    this.userDao = userDao;
  }

  async delete(id: UserId) {
    await this.userDao.delete(id.value);
  }

  async findByEmail(email: Email) {
    const user = await this.userDao.findByEmail(email.value);
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: UserId) {
    const user = await this.userDao.findById(id.value);
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: Username) {
    const user = await this.userDao.findByUsername(username.value);
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User) {
    const userPersistence = UserMapper.toPersistence(user);
    await this.userDao.update(userPersistence);
  }
}
