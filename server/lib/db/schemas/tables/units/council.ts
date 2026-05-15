import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const council = mysqlTable('council', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar({ length: 100 }).notNull(),
  number: int('number').notNull(),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Council = typeof council.$inferSelect;
