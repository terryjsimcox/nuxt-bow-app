import {
  date,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { scoutProfile } from '../scouts/scout_profile';
import { beads } from './beads';

export const awardsEarned = mysqlTable('beads_awarded', {
  id: serial('id').primaryKey(),
  scout_id: int('scout_id')
    .notNull()
    .references(() => scoutProfile.id),
  bead_id: int('bead_id')
    .notNull()
    .references(() => beads.id),
  awarded_at: date('awarded_at').notNull(),
  event: varchar('event', { length: 255 }),
  quantity: int('quantity').notNull().default(1),
  notes: text('notes'),
  date_earned: date('date_earned').notNull(),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type AwardEarned = typeof awardsEarned.$inferSelect;
export type NewAwardEarned = typeof awardsEarned.$inferInsert;
