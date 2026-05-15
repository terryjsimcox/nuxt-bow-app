import { relations } from 'drizzle-orm';
import { kmProfile } from './km_profile';
import { kmScoutingAwards } from './km_scouting_awards';
import { kmTraining } from './km_training';
import { kmStaffingRoles } from './km_staffing_roles';
import { kmExperiences } from './km_experiences';
import { kmPositions } from './km_positions';
import { kmUnitMembership } from './km_unit_membership';
import { kmOA } from './km_oa';
import { kmAwards } from './km_awards';
import { kmTrainings } from './km_trainings';
import { scoutProfile } from '../scouts/scout_profile';
import { staffingRoles } from '../units/staffing_roles';
import { kmExperience } from '../units/km_experience';
import { kmPositionList } from '../units/km_position_list';
import { units } from '../units/units';
import { district } from '../units/district';
import { council } from '../units/council';
import { scoutType } from '../scouts/scout_type';

export const kmProfileRelations = relations(kmProfile, ({ one, many }) => ({
  scoutProfile: one(scoutProfile, {
    fields: [kmProfile.scout_profile_id],
    references: [scoutProfile.id],
  }),
  scoutingAwards: many(kmScoutingAwards),
  trainings: many(kmTraining),
  staffingRoles: many(kmStaffingRoles),
  experiences: many(kmExperiences),
  positions: many(kmPositions),
  unitMemberships: many(kmUnitMembership),
  oa: many(kmOA),
}));

export const kmUnitMembershipRelations = relations(
  kmUnitMembership,
  ({ one }) => ({
    kmProfile: one(kmProfile, {
      fields: [kmUnitMembership.km_profile_id],
      references: [kmProfile.id],
    }),
    unit: one(units, {
      fields: [kmUnitMembership.unit_id],
      references: [units.id],
    }),
  }),
);

export const kmScoutingAwardsRelations = relations(
  kmScoutingAwards,
  ({ one }) => ({
    kmProfile: one(kmProfile, {
      fields: [kmScoutingAwards.km_profile_id],
      references: [kmProfile.id],
    }),
    kmAward: one(kmAwards, {
      fields: [kmScoutingAwards.km_award_id],
      references: [kmAwards.id],
    }),
  }),
);

export const kmTrainingRelations = relations(kmTraining, ({ one }) => ({
  kmProfile: one(kmProfile, {
    fields: [kmTraining.km_profile_id],
    references: [kmProfile.id],
  }),
  kmTrainingType: one(kmTrainings, {
    fields: [kmTraining.km_trainings_id],
    references: [kmTrainings.id],
  }),
}));

export const kmStaffingRolesRelations = relations(
  kmStaffingRoles,
  ({ one }) => ({
    kmProfile: one(kmProfile, {
      fields: [kmStaffingRoles.km_profile_id],
      references: [kmProfile.id],
    }),
    staffingRole: one(staffingRoles, {
      fields: [kmStaffingRoles.staffing_role_id],
      references: [staffingRoles.id],
    }),
  }),
);

export const kmExperiencesRelations = relations(kmExperiences, ({ one }) => ({
  kmProfile: one(kmProfile, {
    fields: [kmExperiences.km_profile_id],
    references: [kmProfile.id],
  }),
  experience: one(kmExperience, {
    fields: [kmExperiences.experience_id],
    references: [kmExperience.id],
  }),
}));

export const kmPositionListRelations = relations(kmPositionList, ({ one }) => ({
  scoutType: one(scoutType, {
    fields: [kmPositionList.scout_type_id],
    references: [scoutType.id],
  }),
}));

export const kmPositionsRelations = relations(kmPositions, ({ one }) => ({
  kmProfile: one(kmProfile, {
    fields: [kmPositions.km_profile_id],
    references: [kmProfile.id],
  }),
  position: one(kmPositionList, {
    fields: [kmPositions.position_id],
    references: [kmPositionList.id],
  }),
  unit: one(units, {
    fields: [kmPositions.unit_id],
    references: [units.id],
  }),
  districtRec: one(district, {
    fields: [kmPositions.district_id],
    references: [district.id],
  }),
  councilRec: one(council, {
    fields: [kmPositions.council_id],
    references: [council.id],
  }),
}));

export const kmOARelations = relations(kmOA, ({ one }) => ({
  kmProfile: one(kmProfile, {
    fields: [kmOA.km_profile_id],
    references: [kmProfile.id],
  }),
}));
export const kmAwardsRelations = relations(kmAwards, ({ one }) => ({
  scoutType: one(scoutType, {
    fields: [kmAwards.scout_type_id],
    references: [scoutType.id],
  }),
}));

export const kmTrainingsRelations = relations(kmTrainings, ({ one }) => ({
  scoutType: one(scoutType, {
    fields: [kmTrainings.scout_type_id],
    references: [scoutType.id],
  }),
}));
