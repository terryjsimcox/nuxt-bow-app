import {
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import type { InferSelectModel } from 'drizzle-orm';
import { scoutProfile } from '../scouts/scout_profile';
import { user } from '../auth/auth-schema';
import { units } from '../units/units';

export const accountMergeRequests = mysqlTable('account_merge_requests', {
  id: int('id').primaryKey().autoincrement(),

  // Accounts being merged
  primaryScoutId: int('primary_scout_id')
    .notNull()
    .references(() => scoutProfile.id),
  secondaryScoutId: int('secondary_scout_id')
    .notNull()
    .references(() => scoutProfile.id),

  // Initiator
  createdByUserId: varchar('created_by_user_id', { length: 36 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),

  // Primary unit for approval routing
  primaryUnitId: int('primary_unit_id')
    .notNull()
    .references(() => units.id),

  // Approval path
  approvalPath: varchar('approval_path', { length: 50 })
    .notNull()
    .$type<
      'UNIT_LEADER_FINAL' | 'UNIT_THEN_COMMISSIONER' | 'DIRECT_TO_COMMISSIONER'
    >(),

  // Current status
  status: varchar('status', { length: 50 })
    .notNull()
    .default('pending_unit_approval')
    .$type<
      | 'pending_unit_approval'
      | 'unit_approved'
      | 'pending_commissioner_approval'
      | 'ready_to_execute'
      | 'executing'
      | 'completed'
      | 'cancelled_by_initiator'
      | 'cancelled_by_unit_leader'
      | 'cancelled_by_commissioner'
      | 'rejected'
    >(),

  // Unit leader approval (if applicable)
  unitLeaderApprovalUserId: varchar('unit_leader_approval_user_id', {
    length: 36,
  })
    .references(() => user.id)
    .notNull()
    .default(''),
  unitLeaderApprovedAt: timestamp('unit_leader_approved_at', {
    fsp: 3,
  }),
  unitLeaderNotes: text('unit_leader_notes'),

  // Commissioner approval (if applicable)
  commissionerApprovalUserId: varchar('commissioner_approval_user_id', {
    length: 36,
  })
    .references(() => user.id)
    .notNull()
    .default(''),
  commissionerApprovedAt: timestamp('commissioner_approved_at', {
    fsp: 3,
  }),
  commissionerNotes: text('commissioner_notes'),

  // Execution
  executedByUserId: varchar('executed_by_user_id', { length: 36 }).references(
    () => user.id,
  ),
  executedAt: timestamp('executed_at', { fsp: 3 }),
  executionDurationMs: int('execution_duration_ms'),

  // Conflict resolutions (JSON - user's choices)
  conflictResolutions: json('conflict_resolutions').notNull(),

  // Request expiration (90 days)
  expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),

  // Account locking
  accountsLocked: int('accounts_locked').notNull().default(1),

  // Cancellation
  cancelledByUserId: varchar('cancelled_by_user_id', { length: 36 }).references(
    () => user.id,
  ),
  cancelledAt: timestamp('cancelled_at', { fsp: 3 }),
  cancellationReason: text('cancellation_reason'),

  // Rollback support
  rollbackDeadline: timestamp('rollback_deadline', { fsp: 3 }),
  rollbackData: json('rollback_data'),

  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type AccountMergeRequest = InferSelectModel<typeof accountMergeRequests>;
