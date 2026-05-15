import {
  date,
  int,
  mysqlTable,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';
import type { InferSelectModel } from 'drizzle-orm';
import { scoutType } from './scout_type';
import { clanCharacter } from './clan_character';

export const scoutProfile = mysqlTable(
  'scout_profile',
  {
    id: int('id').primaryKey().autoincrement(),
    scout_type_id: int('scout_type_id')
      .notNull()
      .references(() => scoutType.id),
    clan_character: int('clan_character').references(() => clanCharacter.id),
    firstname: varchar('firstname', { length: 100 }).notNull(),
    lastname: varchar('lastname', { length: 100 }).notNull(),
    ceremony_date: date('ceremony_date'),
    address: varchar('address', { length: 255 }),
    city: varchar('city', { length: 100 }),
    zipcode: int('zipcode'),
    state: varchar('state', { length: 3 }),
    phone: text('phone'),
    email: text('email').notNull(),
    occupation: varchar('occupation', { length: 150 }),
    employer: varchar('employer', { length: 150 }),
    title: varchar('title', { length: 100 }),
    scouting_of_america_id: int('scouting_of_america_id'),
    status: int('status').notNull().default(3), // 1=active, 2=inactive, 3=pending_approval (merged profiles also use 3 with merged_into_scout_id set)
    merged_into_scout_id: int('merged_into_scout_id'), // If not null, this profile was merged into the referenced scout
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    unique().on(table.firstname, table.lastname),
    unique('firstname_lastname').on(table.firstname, table.lastname),
  ],
);

export type ScoutProfile = InferSelectModel<typeof scoutProfile>;
