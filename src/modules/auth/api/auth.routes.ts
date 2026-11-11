import { OpenAPIHono } from '@hono/zod-openapi';

import { db } from '@/infrastructure/db/client';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Password } from '@/modules/users/domain/value-objects/Passord';
import { Username } from '@/modules/users/domain/value-objects/Username';
import { UserDao } from '@/modules/users/infrastructure/dao/User.dao';
import { UserRepository } from '@/modules/users/infrastructure/repository/User.repository';

import { RegisterUser } from '../application/use-cases/RegisterUser';
import { meRoute } from './openapi/me';
import { registerRoute } from './openapi/register';

const authRouter = new OpenAPIHono();

authRouter.openapi(meRoute, (c) => {
  return c.json(
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'john_doe',
      email: 'john.doe@example.com',
      avatar_key: 'a1b2c3d4e5f6g7h8i9j0',
      avatar_placeholder: 'https://example.com/avatar.png',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    200
  );
});

authRouter.openapi(registerRoute, async (c) => {
  const { username, email, password } = c.req.valid('json');
  try {
    const passwordHash = await Password.create(password);
    const userDao = new UserDao(db);
    const userRepository = new UserRepository(userDao);
    const command = new RegisterUser(userRepository);
    await command.execute(new Email(email), passwordHash, new Username(username));
    return c.json(
      {
        message: 'User registered successfully'
      },
      200
    );
  } catch (error) {
    return c.json({ message: 'Internal Server Error' as const }, 500);
  }
});

export default authRouter;
