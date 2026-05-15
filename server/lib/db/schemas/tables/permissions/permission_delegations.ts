import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';
import { user } from '../auth/auth-schema';
import { permissionRules } from './permission_rules';

export const permissionDelegations = mysqlTable('permission_delegations', {
  id: int('id').primaryKey().autoincrement(),

  // Who is granting the permission (leader)
  grantorUserId: varchar('grantor_user_id', { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  // Who is receiving the permission (scouter)
  granteeUserId: varchar('grantee_user_id', { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  // Which permission rule is being delegated
  permissionRuleId: int('permission_rule_id')
    .notNull()
    .references(() => permissionRules.id, { onDelete: 'cascade' }),

  // Whether the delegation is currently active
  active: boolean('active').notNull().default(true),

  // Optional: Scope/context for the delegation (e.g., specific unit, event, etc.)
  scope: varchar('scope', { length: 255 }),

  // Notes about why this permission was delegated
  notes: varchar('notes', { length: 500 }),

  // When the delegation was granted
  grantedAt: timestamp('granted_at').notNull().defaultNow(),

  // Optional: When the delegation expires (null = no expiration)
  expiresAt: timestamp('expires_at'),

  // Standard timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
