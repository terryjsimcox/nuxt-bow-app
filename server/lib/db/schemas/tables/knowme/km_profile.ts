import type { InferSelectModel } from 'drizzle-orm';
import {
  mysqlTable,
  int,
  text,
  timestamp,
  boolean,
  date,
  varchar,
} from 'drizzle-orm/mysql-core';
import { scoutProfile } from '../scouts/scout_profile';

export const kmProfile = mysqlTable('km_profile', {
  id: int().primaryKey().autoincrement(),
  scout_profile_id: int('scout_profile_id').references(() => scoutProfile.id),
  firstname: varchar('firstname', { length: 100 }),
  lastname: varchar('lastname', { length: 100 }),
  email: text('email'),
  date_of_birth: date('date_of_birth'),
  form_type: text('form_type').notNull(), // 'adult' or 'youth'
  registration_date: date('registration_date'),
  registration_expires: date('registration_expires'),
  address: varchar('address', { length: 255 }),
  city: varchar('city', { length: 100 }),
  zipcode: int('zipcode'),
  state: varchar('state', { length: 3 }),
  phone: text('phone'),
  occupation: varchar('occupation', { length: 150 }),
  employer: varchar('employer', { length: 150 }),
  title: varchar('title', { length: 100 }),
  scouting_of_america_id: int('scouting_of_america_id'),
  status: int('status').notNull().default(1),
  merged_into_scout_id: int('merged_into_scout_id').references(
    () => scoutProfile.id,
  ),
  is_branches_member: boolean('is_branches_member').default(false).notNull(),
  noteworthy_service: text('noteworthy_service'),
  profile_picture: text('profile_picture'), // Base64 encoded image
  profile_picture_mime_type: text('profile_picture_mime_type'), // e.g., 'image/jpeg'
  profile_picture_updated_at: timestamp('profile_picture_updated_at', {
    fsp: 3,
  }),
  is_complete: boolean('is_complete').default(false).notNull(),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmProfile = InferSelectModel<typeof kmProfile>;
