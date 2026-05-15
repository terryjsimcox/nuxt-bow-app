import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp, date } from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';
import { kmTrainings } from './km_trainings';

export const kmTraining = mysqlTable('km_training', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  km_trainings_id: int('km_trainings_id')
    .notNull()
    .references(() => kmTrainings.id),
  completion_date: date('completion_date'),
  location: text('location'),
  details: text('details'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmTraining = InferSelectModel<typeof kmTraining>;
