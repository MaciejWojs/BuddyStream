import { OpenAPIHono } from '@hono/zod-openapi';

import { meRoute } from './openapi/me';

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

export default authRouter;
