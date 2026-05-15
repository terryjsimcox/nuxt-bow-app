import type { InferSelectModel } from 'drizzle-orm';
import { date, mysqlTable, timestamp, int } from 'drizzle-orm/mysql-core';
import { scoutProfile } from '../scouts/scout_profile';
import { units } from './units';

export const unitMembership = mysqlTable('unit_membership', {
  id: int().primaryKey().autoincrement(),
  scout_id: int('scout_id')
    .notNull()
    .references(() => scoutProfile.id),
  unit_id: int('unit_id')
    .notNull()
    .references(() => units.id),
  is_primary: int('is_primary').notNull().default(0),
  joined_at: date('joined_at'),
  left_at: date('left_at'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type UnitMembership = InferSelectModel<typeof unitMembership>;
