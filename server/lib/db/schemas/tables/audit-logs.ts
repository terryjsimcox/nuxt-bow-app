import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  json,
} from 'drizzle-orm/mysql-core';
import { user } from './auth/auth-schema';
import { relations } from 'drizzle-orm';

export const auditLogs = mysqlTable('audit_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).references(() => user.id, {
    onDelete: 'set null',
  }),
  userName: varchar('user_name', { length: 255 }), // Denormalized for history
  userEmail: varchar('user_email', { length: 255 }), // Denormalized for history
  action: varchar('action', { length: 50 }).notNull(), // 'create', 'update', 'delete'
  resource: varchar('resource', { length: 100 }).notNull(), // 'bead', 'scout', 'unit', 'permission', etc.
  resourceId: varchar('resource_id', { length: 36 }), // ID of the affected resource
  resourceName: varchar('resource_name', { length: 255 }), // Name/title for display
  changes: json('changes'), // JSON object with before/after values
  metadata: json('metadata'), // Additional context (IP, user agent, etc.)
  description: text('description'), // Human-readable description
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
});

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(user, {
    fields: [auditLogs.userId],
    references: [user.id],
  }),
}));

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
