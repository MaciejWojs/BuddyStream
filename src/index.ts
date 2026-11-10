import 'zod/compile';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

showRoutes(app);

export default app;
