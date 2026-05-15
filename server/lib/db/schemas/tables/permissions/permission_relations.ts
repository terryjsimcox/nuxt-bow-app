import { relations } from 'drizzle-orm';
import { user } from '../auth/auth-schema';
import { permissionRules } from './permission_rules';
import { permissionDelegations } from './permission_delegations';
import { roles } from './roles';
import { resources } from './resources';
import { actions } from './actions';

export const permissionRelations = relations(permissionRules, ({ one }) => ({
  role: one(roles, {
    fields: [permissionRules.role_id],
    references: [roles.id],
  }),
  resource: one(resources, {
    fields: [permissionRules.resource_id],
    references: [resources.id],
  }),
  action: one(actions, {
    fields: [permissionRules.action_id],
    references: [actions.id],
  }),
}));

export const roleRelations = relations(roles, ({ many }) => ({
  permissionRules: many(permissionRules),
}));

// Permission delegation relations
export const permissionDelegationRelations = relations(
  permissionDelegations,
  ({ one }) => ({
    grantor: one(user, {
      fields: [permissionDelegations.grantorUserId],
      references: [user.id],
      relationName: 'grantedDelegations',
    }),
    grantee: one(user, {
      fields: [permissionDelegations.granteeUserId],
      references: [user.id],
      relationName: 'receivedDelegations',
    }),
    permissionRule: one(permissionRules, {
      fields: [permissionDelegations.permissionRuleId],
      references: [permissionRules.id],
    }),
  }),
);

// Add delegations to user relations
export const userDelegationRelations = relations(user, ({ many }) => ({
  grantedDelegations: many(permissionDelegations, {
    relationName: 'grantedDelegations',
  }),
  receivedDelegations: many(permissionDelegations, {
    relationName: 'receivedDelegations',
  }),
}));
