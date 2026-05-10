import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

export const useDB = () => {
  if (!db) {
    const config = useRuntimeConfig();
    const sqlite = new Database(config.dbPath);
    db = drizzle({ client: sqlite, schema });
  }

  return db;
};
