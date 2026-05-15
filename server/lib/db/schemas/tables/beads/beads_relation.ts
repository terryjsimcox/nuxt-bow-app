import { relations } from 'drizzle-orm';
import { beads } from './beads';
import { beadType } from './bead_type';
import { itemType } from './item_type';
import { limited } from './limited';
import { units } from '../units/units';

export const beadsRelations = relations(beads, ({ one, many }) => ({
  beadType: one(beadType, {
    fields: [beads.bead_type],
    references: [beadType.id],
  }),
  itemType: one(itemType, {
    fields: [beads.item_type],
    references: [itemType.id],
  }),
  limited: one(limited, {
    fields: [beads.limited],
    references: [limited.id],
  }),
  units: many(units), // reverse relation for cordage_number
}));

// Level 2: Bead Type relations (multi-level!)
export const beadTypeRelations = relations(beadType, ({ many }) => ({
  beads: many(beads), // reverse relation
}));

// Level 2: Item Types relations (multi-level!)
export const itemTypesRelations = relations(itemType, ({ many }) => ({
  beads: many(beads), // reverse relation
}));

// Level 2: Limited relations
export const limitedRelations = relations(limited, ({ many }) => ({
  beads: many(beads),
}));
