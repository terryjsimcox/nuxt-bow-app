import { relations } from 'drizzle-orm';
import { units } from './units';
import { district } from './district';
import { unitType } from './unit_type';
import { clanCharacter } from '../scouts/clan_character';
import { council } from './council';
import { beads } from '../beads/beads';
import { unitMembership } from './unit_membership';
import { scoutProfile } from '../scouts/scout_profile';

// Level 1: Units relations
export const unitsRelations = relations(units, ({ one, many }) => ({
  district: one(district, {
    fields: [units.district_id],
    references: [district.id],
  }),
  unitTypeId: one(unitType, {
    fields: [units.unit_type_id],
    references: [unitType.id],
  }),
  clanCharacterId: one(clanCharacter, {
    fields: [units.clan_character_id],
    references: [clanCharacter.id],
  }),
  cordageId: one(beads, {
    fields: [units.cordage_id],
    references: [beads.id],
  }),
  memberships: many(unitMembership),
}));

// Level 2: Districts relations (multi-level!)
export const districtsRelations = relations(district, ({ one, many }) => ({
  units: many(units), // reverse relation
  council: one(council, {
    fields: [district.council_id],
    references: [council.id],
  }),
}));

// Level 2: Unit Types relations (multi-level!)
export const unitTypesRelations = relations(unitType, ({ many }) => ({
  units: many(units), // reverse relation
}));

// Unit Membership relations
export const unitMembershipRelations = relations(unitMembership, ({ one }) => ({
  scout: one(scoutProfile, {
    fields: [unitMembership.scout_id],
    references: [scoutProfile.id],
  }),
  unit: one(units, {
    fields: [unitMembership.unit_id],
    references: [units.id],
  }),
}));
