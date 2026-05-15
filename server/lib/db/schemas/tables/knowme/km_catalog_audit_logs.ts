import type { InferSelectModel } from 'drizzle-orm';
import {
  mysqlTable,
  int,
  text,
  timestamp,
  varchar,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

export const kmCatalogAuditLogs = mysqlTable('km_catalog_audit_logs', {
  id: int().primaryKey().autoincrement(),
  catalog_table: varchar('catalog_table', { length: 50 }).notNull(),
  action: mysqlEnum('action', ['CREATE', 'UPDATE', 'DELETE']).notNull(),
  record_id: int('record_id').notNull(),
  record_name: varchar('record_name', { length: 255 }),
  user_id: varchar('user_id', { length: 255 }).notNull(),
  old_values: text('old_values'),
  new_values: text('new_values'),
  changed_fields: text('changed_fields'),
  ip_address: varchar('ip_address', { length: 45 }),
  user_agent: text('user_agent'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
});

export type KmCatalogAuditLog = InferSelectModel<typeof kmCatalogAuditLogs>;
