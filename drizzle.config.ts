import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/db/schema/index.ts'],
  dialect: 'sqlite',
  out: './drizzle',
  dbCredentials: {
    // url: 'file:drizzle/sqlite.db',
    url: process.env.TURSO_DATABASE_URL as string,
    token: process.env.TURSO_AUTH_TOKEN as string,
  },
});
