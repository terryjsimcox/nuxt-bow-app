import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/lib/db/schema.ts',
  out: './server/lib/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'mydb.sqlite',
  },
});
