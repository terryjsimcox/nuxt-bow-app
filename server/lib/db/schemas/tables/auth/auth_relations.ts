import { relations } from 'drizzle-orm';
import { user } from './auth-schema';
import { roles, type Roles } from '../permissions/roles';
import { status, type Status } from './status';

export const userRelations = relations(user, ({ one }) => ({
  role: one(roles, {
    fields: [user.role],
    references: [roles.id],
  }),
  kmRole: one(roles, {
    fields: [user.kmRole],
    references: [roles.id],
  }),
  status: one(status, {
    fields: [user.status],
    references: [status.id],
  }),
}));

// User with relations
export type UserWithRelations = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  mergedIntoUserId?: string | null;
  mergedIntoScoutId?: number | null;
  isMergedAlias?: boolean;
  role: Roles;
  kmRole?: Roles;
  status: Status;
  scoutProfile?: import('../scouts/scout_profile').ScoutProfile | null;
};
