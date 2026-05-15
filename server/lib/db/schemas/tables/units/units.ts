import {
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { district } from './district';
import { unitType } from './unit_type';
import { clanCharacter } from '../scouts/clan_character';
import { beads } from '../beads/beads';

export const units = mysqlTable('units', {
  id: int('id').primaryKey().autoincrement(),
  district_id: int('district_id')
    .notNull()
    .references(() => district.id),
  unit_type_id: int('unit_type')
    .notNull()
    .references(() => unitType.id),
  cordage_id: int('cordage_id')
    .notNull()
    .references(() => beads.id),
  clan_character_id: int('clan_character_id')
    .notNull()
    .references(() => clanCharacter.id),
  clan_colors: text('clan_colors'),
  number: varchar('number', { length: 10 }).notNull(),
  unit_leader: varchar('unit_leader', { length: 50 }),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Units = typeof units.$inferSelect;
