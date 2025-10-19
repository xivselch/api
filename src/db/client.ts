import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// https://www.better-auth.com/docs/installation
const client = createClient({
  url: import.meta.env.PROD
    ? import.meta.env.TURSO_DATABASE_URL
    : 'file:drizzle/sqlite.db',
  ...(import.meta.env.PROD && import.meta.env.TURSO_AUTH_TOKEN
    ? { authToken: import.meta.env.TURSO_AUTH_TOKEN }
    : {}),
});

export const db = drizzle(client, { schema });
