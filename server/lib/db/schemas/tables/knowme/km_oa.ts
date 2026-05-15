import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp, date } from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';

export const kmOA = mysqlTable('km_oa', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  callout_date: date('callout_date'),
  ordeal_date: date('ordeal_date'),
  brotherhood_date: date('brotherhood_date'),
  vigil_honor_date: date('vigil_honor_date'),
  beyond_brotherhood_silver_date: date('beyond_brotherhood_silver_date'),
  beyond_brotherhood_gold_date: date('beyond_brotherhood_gold_date'),
  details: text('details'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmOA = InferSelectModel<typeof kmOA>;
