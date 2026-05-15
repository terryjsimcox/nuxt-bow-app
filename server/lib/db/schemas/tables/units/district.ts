import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { council } from './council';

export const district = mysqlTable('district', {
  id: int('id').primaryKey().autoincrement(),
  council_id: int('council_id')
    .notNull()
    .references(() => council.id),
  name: varchar({ length: 100 }).notNull(),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type District = typeof district.$inferSelect;
