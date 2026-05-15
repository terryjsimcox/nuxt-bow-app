import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp, date } from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';
import { kmExperience } from '../units/km_experience';

export const kmExperiences = mysqlTable('km_experiences', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  experience_id: int('experience_id').references(() => kmExperience.id),
  experience_name: text('experience_name'), // For external/historical experiences
  year_attended: int('year_attended'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  location: text('location'),
  camp_type: text('camp_type'), // e.g., 'National Jamboree', 'High Adventure', 'Horse Camp', etc.
  details: text('details'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmExperience = InferSelectModel<typeof kmExperiences>;
