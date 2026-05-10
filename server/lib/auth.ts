import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(
    drizzle({
      client: new Database('mydb.sqlite'),
      schema,
    }),
    {
      provider: 'sqlite',
    }
  ),
  emailAndPassword: {
    enabled: true,
  },
  // Optional: Add social providers
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  // },
});
