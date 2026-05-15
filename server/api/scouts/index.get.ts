import { eq, isNull, inArray } from 'drizzle-orm';
import { db } from '../../lib/db/db';
import { scoutProfile } from '../../lib/db/schemas/tables/scouts/scout_profile';
import { scoutType } from '../../lib/db/schemas/tables/scouts/scout_type';
import { clanCharacter } from '../../lib/db/schemas/tables/scouts/clan_character';
import { unitMembership } from '../../lib/db/schemas/tables/units/unit_membership';
import { units } from '../../lib/db/schemas/tables/units/units';
import { unitType } from '../../lib/db/schemas/tables/units/unit_type';
import { awardsEarned } from '../../lib/db/schemas/tables/beads/beads_awarded';
import { beads } from '../../lib/db/schemas/tables/beads/beads';

export default defineEventHandler(async (event) => {
  try {
    // Fetch scouts with basic info
    const scouts = await db
      .select({
        id: scoutProfile.id,
        firstName: scoutProfile.firstname,
        lastName: scoutProfile.lastname,
        email: scoutProfile.email,
        phone: scoutProfile.phone,
        ceremonyDate: scoutProfile.ceremony_date,
        scoutingAmericaId: scoutProfile.scouting_of_america_id,
        status: scoutProfile.status,
        scoutType: {
          id: scoutType.id,
          name: scoutType.name,
        },
        clanCharacter: {
          id: clanCharacter.id,
          name: clanCharacter.name,
        },
        createdAt: scoutProfile.createdAt,
        updatedAt: scoutProfile.updatedAt,
      })
      .from(scoutProfile)
      .leftJoin(scoutType, eq(scoutProfile.scout_type_id, scoutType.id))
      .leftJoin(
        clanCharacter,
        eq(scoutProfile.clan_character, clanCharacter.id),
      )
      .where(isNull(scoutProfile.merged_into_scout_id)); // Exclude merged profiles

    // Fetch all unit memberships for these scouts
    const scoutIds = scouts.map((s) => s.id);
    const memberships = scoutIds.length
      ? await db
          .select({
            scoutId: unitMembership.scout_id,
            unitId: unitMembership.unit_id,
            isPrimary: unitMembership.is_primary,
            joinedAt: unitMembership.joined_at,
            leftAt: unitMembership.left_at,
            unitNumber: units.number,
            unitLeader: units.unit_leader,
            unitTypeName: unitType.name,
          })
          .from(unitMembership)
          .leftJoin(units, eq(unitMembership.unit_id, units.id))
          .leftJoin(unitType, eq(units.unit_type_id, unitType.id))
          .where(inArray(unitMembership.scout_id, scoutIds))
      : [];

    // Fetch all awards for these scouts
    const awards = scoutIds.length
      ? await db
          .select({
            scoutId: awardsEarned.scout_id,
            beadId: awardsEarned.bead_id,
            awardedAt: awardsEarned.awarded_at,
            dateEarned: awardsEarned.date_earned,
            event: awardsEarned.event,
            quantity: awardsEarned.quantity,
            notes: awardsEarned.notes,
            beadName: beads.name,
            beadDescription: beads.description,
          })
          .from(awardsEarned)
          .leftJoin(beads, eq(awardsEarned.bead_id, beads.id))
          .where(inArray(awardsEarned.scout_id, scoutIds))
      : [];

    // Combine data
    const scoutsWithDetails = scouts.map((scout) => ({
      ...scout,
      units: memberships.filter((m) => m.scoutId === scout.id),
      awards: awards.filter((a) => a.scoutId === scout.id),
    }));

    return {
      success: true,
      data: scoutsWithDetails,
      count: scoutsWithDetails.length,
    };
  } catch (error) {
    console.error('Error fetching scouts:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch scouts',
    });
  }
});
