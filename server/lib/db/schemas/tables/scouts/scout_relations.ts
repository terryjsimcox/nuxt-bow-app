import { relations } from 'drizzle-orm';
import { scoutProfile } from './scout_profile';
import { scoutType } from './scout_type';
import { clanCharacter } from './clan_character';
import { unitMembership } from '../units/unit_membership';
import { awardsEarned } from '../beads/beads_awarded';

export const scoutRelations = relations(scoutProfile, ({ one, many }) => ({
  scoutTypeId: one(scoutType, {
    fields: [scoutProfile.scout_type_id],
    references: [scoutType.id],
  }),
  clanCharacter: one(clanCharacter, {
    fields: [scoutProfile.clan_character],
    references: [clanCharacter.id],
  }),
  memberships: many(unitMembership),
  awardsEarned: many(awardsEarned, {
    relationName: 'scoutAwards',
  }),
}));
// Level 2: Scout Type relations (multi-level!)
export const scoutTypeRelations = relations(scoutType, ({ many }) => ({
  scoutProfiles: many(scoutProfile), // reverse relation
}));

// Level 2: Clan Characters relations (multi-level!)
export const clanCharacterRelations = relations(clanCharacter, ({ many }) => ({
  scoutProfiles: many(scoutProfile), // reverse relation
}));
