import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const status = sqliteTable('status', {
  id: integer().primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});
