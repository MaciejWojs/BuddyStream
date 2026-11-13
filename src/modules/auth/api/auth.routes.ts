import { OpenAPIHono } from '@hono/zod-openapi';
import { deleteCookie, setCookie } from 'hono/cookie';

import { db } from '@/infrastructure/db/client';
import { GetUserInformation } from '@/modules/users/application/GetUserInformation';
import { Email } from '@/modules/users/domain/value-objects/Email';
import { Password } from '@/modules/users/domain/value-objects/Passord';
import { UserId } from '@/modules/users/domain/value-objects/UserId';
import { Username } from '@/modules/users/domain/value-objects/Username';
import { UserDao } from '@/modules/users/infrastructure/dao/User.dao';
import { UserRepository } from '@/modules/users/infrastructure/repository/User.repository';
import { ENV } from '@/shared/types/HonoENV';

import { LoginUser } from '../application/use-cases/LoginUser';
import { LogoutUser } from '../application/use-cases/LogoutUser';
import { RegisterUser } from '../application/use-cases/RegisterUser';
import { RefreshTokenHash } from '../domain/value-objects/RefreshTokenHash';
import { RefreshTokenDao } from '../infrastructure/dao/RefreshToken.dao';
import { RefreshTokenRepository } from '../infrastructure/repository/RefreshToken.repository';
import { loginRoute } from './openapi/login';
import { logoutRoute } from './openapi/logout';
import { meRoute } from './openapi/me';
import { registerRoute } from './openapi/register';

const authRouter = new OpenAPIHono<ENV>();

authRouter.openapi(meRoute, async (c) => {
  const jwtPayload = c.get('jwt-payload');
  if (!jwtPayload) {
    return c.json({ message: 'Unauthorized' as const }, 401);
  }
  try {
    const userId = new UserId(jwtPayload.sub);
    const userDao = new UserDao(db);
    const userRepository = new UserRepository(userDao);
    const command = new GetUserInformation(userRepository);
    const user = await command.execute(userId);

    return c.json(
      {
        id: user.userId.value,
        username: user.username.value,
        email: user.email.value,
        avatar_key: user.avatarKey,
        avatar_placeholder: user.avatarPlaceholder,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Internal Server Error' as const }, 500);
  }
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
    console.error(error);
    return c.json({ message: 'Internal Server Error' as const }, 500);
  }
});

authRouter.openapi(loginRoute, async (c) => {
  const { email, password } = c.req.valid('json');
  try {
    const userDao = new UserDao(db);
    const userRepository = new UserRepository(userDao);
    const refreshTokenDao = new RefreshTokenDao(db);
    const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDao);
    const command = new LoginUser(userRepository, refreshTokenRepository);
    const { accessToken, refreshToken, refreshExpiresAt } = await command.execute(new Email(email), password);
    setCookie(c, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      expires: refreshExpiresAt,
      path: '/'
    });
    return c.json(
      {
        message: 'User logged in successfully',
        accessToken
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Internal Server Error' as const }, 500);
  }
});

authRouter.openapi(logoutRoute, async (c) => {
  const { refreshToken } = c.req.valid('cookie');
  const refreshTokenHash = RefreshTokenHash.create(refreshToken);
  try {
    const jwtPayload = c.get('jwt-payload');
    if (!jwtPayload) {
      return c.json({ message: 'Unauthorized' as const }, 401);
    }
    const userId = new UserId(jwtPayload.sub);
    const refreshTokenDao = new RefreshTokenDao(db);
    const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDao);
    const command = new LogoutUser(refreshTokenRepository);
    await command.execute(userId, refreshTokenHash);
    deleteCookie(c, 'refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/'
    });
    return c.json({ message: 'User logged out successfully' as const }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Internal Server Error' as const }, 500);
  }
});

export default authRouter;
