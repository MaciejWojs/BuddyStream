import 'zod/compile';

import { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { showRoutes } from 'hono/dev';

import { APP_CONFIG } from './config/compilation-time/APP_CONFIG';
import authRouter from './modules/auth/api/auth.routes';
import { injectJwtPayload } from './shared/api/middleware/injectJwtPayload';
const app = new OpenAPIHono().basePath('/api/v1');

app.use('*', injectJwtPayload);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.openAPIRegistry.registerComponent('securitySchemes', 'AuthorizationBearer', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  in: 'header'
});

app.openAPIRegistry.registerComponent('securitySchemes', 'RefreshTokenCookie', {
  type: 'apiKey',
  in: 'cookie',
  name: 'refreshToken',
  bearerFormat: 'JWT'
});

app.doc('/docs', (_c) => ({
  openapi: '3.0.0',
  info: {
    version: APP_CONFIG.core.appVersion,
    title: APP_CONFIG.core.appName,
    description: APP_CONFIG.core.appDescription
  }
}));
app.get(
  '/docs/scalar',
  Scalar({
    url: '/api/v1/docs',
    layout: 'classic',
    defaultOpenAllTags: true,
    theme: 'bluePlanet'
  })
);

app.route('/auth', authRouter);

showRoutes(app);

export default app;
