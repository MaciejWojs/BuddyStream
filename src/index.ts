import 'zod/compile';
import { showRoutes } from 'hono/dev';
import { OpenAPIHono } from '@hono/zod-openapi';
const app = new OpenAPIHono().basePath('/api/v1');

app.get('/', (c) => {
  return c.text('Hello Hono!');
});


showRoutes(app);

export default app;
