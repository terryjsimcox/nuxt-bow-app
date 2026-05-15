import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, text, timestamp, int, date } from 'drizzle-orm/mysql-core';

export const events = mysqlTable('events', {
  id: int().primaryKey().autoincrement(),
  name: text('name').notNull(),
  description: text('description'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  location: text('location'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Event = InferSelectModel<typeof events>;
