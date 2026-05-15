import {
  bigint,
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import type { InferSelectModel } from 'drizzle-orm';
import { accountMergeRequests } from './account-merge-requests';
import { user } from '../auth/auth-schema';

export const accountMergeAudit = mysqlTable('account_merge_audit', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),

  mergeRequestId: int('merge_request_id')
    .notNull()
    .references(() => accountMergeRequests.id),

  entityType: varchar('entity_type', { length: 50 })
    .notNull()
    .$type<
      | 'scout_profile'
      | 'user'
      | 'unit_membership'
      | 'award'
      | 'approval'
      | 'execution'
      | 'cancellation'
    >(),

  entityId: int('entity_id'),

  action: varchar('action', { length: 50 })
    .notNull()
    .$type<
      | 'created'
      | 'migrated'
      | 'updated'
      | 'deleted'
      | 'locked'
      | 'unlocked'
      | 'approved'
      | 'rejected'
      | 'executed'
      | 'cancelled'
      | 'rolled_back'
      | 'archived'
    >(),

  oldValue: json('old_value'),
  newValue: json('new_value'),

  actionByUserId: varchar('action_by_user_id', { length: 36 })
    .notNull()
    .references(() => user.id),

  actionAt: timestamp('action_at', { fsp: 3 }).defaultNow().notNull(),

  notes: text('notes'),
});

export type AccountMergeAudit = InferSelectModel<typeof accountMergeAudit>;
