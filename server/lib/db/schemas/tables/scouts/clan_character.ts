import type { InferSelectModel } from 'drizzle-orm';
import { mysqlTable, text, timestamp, int } from 'drizzle-orm/mysql-core';

export const clanCharacter = mysqlTable('clan_character', {
  id: int().primaryKey().autoincrement(),
  name: text('name').notNull(),
  picture: text('picture'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type ClanCharacter = InferSelectModel<typeof clanCharacter>;
