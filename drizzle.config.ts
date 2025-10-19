import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/db/schema/index.ts'],
  dialect: 'sqlite',
  out: './drizzle',
  dbCredentials: {
    // url: 'file:drizzle/sqlite.db',
    url: import.meta.env.TURSO_DATABASE_URL,
    token: import.meta.env.TURSO_AUTH_TOKEN,
  },
});
