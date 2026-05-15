import type { InferSelectModel } from 'drizzle-orm';
import {
  mysqlTable,
  int,
  text,
  timestamp,
  varchar,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';
import { kmProfile } from './km_profile';

export const kmAuditLogs = mysqlTable('km_audit_logs', {
  id: int().primaryKey().autoincrement(),
  km_profile_id: int('km_profile_id')
    .notNull()
    .references(() => kmProfile.id, { onDelete: 'cascade' }),
  action: mysqlEnum('action', ['CREATE', 'UPDATE', 'DELETE']).notNull(),
  record_type: varchar('record_type', { length: 50 }).notNull(), // profile, award, training, etc.
  record_id: int('record_id').notNull(), // ID of the actual record that changed
  record_name: varchar('record_name', { length: 255 }), // Name or identifying info (award name, training, etc.)
  user_id: varchar('user_id', { length: 255 }).notNull(), // User who made the change
  impersonated_by_user_id: varchar('impersonated_by_user_id', { length: 255 }), // Superadmin if impersonating
  old_values: text('old_values'), // JSON of previous values
  new_values: text('new_values'), // JSON of new values
  changed_fields: text('changed_fields'), // JSON array of field names that changed
  ip_address: varchar('ip_address', { length: 45 }),
  user_agent: text('user_agent'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
});

export type KmAuditLog = InferSelectModel<typeof kmAuditLogs>;
