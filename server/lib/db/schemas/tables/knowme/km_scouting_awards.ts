import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp, date } from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';
import { kmAwards } from './km_awards';

export const kmScoutingAwards = mysqlTable('km_scouting_awards', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  km_award_id: int('km_award_id').references(() => kmAwards.id),
  award_type: text('award_type'), // e.g., 'Eagle Scout', 'Scoutmaster Award', etc. (for legacy/custom awards)
  award_year: int('award_year'),
  award_date: date('award_date'),
  details: text('details'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmScoutingAward = InferSelectModel<typeof kmScoutingAwards>;
