import { varchar, timestamp, text, mysqlTable } from 'drizzle-orm/mysql-core';
import { user, session } from './auth-schema';

export const sessionActivity = mysqlTable('session_activity', {
  id: varchar('id', { length: 36 }).primaryKey(),
  sessionId: varchar('session_id', { length: 36 })
    .notNull()
    .references(() => session.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  source: varchar('source', { length: 20 }).notNull(),
  eventType: varchar('event_type', { length: 20 }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
});
