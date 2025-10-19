import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// https://www.better-auth.com/docs/installation
const client = createClient({
  // url: 'file:drizzle/sqlite.db',
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export const db = drizzle(client, { schema });
