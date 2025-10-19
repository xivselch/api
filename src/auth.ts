import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { apiKey } from 'better-auth/plugins';
import { db } from '~/db/client';

export const auth = betterAuth({
  secret: import.meta.env.BETTER_AUTH_SECRET,
  baseURL: import.meta.env.BETTER_AUTH_URL || 
    (import.meta.env.PROD ? 'https://api.emetselch.xyz' : 'http://localhost:4321'),
  database: drizzleAdapter(db, { provider: 'sqlite' }),
  plugins: [
    apiKey({
      enableSessionForAPIKeys: true,
      rateLimit: {
        enabled: true,
        timeWindow: 1000 * 30, // 30 seconds
        maxRequests: 100, // 100/30 = 3.33
      },
    }),
  ],
  advanced: {
    ipAddress: {
      ipAddressHeaders: ['cf-connecting-ip', "x-forwarded-for"], // cloudflare, nginx, etc.
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
  user: {
    deleteUser: { enabled: true },
    additionalFields: {
      username: { type: 'string' },
      characterIds: { type: 'string[]', defaultValue: [], input: false },
    },
  },
  socialProviders: {
    discord: {
      enabled: true,
      clientId: import.meta.env.DISCORD_CLIENT_ID as string,
      clientSecret: import.meta.env.DISCORD_CLIENT_SECRET as string,
      scope: ['identify', 'guilds', 'email'],
      // prompt: "consent", // only to be used in production
      mapProfileToUser: async profile => profile,
      disableDefaultScope: true,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
