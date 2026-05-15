import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, int, text, timestamp, date } from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';
import { staffingRoles } from '../units/staffing_roles';

export const kmStaffingRoles = mysqlTable('km_staffing_roles', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  staffing_role_id: int('staffing_role_id').references(() => staffingRoles.id),
  staffing_role_name: text('staffing_role_name'), // For external/historical roles
  start_year: int('start_year'),
  end_year: int('end_year'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  event_location: text('event_location'),
  camp_name: text('camp_name'),
  details: text('details'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmStaffingRole = InferSelectModel<typeof kmStaffingRoles>;
