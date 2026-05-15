import { relations } from 'drizzle-orm';
import { unitMembership } from './unit_membership';
import { scoutProfile } from '../scouts/scout_profile';
import { units } from './units';

// Junction table relations (unitMembership)
export const membershipRelations = relations(unitMembership, ({ one }) => ({
  scout: one(scoutProfile, {
    fields: [unitMembership.scout_id],
    references: [scoutProfile.id],
  }),
  unit: one(units, {
    fields: [unitMembership.unit_id],
    references: [units.id],
  }),
}));
