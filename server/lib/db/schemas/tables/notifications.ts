import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  int,
} from 'drizzle-orm/mysql-core';
import { user } from './auth/auth-schema';
import { relations } from 'drizzle-orm';

export const notifications = mysqlTable('notifications', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'info', 'success', 'warning', 'error'
  category: varchar('category', { length: 50 }), // 'bead', 'scout', 'unit', 'system', etc.
  relatedId: varchar('related_id', { length: 36 }), // ID of related resource (bead, scout, etc.)
  actionUrl: varchar('action_url', { length: 500 }), // Optional link to take action
  isRead: boolean('is_read').default(false).notNull(),
  readAt: timestamp('read_at', { fsp: 3 }),
  priority: int('priority').default(0).notNull(), // Higher number = higher priority
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { fsp: 3 }), // Optional expiration
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id],
  }),
}));

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
