import { relations } from 'drizzle-orm';
import { accountMergeRequests } from './account-merge-requests';
import { accountMergeAudit } from './account-merge-audit';
import { scoutProfile } from '../scouts/scout_profile';
import { user } from '../auth/auth-schema';
import { units } from '../units/units';

export const accountMergeRequestsRelations = relations(
  accountMergeRequests,
  ({ one, many }) => ({
    primaryScout: one(scoutProfile, {
      fields: [accountMergeRequests.primaryScoutId],
      references: [scoutProfile.id],
      relationName: 'primaryScout',
    }),
    secondaryScout: one(scoutProfile, {
      fields: [accountMergeRequests.secondaryScoutId],
      references: [scoutProfile.id],
      relationName: 'secondaryScout',
    }),
    createdByUser: one(user, {
      fields: [accountMergeRequests.createdByUserId],
      references: [user.id],
      relationName: 'createdBy',
    }),
    unitLeaderApprovalUser: one(user, {
      fields: [accountMergeRequests.unitLeaderApprovalUserId],
      references: [user.id],
      relationName: 'unitLeaderApproval',
    }),
    commissionerApprovalUser: one(user, {
      fields: [accountMergeRequests.commissionerApprovalUserId],
      references: [user.id],
      relationName: 'commissionerApproval',
    }),
    executedByUser: one(user, {
      fields: [accountMergeRequests.executedByUserId],
      references: [user.id],
      relationName: 'executedBy',
    }),
    cancelledByUser: one(user, {
      fields: [accountMergeRequests.cancelledByUserId],
      references: [user.id],
      relationName: 'cancelledBy',
    }),
    primaryUnit: one(units, {
      fields: [accountMergeRequests.primaryUnitId],
      references: [units.id],
    }),
    auditTrail: many(accountMergeAudit),
  }),
);

export const accountMergeAuditRelations = relations(
  accountMergeAudit,
  ({ one }) => ({
    mergeRequest: one(accountMergeRequests, {
      fields: [accountMergeAudit.mergeRequestId],
      references: [accountMergeRequests.id],
    }),
    actionByUser: one(user, {
      fields: [accountMergeAudit.actionByUserId],
      references: [user.id],
    }),
  }),
);
