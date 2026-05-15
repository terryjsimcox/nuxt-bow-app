import { relations } from 'drizzle-orm';
import { scoutProfile } from '../scouts/scout_profile';
import { awardsEarned } from './beads_awarded';
import { beads } from './beads';

export const awardsRelations = relations(awardsEarned, ({ one }) => ({
  scout: one(scoutProfile, {
    fields: [awardsEarned.scout_id],
    references: [scoutProfile.id],
    relationName: 'scoutAwards',
  }),
  bead: one(beads, {
    fields: [awardsEarned.bead_id],
    references: [beads.id],
  }),
}));
