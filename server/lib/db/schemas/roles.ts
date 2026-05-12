import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from 'drizzle-orm';
import { status } from './status';

export const roles = sqliteTable('role', {
  id: integer().primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export type Roles = InferSelectModel<typeof roles>;
