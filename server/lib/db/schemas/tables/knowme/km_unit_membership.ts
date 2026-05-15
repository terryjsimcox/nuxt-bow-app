import type { InferSelectModel } from 'drizzle-orm';
import {
  date,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';
import { units } from '../units/units';
import { user } from '../auth/auth-schema';

export const kmUnitMembership = mysqlTable('km_unit_membership', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id),
  unit_id: int('unit_id')
    .notNull()
    .references(() => units.id),
  is_primary: int('is_primary').notNull().default(0),
  joined_at: date('joined_at'),
  left_at: date('left_at'),
  verification_status: int('verification_status').notNull().default(1), // 1=SELF_REPORTED, 2=VERIFIED, 3=REJECTED
  verified_by_user_id: varchar('verified_by_user_id', {
    length: 36,
  }).references(() => user.id),
  verified_at: timestamp('verified_at', { fsp: 3 }),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type KmUnitMembership = InferSelectModel<typeof kmUnitMembership>;
