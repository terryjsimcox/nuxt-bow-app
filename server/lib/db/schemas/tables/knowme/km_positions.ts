import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp, date } from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';
import { kmPositionList } from '../units/km_position_list';
import { units } from '../units/units';
import { district } from '../units/district';
import { council } from '../units/council';

export const kmPositions = mysqlTable('km_positions', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  position_id: int('position_id').references(() => kmPositionList.id),
  position_name: text('position_name'), // For external/historical positions
  unit_id: int('unit_id').references(() => units.id),
  district_id: int('district_id').references(() => district.id),
  council_id: int('council_id').references(() => council.id),
  organization_name: text('organization_name'), // For positions held outside Branches
  start_year: int('start_year'),
  end_year: int('end_year'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  city: text('city'),
  state: text('state'),
  details: text('details'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmPosition = InferSelectModel<typeof kmPositions>;
