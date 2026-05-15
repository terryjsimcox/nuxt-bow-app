/**
 * Account Merge Rate Limit Table Schema
 * Tracks merge request counts per user per month (max 3/month enforcement)
 */

import { int, mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { user } from '../auth';

export const accountMergeRateLimit = mysqlTable('account_merge_rate_limit', {
  id: int('id').primaryKey().autoincrement(),
  user_id: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id),
  year_month: varchar('year_month', { length: 7 }).notNull(), // 2026-03 format
  merge_count: int('merge_count').notNull().default(0),
  created_at: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type AccountMergeRateLimit = typeof accountMergeRateLimit.$inferSelect;
export type NewAccountMergeRateLimit =
  typeof accountMergeRateLimit.$inferInsert;
