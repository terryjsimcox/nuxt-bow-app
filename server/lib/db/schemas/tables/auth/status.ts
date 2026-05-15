import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, text, timestamp, int } from 'drizzle-orm/mysql-core';

export const status = mysqlTable('status', {
  id: int().primaryKey().autoincrement(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Status = InferSelectModel<typeof status>;
