import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core';
import { scoutType } from '../scouts/scout_type';

export const kmAwards = mysqlTable('km_awards', {
  id: int().primaryKey().autoincrement(),
  name: text('name').notNull(),
  description: text('description'),
  scout_type_id: int('scout_type_id')
    .notNull()
    .references(() => scoutType.id),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmAward = InferSelectModel<typeof kmAwards>;
