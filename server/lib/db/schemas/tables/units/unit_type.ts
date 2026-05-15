import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, text, timestamp, int } from 'drizzle-orm/mysql-core';

export const unitType = mysqlTable('unit_type', {
  id: int().primaryKey().autoincrement(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type UnitType = InferSelectModel<typeof unitType>;
