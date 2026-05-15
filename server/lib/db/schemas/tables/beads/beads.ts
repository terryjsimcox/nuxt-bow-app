import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  float,
  int,
  mysqlTable,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { beadType } from './bead_type';
import { itemType } from './item_type';
import { limited } from './limited';

export const beads = mysqlTable('beads', {
  id: int('id').primaryKey().autoincrement(),
  bead_type: int('bead_type')
    .notNull()
    .references(() => beadType.id),
  item_type: int('item_type')
    .notNull()
    .references(() => itemType.id),
  limited: int('limited')
    .notNull()
    .references(() => limited.id),
  size: text('size').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  description_long: text('description_long'),
  source: text('source').notNull(),
  vendor_item_id: text('vendor_item_id'),
  manufacturer: text('manufacturer'),
  brand: text('brand'),
  cost: float('cost', { precision: 15, scale: 2 }),
  starting_inventory: int('starting_inventory'),
  current_inventory: int('current_inventory'),
  alternates: text('alternates'),
  '3D_printed': boolean('3D_printed'),
  contact_name: text('contact_name'),
  contact_email: text('contact_email'),
  picture: text('picture'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Beads = InferSelectModel<typeof beads>;
export type NewBeads = InferInsertModel<typeof beads>;
export type BeadUpdate = Partial<NewBeads> & { id: number };
